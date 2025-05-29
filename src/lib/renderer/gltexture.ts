type Parameter = {
  name: GLenum;
  value: GLint;
}

export default class GLTexture {
  private gl: WebGLRenderingContext;
  private texture: WebGLTexture;

  constructor(gl: WebGLRenderingContext, params: Parameter[] = []) {
    this.gl = gl;
    this.texture = gl.createTexture();
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
    this.gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);

    for (const param of params) {
      this.gl.texParameteri(this.gl.TEXTURE_2D, param.name, param.value);
    }
  }

  public data(width: number, height: number, pixels: ArrayBufferView | null): void;
  public data(source: TexImageSource): void;
  public data(
    arg1: number | TexImageSource,
    arg2?: number,
    arg3?: ArrayBufferView | null
  ): void {
    if (typeof arg1 === "number" && arg2 && arg3) {
      this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, arg1, arg2, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, arg3);
    } else {
      this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGB, this.gl.RGB, this.gl.UNSIGNED_BYTE, arg1 as TexImageSource);
    }
  }
}