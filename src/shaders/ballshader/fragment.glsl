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

    //vec3 color = vec3(uv.x/1. + uv.y + time/100., uv.y + time/100., uv.y + time/100.);
    //vec3 color = vec3(uv.x/1. + uv.y + time/100., uv.y + time/100., - uv.x/1. + uv.y + time/100.);
    vec3 color = vec3(uv.x + uv.y + time/100., uv.x + uv.y + time/100., uv.x + uv.y + time/100.);

    color = mod(color, 1.);
    color = floor(color + 0.5);

    gl_FragColor = vec4(color, 1.);
}
