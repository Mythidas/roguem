export default class GLTextureArray {
    gl;
    texture;
    width;
    height;
    layers;
    constructor(gl, width, height, layers, params = []) {
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
    bind() {
        this.gl.bindTexture(this.gl.TEXTURE_2D_ARRAY, this.texture);
    }
    subImage(width, height, layer, data) {
        if (layer > this.layers)
            return;
        if (width > this.width || height > this.height)
            return;
        if (Array.isArray(data)) {
            this.gl.texSubImage3D(this.gl.TEXTURE_2D_ARRAY, 0, 0, 0, layer, width, height, 1, this.gl.RGBA, this.gl.UNSIGNED_BYTE, data);
        }
        else {
            this.gl.texSubImage3D(this.gl.TEXTURE_2D_ARRAY, 0, 0, 0, layer, width, height, 1, this.gl.RGBA, this.gl.UNSIGNED_BYTE, data);
        }
    }
}
