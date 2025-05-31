import GLShader from "./glshader.js";
import * as mat4 from "../math/matrix4.js";
import GLVertexBuffer from "./glvertexbuffer.js";
import GLIndexBuffer from "./glindexbuffer.js";
import * as SimpleShader from "../shaders/simple.js";
import GLTextureArray from "./gltexturearray.js";
import Texture from "./texture.js";
const QUAD_COUNT = 1000;
const INDICE_COUNT = QUAD_COUNT * 4;
export default class GLRenderer {
    gl;
    canvas;
    renderData;
    TEXTURE_LIMIT;
    stats = {
        drawCalls: 0
    };
    constructor(gl, canvas) {
        this.gl = gl;
        this.canvas = canvas;
        this.TEXTURE_LIMIT = gl.getParameter(gl.MAX_ARRAY_TEXTURE_LAYERS);
        const shader = new GLShader(this.gl, SimpleShader.vsSource, SimpleShader.fsSource);
        const vertexPosition = shader.getAttribLocation("aPosition");
        const colorPosition = shader.getAttribLocation("aColor");
        const textCoordPos = shader.getAttribLocation("aTexCoord");
        const texIndexPos = shader.getAttribLocation("aTexIndex");
        const vertexBuffer = new GLVertexBuffer(this.gl, INDICE_COUNT, [
            { position: vertexPosition, size: 3, type: this.gl.FLOAT },
            { position: colorPosition, size: 4, type: this.gl.FLOAT },
            { position: textCoordPos, size: 2, type: this.gl.FLOAT },
            { position: texIndexPos, size: 1, type: this.gl.FLOAT },
        ]);
        const indexBuffer = new GLIndexBuffer(this.gl, INDICE_COUNT);
        const textures = new GLTextureArray(this.gl, 64, 64, this.TEXTURE_LIMIT, [
            { name: gl.TEXTURE_MIN_FILTER, value: gl.NEAREST },
            { name: gl.TEXTURE_MAG_FILTER, value: gl.NEAREST },
            { name: gl.TEXTURE_WRAP_S, value: gl.CLAMP_TO_EDGE },
            { name: gl.TEXTURE_WRAP_T, value: gl.CLAMP_TO_EDGE },
        ]);
        const whiteTexture = new Array(64 * 64 * 4).fill(255);
        textures.subImage(64, 64, 0, new Uint8Array(whiteTexture));
        this.renderData = {
            vbo: vertexBuffer,
            ibo: indexBuffer,
            indexCount: 0,
            defaultShader: shader,
            texArray: textures,
            textures: []
        };
    }
    destroy() {
        this.renderData.texArray.destroy();
        this.renderData.defaultShader.destroy();
        this.renderData.ibo.destroy();
        this.renderData.vbo.destroy();
    }
    begin() {
        this.gl.clearColor(0.6, 0.4, 0.3, 1.0);
        this.gl.clearDepth(1.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.depthFunc(this.gl.LEQUAL);
        this.gl.enable(this.gl.BLEND);
        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        const aspect = this.canvas.clientWidth / this.canvas.clientHeight;
        const zNear = 0.1;
        const zFar = 100.0;
        const projectionMatrix = mat4.create();
        const modelViewMatrix = mat4.create();
        mat4.orthographic(projectionMatrix, 5, aspect, zNear, zFar);
        mat4.translate(modelViewMatrix, [0.0, 0.0, -5.0]);
        this.renderData?.defaultShader.use();
        this.renderData?.defaultShader.uniformMatrix4fv("uProjectionMatrix", projectionMatrix);
        this.renderData?.defaultShader.uniformMatrix4fv("uModelViewMatrix", modelViewMatrix);
    }
    drawQuad(position, scale, color, zIndex, texCoords, texIndex, texture) {
        this.check();
        if (texture) {
            const index = this.renderData.textures.findIndex((tex) => tex === texture);
            if (index !== -1) {
                texIndex = index + 1;
            }
            else {
                this.renderData.textures.push(texture);
            }
        }
        const mTexCoords = texCoords || [[1, 1], [0, 1], [1, 0], [0, 0]];
        const mTexIndex = texIndex || 0;
        this.renderData?.vbo.push([[
                position[0] + scale[0], position[1] + scale[1], position[2],
                color[0], color[1], color[2], color[3], ...mTexCoords[0], mTexIndex
            ], [
                position[0] - scale[0], position[1] + scale[1], position[2],
                color[0], color[1], color[2], color[3], ...mTexCoords[1], mTexIndex
            ], [
                position[0] + scale[0], position[1] - scale[1], position[2],
                color[0], color[1], color[2], color[3], ...mTexCoords[2], mTexIndex
            ], [
                position[0] - scale[0], position[1] - scale[1], position[2],
                color[0], color[1], color[2], color[3], ...mTexCoords[3], mTexIndex
            ]], zIndex);
        this.renderData.indexCount += 6;
    }
    end() {
        this.flush();
        this.stats.drawCalls = 0;
    }
    check() {
        if ((this.renderData.textures.length >= this.TEXTURE_LIMIT - 2) ||
            (this.renderData.indexCount >= INDICE_COUNT)) {
            this.flush();
        }
    }
    flush() {
        const location = this.renderData?.defaultShader.getUniformLocation("sTextures");
        for (let i = 0; i < this.renderData.textures.length; i++) {
            this.renderData.texArray.subImageLoad(i + 1, this.renderData.textures[i]);
        }
        this.gl.activeTexture(this.gl.TEXTURE0);
        this.renderData.texArray.bind();
        this.gl.uniform1i(location, 0);
        const { vbo, ibo } = this.renderData;
        vbo.use();
        ibo.bind();
        this.gl.drawElements(this.gl.TRIANGLES, this.renderData.indexCount, this.gl.UNSIGNED_SHORT, 0);
        vbo.flush();
        this.renderData.indexCount = 0;
        this.stats.drawCalls++;
    }
}
