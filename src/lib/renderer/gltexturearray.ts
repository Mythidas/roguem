type Parameter = {
  name: GLenum;
  value: GLint;
}

export default class GLTextureArray {
  private gl: WebGL2RenderingContext;
  private texture: WebGLTexture;
  private width: number;
  private height: number;
  private layers: number;

  constructor(gl: WebGL2RenderingContext, width: number, height: number, layers: number, params: Parameter[] = []) {
    this.gl = gl;
    this.width = width;
    this.height = height;
    this.layers = layers;
    this.texture = gl.createTexture();
    this.gl.bindTexture(this.gl.TEXTURE_2D_ARRAY, this.texture);
    this.gl.texImage3D(gl.TEXTURE_2D_ARRAY, 0, gl.RGBA, width, height, layers, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

    for (const param of params) {
      this.gl.texParameteri(this.gl.TEXTURE_2D_ARRAY, param.name, param.value);
    }
  }

  public bind() {
    this.gl.bindTexture(this.gl.TEXTURE_2D_ARRAY, this.texture);
  }

  public subImage(width: number, height: number, layer: number, data: TexImageSource | ArrayBufferView | null) {
    if (layer > this.layers) return;
    if (width > this.width || height > this.height) return;

    if (Array.isArray(data)) {
      this.gl.texSubImage3D(
        this.gl.TEXTURE_2D_ARRAY,
        0,
        0, 0, layer,
        width, height, 1,
        this.gl.RGBA, this.gl.UNSIGNED_BYTE,
        data as ArrayBufferView
      );
    } else {
      this.gl.texSubImage3D(
        this.gl.TEXTURE_2D_ARRAY,
        0,
        0, 0, layer,
        width, height, 1,
        this.gl.RGBA, this.gl.UNSIGNED_BYTE,
        data as TexImageSource
      );
    }
  }
}