export default class GLShader {
    gl;
    program;
    constructor(gl, vertex, fragment) {
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
        this.gl.deleteShader(vertShader);
        this.gl.deleteShader(fragShader);
        this.use();
    }
    destroy() {
        this.gl.deleteProgram(this.program);
    }
    use() {
        this.gl.useProgram(this.program);
    }
    getAttribLocation(attrib) {
        return this.gl.getAttribLocation(this.program, attrib);
    }
    getUniformLocation(uniform) {
        return this.gl.getUniformLocation(this.program, uniform);
    }
    uniformMatrix4fv(location, value) {
        this.gl.uniformMatrix4fv(this.getUniformLocation(location), false, value);
    }
    loadShader(gl, type, source) {
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
