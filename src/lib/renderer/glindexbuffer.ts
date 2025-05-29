import GLBuffer from "./glbuffer.js";

export default class GLIndexBuffer extends GLBuffer {
  constructor(gl: WebGLRenderingContext, size: number) {
    super(gl, gl.ELEMENT_ARRAY_BUFFER, gl.STATIC_DRAW);

    const indices: number[] = [];
    for (let i = 0; i < size; i += 4) {
      indices.push(i, i + 1, i + 2, i + 2, i + 1, i + 3);
    }

    this.bind();
    this.data(new Uint16Array(indices));
  }
}