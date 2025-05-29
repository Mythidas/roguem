import GLBuffer from "./glbuffer.js";
export default class GLIndexBuffer extends GLBuffer {
    constructor(gl, size) {
        super(gl, gl.ELEMENT_ARRAY_BUFFER, gl.STATIC_DRAW);
        const indices = [];
        for (let i = 0; i < size; i += 4) {
            indices.push(i, i + 1, i + 2, i + 2, i + 1, i + 3);
        }
        this.bind();
        this.data(new Uint16Array(indices));
    }
}
