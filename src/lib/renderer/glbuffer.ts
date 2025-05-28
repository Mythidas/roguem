export default class GLBuffer {
  buffer: WebGLBuffer;
  type: GLenum;
  drawMode: GLenum;
  private gl: WebGLRenderingContext;

  constructor(gl: WebGLRenderingContext, type: GLenum, drawMode: GLenum) {
    this.gl = gl;
    this.type = type;
    this.drawMode = drawMode;

    this.buffer = gl.createBuffer();
  }

  public bind() {
    this.gl.bindBuffer(this.type, this.buffer);
  }

  public data(data: AllowSharedBufferSource | null) {
    this.gl.bufferData(this.type, data, this.drawMode);
  }
}