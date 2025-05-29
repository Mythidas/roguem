export default class GLTexture {
    gl;
    texture;
    constructor(gl, params = []) {
        this.gl = gl;
        this.texture = gl.createTexture();
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
        this.gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
        for (const param of params) {
            this.gl.texParameteri(this.gl.TEXTURE_2D, param.name, param.value);
        }
    }
    data(arg1, arg2, arg3) {
        if (typeof arg1 === "number" && arg2 && arg3) {
            this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, arg1, arg2, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, arg3);
        }
        else {
            this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGB, this.gl.RGB, this.gl.UNSIGNED_BYTE, arg1);
        }
    }
}
