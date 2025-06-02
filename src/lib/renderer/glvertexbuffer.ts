import GLBuffer from "./glbuffer.js";

type Vertex = [
  number, number, number, // XYZ
  number, number, number, number, // RGBA
  number, number, // XZ TexCoord
  number, // TexIndex
];
const VERTEX_SIZE = 10;

type VertexAttrib = {
  position: GLuint;
  size: GLint;
  type: GLenum;
};

function getAttribTypeSize(type: GLenum): number {
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
  private vertices: number[];
  private queue: { vertices: [Vertex, Vertex, Vertex, Vertex], zIndex: number }[] = [];
  private index: number = 0;

  constructor(gl: WebGLRenderingContext, size: number, attribs: VertexAttrib[]) {
    super(gl, gl.ARRAY_BUFFER, gl.DYNAMIC_DRAW);
    this.vertices = new Array<number>(size * VERTEX_SIZE).fill(0);
    this.setAttribs(attribs);
  }

  public push(vertices: [Vertex, Vertex, Vertex, Vertex], zIndex: number) {
    this.queue.push({ vertices, zIndex });
    this.index += VERTEX_SIZE * 10;
  }

  public use() {
    this.queue.sort((a, b) => a.zIndex - b.zIndex);
    let count = 0;
    for (const item of this.queue) {
      for (const vertex of item.vertices) {
        for (let i = 0; i < vertex.length; i++) {
          this.vertices[count] = vertex[i]!;
          count++;
        }
      }
    }

    this.bind();
    this.data(new Float32Array([...this.vertices]));
  }

  public flush() {
    this.vertices.fill(0);
    this.queue = [];
    this.index = 0;
  }

  public length() {
    return this.index;
  }

  setAttribs(attribs: VertexAttrib[]) {
    this.bind();

    const stride = attribs.reduce(
      (sum, attrib) => sum + attrib.size * getAttribTypeSize(attrib.type),
      0
    );


    let offset = 0;
    for (const attrib of attribs) {
      this.gl.vertexAttribPointer(
        attrib.position,
        attrib.size,
        attrib.type,
        false,
        stride,
        offset,
      );
      this.gl.enableVertexAttribArray(attrib.position);

      offset += attrib.size * getAttribTypeSize(attrib.type);
    }
  }
}