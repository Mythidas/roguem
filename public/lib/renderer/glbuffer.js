export default class GLBuffer {
    buffer;
    type;
    drawMode;
    gl;
    constructor(gl, type, drawMode) {
        this.gl = gl;
        this.type = type;
        this.drawMode = drawMode;
        this.buffer = gl.createBuffer();
    }
    bind() {
        this.gl.bindBuffer(this.type, this.buffer);
    }
    data(data) {
        this.gl.bufferData(this.type, data, this.drawMode);
    }
}
