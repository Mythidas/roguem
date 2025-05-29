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
    data(dataOrSize) {
        if (typeof dataOrSize === 'number') {
            this.gl.bufferData(this.type, dataOrSize, this.drawMode);
        }
        else {
            this.gl.bufferData(this.type, dataOrSize, this.drawMode);
        }
    }
    subData(offset, data) {
        this.gl.bufferSubData(this.type, offset, data);
    }
}
