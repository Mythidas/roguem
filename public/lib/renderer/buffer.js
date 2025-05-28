export var BufferDrawMode;
(function (BufferDrawMode) {
    BufferDrawMode[BufferDrawMode["STATIC"] = 35044] = "STATIC";
    BufferDrawMode[BufferDrawMode["DYNAMIC"] = 35048] = "DYNAMIC";
})(BufferDrawMode || (BufferDrawMode = {}));
export default class Buffer {
    buffer;
    type;
    drawMode;
    gl;
    constructor(gl, type, drawMode) {
        this.gl = gl;
        this.type = type;
        this.drawMode = drawMode;
        this.buffer = gl.createBuffer();
        const positions = [1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, -1.0];
    }
    bind() {
        this.gl.bindBuffer(this.type, this.buffer);
    }
    data(data) {
        this.gl.bufferData(this.type, data, this.drawMode);
    }
}
