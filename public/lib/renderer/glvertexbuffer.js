import GLBuffer from "./glbuffer.js";
function getAttribTypeSize(type) {
    switch (type) {
        case WebGLRenderingContext.FLOAT:
            return 4; // 4 bytes per float
        case WebGLRenderingContext.BYTE:
        case WebGLRenderingContext.UNSIGNED_BYTE:
            return 1; // 1 byte
        case WebGLRenderingContext.SHORT:
        case WebGLRenderingContext.UNSIGNED_SHORT:
            return 2; // 2 bytes
        case WebGLRenderingContext.INT:
        case WebGLRenderingContext.UNSIGNED_INT:
            return 4; // 4 bytes
        default:
            console.warn("Unknown attribute type:", type);
            return 0;
    }
}
export default class GLVertexBuffer {
    gl;
    buffer;
    vertices = [];
    constructor(gl, attribs) {
        this.gl = gl;
        this.buffer = new GLBuffer(this.gl, this.gl.ARRAY_BUFFER, this.gl.DYNAMIC_DRAW);
        this.setAttribs(attribs);
    }
    add(position, scale, color) {
        this.vertices.push([position[0] + scale[0], position[1] + scale[1], position[2], color[0], color[1], color[2], color[3]]);
        this.vertices.push([position[0] - scale[0], position[1] + scale[1], position[2], color[0], color[1], color[2], color[3]]);
        this.vertices.push([position[0] + scale[0], position[1] - scale[1], position[2], color[0], color[1], color[2], color[3]]);
        this.vertices.push([position[0] - scale[0], position[1] - scale[1], position[2], color[0], color[1], color[2], color[3]]);
    }
    use() {
        this.buffer.bind();
        this.buffer.data(new Float32Array(this.vertices.flat()));
    }
    clear() {
        this.vertices = [];
    }
    bind() {
        this.buffer.bind();
    }
    setAttribs(attribs) {
        this.buffer.bind();
        const stride = attribs.reduce((sum, attrib) => sum + attrib.size * getAttribTypeSize(attrib.type), 0);
        let offset = 0;
        for (const attrib of attribs) {
            this.gl.vertexAttribPointer(attrib.position, attrib.size, attrib.type, false, stride, offset);
            this.gl.enableVertexAttribArray(attrib.position);
            offset += attrib.size * getAttribTypeSize(attrib.type);
        }
    }
}
