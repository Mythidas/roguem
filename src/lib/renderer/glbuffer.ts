import type GLObject from "./globject";

export default class GLBuffer implements GLObject {
  buffer: WebGLBuffer;
  type: GLenum;
  drawMode: GLenum;
  protected gl: WebGLRenderingContext;

  constructor(gl: WebGLRenderingContext, type: GLenum, drawMode: GLenum) {
    this.gl = gl;
    this.type = type;
    this.drawMode = drawMode;

    this.buffer = gl.createBuffer();
  }

  public destroy(): void {
    this.gl.deleteBuffer(this.buffer);
  }

  public bind() {
    this.gl.bindBuffer(this.type, this.buffer);
  }

  public data(data: AllowSharedBufferSource | null): void;
  public data(size: number): void;
  public data(dataOrSize: AllowSharedBufferSource | null | number): void {
    if (typeof dataOrSize === 'number') {
      this.gl.bufferData(this.type, dataOrSize, this.drawMode);
    } else {
      this.gl.bufferData(this.type, dataOrSize, this.drawMode);
    }
  }

  public subData(offset: GLintptr, data: AllowSharedBufferSource) {
    this.gl.bufferSubData(this.type, offset, data);
  }
}