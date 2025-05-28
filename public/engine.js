import GLBuffer from "./lib/renderer/glbuffer.js";
import * as mat4 from "./lib/math/matrix4.js";
import GLShader from "./lib/renderer/glshader.js";
main();
function main() {
    const vsSource = `
    attribute vec4 aVertexPosition;
    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;
    void main() {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
    }
  `;
    const fsSource = `
    void main() {
      gl_FragColor = vec4(1.0, 0.0, 1.0, 1.0);
    }
  `;
    const canvas = document.querySelector("#gl-canvas");
    // Initialize the GL context
    const gl = canvas?.getContext("webgl");
    // Only continue if WebGL is available and working
    if (gl === null) {
        alert("Unable to initialize WebGL. Your browser or machine may not support it.");
        return;
    }
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.23, 0.7, 0.3, 1.0);
    gl.clearDepth(1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    const shader = new GLShader(gl, vsSource, fsSource);
    const positionBuffer = new GLBuffer(gl, gl.ARRAY_BUFFER, gl.STATIC_DRAW);
    positionBuffer.bind();
    positionBuffer.data(new Float32Array([1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, -1.0]));
    const fieldOfView = 60; // in radians
    const aspect = canvas.clientWidth / canvas.clientHeight;
    const zNear = 0.1;
    const zFar = 100.0;
    const projectionMatrix = mat4.create();
    const modelViewMatrix = mat4.create();
    mat4.orthographic(projectionMatrix, 5, aspect, zNear, zFar);
    mat4.translate(modelViewMatrix, [0.0, 0.0, -5.0]);
    const numComponents = 2; // pull out 2 values per iteration
    const type = gl.FLOAT; // the data in the buffer is 32bit floats
    const normalize = false; // don't normalize
    const stride = 0; // how many bytes to get from one set of values to the next
    // 0 = use type and numComponents above
    const offset = 0; // how many bytes inside the buffer to start from
    const vertexPosition = shader.getAttribLocation("aVertexPosition");
    const projectionLocation = shader.getUniformLocation("uProjectionMatrix");
    const viewLocation = shader.getUniformLocation("uModelViewMatrix");
    positionBuffer.bind();
    gl.vertexAttribPointer(vertexPosition, numComponents, type, normalize, stride, offset);
    gl.enableVertexAttribArray(vertexPosition);
    shader.use();
    gl.uniformMatrix4fv(projectionLocation, false, projectionMatrix);
    gl.uniformMatrix4fv(viewLocation, false, modelViewMatrix);
    {
        const offset = 0;
        const vertexCount = 4;
        gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount);
    }
}
