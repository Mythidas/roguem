import GLShader from "./glshader.js";
import * as mat4 from "../math/matrix4.js";
import GLVertexBuffer from "./glvertexbuffer.js";
import type { Vector2, Vector3, Vector4 } from "../math/vector.js";
import GLIndexBuffer from "./glindexbuffer.js";
import * as SimpleShader from "../shaders/simple.js";
import GLTextureArray from "./gltexturearray.js";

type Data = {
  vbo: GLVertexBuffer;
  ibo: GLIndexBuffer;
  indexCount: number;
  defaultShader: GLShader;
  textures: GLTextureArray;
}

type Stats = {
  drawCalls: number;
}

const QUAD_COUNT = 1000;
const INDICE_COUNT = QUAD_COUNT * 4;

export default class GLRenderer {
  private gl: WebGL2RenderingContext;
  private canvas: HTMLCanvasElement;
  private renderData: Data;
  private stats: Stats = {
    drawCalls: 0
  };

  constructor(gl: WebGL2RenderingContext, canvas: HTMLCanvasElement) {
    this.gl = gl;
    this.canvas = canvas;

    const shader = new GLShader(this.gl, SimpleShader.vsSource, SimpleShader.fsSource);
    const vertexPosition = shader.getAttribLocation("aVertexPosition");
    const colorPosition = shader.getAttribLocation("aColorPosition");
    const textCoordPos = shader.getAttribLocation("aTexCoord");
    const texIndexPos = shader.getAttribLocation("aTexIndex");

    const vertexBuffer = new GLVertexBuffer(this.gl, INDICE_COUNT, [
      { position: vertexPosition, size: 3, type: this.gl.FLOAT },
      { position: colorPosition, size: 4, type: this.gl.FLOAT },
      { position: textCoordPos, size: 2, type: this.gl.FLOAT },
      { position: texIndexPos, size: 1, type: this.gl.FLOAT },
    ]);
    const indexBuffer = new GLIndexBuffer(this.gl, INDICE_COUNT);

    const textures = new GLTextureArray(this.gl, 64, 64, 8, [
      { name: gl.TEXTURE_MIN_FILTER, value: gl.NEAREST },
      { name: gl.TEXTURE_MAG_FILTER, value: gl.NEAREST },
      { name: gl.TEXTURE_WRAP_S, value: gl.CLAMP_TO_EDGE },
      { name: gl.TEXTURE_WRAP_T, value: gl.CLAMP_TO_EDGE },
    ]);

    const img = new Image();
    img.src = "assets/test.png";
    img.onload = () => {
      const bitmap = createImageBitmap(img, {
        imageOrientation: "flipY"
      }).then((data) => {
        textures.subImage(data.width, data.height, 1, data);
      })
    };
    textures.subImage(1, 1, 0, new Uint8Array([255, 255, 255, 255]));

    this.renderData = {
      vbo: vertexBuffer,
      ibo: indexBuffer,
      indexCount: 0,
      defaultShader: shader,
      textures
    }
  }

  public begin() {
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

  public drawQuad(position: Vector3, scale: Vector2, color: Vector4) {
    this.renderData?.vbo.push([
      position[0] + scale[0], position[1] + scale[1], position[2],
      color[0], color[1], color[2], color[3],
      1, 1,
      1
    ]);
    this.renderData?.vbo.push([
      position[0] - scale[0], position[1] + scale[1], position[2],
      color[0], color[1], color[2], color[3],
      0, 1,
      1
    ]);
    this.renderData?.vbo.push([
      position[0] + scale[0], position[1] - scale[1], position[2],
      color[0], color[1], color[2], color[3],
      1, 0,
      1
    ]);
    this.renderData?.vbo.push([
      position[0] - scale[0], position[1] - scale[1], position[2],
      color[0], color[1], color[2], color[3],
      0, 0,
      1
    ]);

    this.renderData!.indexCount += 6;
  }

  public flush() {
    const location = this.renderData?.defaultShader.getUniformLocation("sTextures");

    this.gl.activeTexture(this.gl.TEXTURE0);
    this.renderData.textures.bind();
    this.gl.uniform1i(location, 0);

    const { vbo, ibo } = this.renderData!;
    vbo.use();
    ibo.bind();
    this.gl.drawElements(this.gl.TRIANGLES, this.renderData!.indexCount, this.gl.UNSIGNED_SHORT, 0);

    vbo.flush();
    this.renderData!.indexCount = 0;
    this.stats.drawCalls++;
  }

  public end() {
    this.flush();
    this.stats.drawCalls = 0;
  }
}