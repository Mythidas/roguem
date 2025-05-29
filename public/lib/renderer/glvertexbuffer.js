import GLBuffer from "./glbuffer.js";
const VERTEX_SIZE = 10;
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
export default class GLVertexBuffer extends GLBuffer {
    vertices;
    index = 0;
    constructor(gl, size, attribs) {
        super(gl, gl.ARRAY_BUFFER, gl.DYNAMIC_DRAW);
        this.vertices = new Array(size * VERTEX_SIZE).fill(0);
        this.setAttribs(attribs);
    }
    push(vertex) {
        for (let i = 0; i < vertex.length; i++) {
            this.vertices[this.index + i] = vertex[i];
        }
        this.index += VERTEX_SIZE;
    }
    use() {
        this.bind();
        this.data(new Float32Array(this.vertices));
    }
    flush() {
        this.vertices.fill(0);
        this.index = 0;
    }
    length() {
        return this.index;
    }
    setAttribs(attribs) {
        this.bind();
        const stride = attribs.reduce((sum, attrib) => sum + attrib.size * getAttribTypeSize(attrib.type), 0);
        let offset = 0;
        for (const attrib of attribs) {
            this.gl.vertexAttribPointer(attrib.position, attrib.size, attrib.type, false, stride, offset);
            this.gl.enableVertexAttribArray(attrib.position);
            offset += attrib.size * getAttribTypeSize(attrib.type);
        }
    }
}
