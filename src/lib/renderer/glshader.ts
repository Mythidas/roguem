export default class GLShader {
  private gl: WebGLRenderingContext;
  private program: WebGLProgram;

  constructor(gl: WebGLRenderingContext, vertex: string, fragment: string) {
    this.gl = gl;
    this.program = gl.createProgram();

    const vertShader = this.loadShader(gl, gl.VERTEX_SHADER, vertex);
    const fragShader = this.loadShader(gl, gl.FRAGMENT_SHADER, fragment);

    if (!vertShader || !fragShader) {
      console.log("Shader: Failed to compile shaders");
      return;
    }

    gl.attachShader(this.program, vertShader);
    gl.attachShader(this.program, fragShader);
    gl.linkProgram(this.program);

    if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
      console.log(`Shader: Failed to compile program [${gl.getProgramInfoLog(this.program)}]`);
      return;
    }

    // ?
    if (!this.program) return;

    const programInfo = {
      program: this.program,
      attribLocations: {
        vertexPosition: gl.getAttribLocation(this.program, "aVertexPosition"),
      },
      uniformLocations: {
        projectionMatrix: gl.getUniformLocation(this.program, "uProjectionMatrix"),
        modelViewMatrix: gl.getUniformLocation(this.program, "uModelViewMatrix"),
      },
    };
  }

  public use() {
    this.gl.useProgram(this.program);
  }

  public getAttribLocation(attrib: string) {
    return this.gl.getAttribLocation(this.program, attrib);
  }

  public getUniformLocation(uniform: string) {
    return this.gl.getUniformLocation(this.program, uniform);
  }

  private loadShader(gl: WebGLRenderingContext, type: GLenum, source: string) {
    const shader = gl.createShader(type);
    if (!shader) {
      console.log("Shader: Failed to create shader");
      return null;
    }

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.log(`Shader: Failed to compile shader [${gl.getShaderInfoLog(shader)}]`);
      gl.deleteShader(shader);
      return null;
    }

    return shader;
  }
}