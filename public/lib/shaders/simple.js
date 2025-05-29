export const vsSource = `#version 300 es
precision mediump float;

in vec4 aVertexPosition;
in vec4 aColorPosition;
in vec2 aTexCoord;
in float aTexIndex;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

out vec4 vColor;
out vec2 vTexCoord;
out float vTexIndex;

void main() {
  gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
  vColor = aColorPosition;
  vTexCoord = aTexCoord;
  vTexIndex = aTexIndex;
}
`;
export const fsSource = `#version 300 es
precision mediump float;
precision mediump sampler2DArray;

in vec4 vColor;
in vec2 vTexCoord;
in float vTexIndex;

uniform sampler2DArray sTextures;

out vec4 outColor;

void main() {
  vec4 texColor = texture(sTextures, vec3(vTexCoord, vTexIndex));
  outColor = texColor * vColor;
}
`;
