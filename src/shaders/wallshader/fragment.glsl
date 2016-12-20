uniform float time;
uniform float variant;
uniform vec3 colorA;
uniform vec3 colorB;
uniform sampler2D tDiffuse;

varying vec2 vUv;

#define PI 3.1415926535897932384626433832795

void main() {
	vec2 uv = mod(vUv * 8., 1.);
	float motion = time;
    float intensity;

    vec3 color = vec3(uv.y, uv.y, uv.y);
    gl_FragColor = vec4(color, 1.);
}
