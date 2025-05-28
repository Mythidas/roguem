import GLBuffer from "./glbuffer.js";
import GLShader from "./glshader.js";
import * as mat4 from "../math/matrix4.js";
import GLVertexBuffer from "./glvertexbuffer.js";
const vsSource = `
    attribute vec4 aVertexPosition;
    attribute vec4 aColorPosition;
    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;
    varying vec4 vColor;
    void main() {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
      vColor = aColorPosition;
    }
`;
const fsSource = `
    precision mediump float;
    varying vec4 vColor;
    void main() {
      gl_FragColor = vColor;
    }
`;
export default class GLRenderer {
    gl;
    canvas;
    renderData;
    stats = {
        drawCalls: 0
    };
    constructor(canvas) {
        this.gl = canvas?.getContext("webgl");
        this.canvas = canvas;
        if (this.gl === null)
            return;
        const shader = new GLShader(this.gl, vsSource, fsSource);
        shader.use();
        const vertexPosition = shader.getAttribLocation("aVertexPosition");
        const colorPosition = shader.getAttribLocation("aColorPosition");
        const vertexBuffer = new GLVertexBuffer(this.gl, [
            { position: vertexPosition, size: 3, type: this.gl.FLOAT },
            { position: colorPosition, size: 4, type: this.gl.FLOAT }
        ]);
        this.renderData = {
            vertexBuffer,
            defaultShader: shader,
        };
    }
    initialized() {
        return this.gl !== null;
    }
    beginScene() {
        if (this.gl === null || !this.initialized())
            return;
        this.gl.clearColor(0.6, 0.4, 0.3, 1.0);
        this.gl.clearDepth(1.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.depthFunc(this.gl.LEQUAL);
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
    drawQuad(position, scale) {
        if (this.gl === null || !this.initialized())
            return;
        this.renderData?.vertexBuffer.add(position, scale, [1, 1, 1, 1]);
        {
            const offset = 0;
            const vertexCount = 4;
            this.renderData?.vertexBuffer.use();
            this.gl.drawArrays(this.gl.TRIANGLE_STRIP, offset, vertexCount);
            this.renderData?.vertexBuffer.clear();
            this.stats.drawCalls++;
        }
    }
    endScene() {
        if (this.gl === null || !this.initialized())
            return;
        this.stats.drawCalls = 0;
    }
}
