const identity = [
    1.0, 0.0, 0.0, 0.0,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
];
export function create() {
    return [...identity];
}
export function perspective(mat4, vFov, aspectRatio, near, far) {
    const deg2rad = (Math.PI * vFov) / 180;
    const top = near * Math.tan(deg2rad / 2); // half height of near plane
    const right = top * aspectRatio; // half width of near plane
}
export function orthographic(mat4, size, aspectRatio, near, far) {
    const right = size * aspectRatio;
    const top = size;
    mat4[0] = 1 / right;
    mat4[5] = 1 / top;
    mat4[10] = -2 / (far - near);
    mat4[14] = -(far + near) / (far - near);
    mat4[15] = 1;
}
export function translate(source, vec3) {
    source[12] += vec3[0] * source[0] + vec3[1] * source[4] + vec3[2] * source[8];
    source[13] += vec3[0] * source[1] + vec3[1] * source[5] + vec3[2] * source[9];
    source[14] += vec3[0] * source[2] + vec3[1] * source[6] + vec3[2] * source[10];
    source[15] += vec3[0] * source[3] + vec3[1] * source[7] + vec3[2] * source[11];
}
export function multiply(mat1, mat2) {
    const matrix = create();
    matrix[0] = mat1[0] * mat2[0] + mat1[4] * mat2[1] + mat1[8] * mat2[2] + mat1[12] * mat2[3];
    matrix[4] = mat1[0] * mat2[4] + mat1[4] * mat2[5] + mat1[8] * mat2[6] + mat1[12] * mat2[7];
    matrix[8] = mat1[0] * mat2[8] + mat1[4] * mat2[9] + mat1[8] * mat2[10] + mat1[12] * mat2[11];
    matrix[12] = mat1[0] * mat2[12] + mat1[4] * mat2[13] + mat1[8] * mat2[14] + mat1[12] * mat2[15];
    matrix[1] = mat1[1] * mat2[0] + mat1[5] * mat2[1] + mat1[9] * mat2[2] + mat1[13] * mat2[3];
    matrix[5] = mat1[1] * mat2[4] + mat1[5] * mat2[5] + mat1[9] * mat2[6] + mat1[13] * mat2[7];
    matrix[9] = mat1[1] * mat2[8] + mat1[5] * mat2[9] + mat1[9] * mat2[10] + mat1[13] * mat2[11];
    matrix[13] = mat1[1] * mat2[12] + mat1[5] * mat2[13] + mat1[9] * mat2[14] + mat1[13] * mat2[15];
    matrix[2] = mat1[2] * mat2[0] + mat1[6] * mat2[1] + mat1[10] * mat2[2] + mat1[14] * mat2[3];
    matrix[6] = mat1[2] * mat2[4] + mat1[6] * mat2[5] + mat1[10] * mat2[6] + mat1[14] * mat2[7];
    matrix[10] = mat1[2] * mat2[8] + mat1[6] * mat2[9] + mat1[10] * mat2[10] + mat1[14] * mat2[11];
    matrix[14] = mat1[2] * mat2[12] + mat1[6] * mat2[13] + mat1[10] * mat2[14] + mat1[14] * mat2[15];
    matrix[3] = mat1[3] * mat2[0] + mat1[7] * mat2[1] + mat1[11] * mat2[2] + mat1[15] * mat2[3];
    matrix[7] = mat1[3] * mat2[4] + mat1[7] * mat2[5] + mat1[11] * mat2[6] + mat1[15] * mat2[7];
    matrix[11] = mat1[3] * mat2[8] + mat1[7] * mat2[9] + mat1[11] * mat2[10] + mat1[15] * mat2[11];
    matrix[15] = mat1[3] * mat2[12] + mat1[7] * mat2[13] + mat1[11] * mat2[14] + mat1[15] * mat2[15];
    mat1 = [...matrix];
}
