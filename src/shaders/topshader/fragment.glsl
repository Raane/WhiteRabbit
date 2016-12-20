uniform float time;
uniform float tiles;
uniform sampler2D tDiffuse;

varying vec2 vUv;

#define PI 3.1415926535897932384626433832795

void main() {
	vec2 uv = mod(vUv * tiles, 1.);
	float motion = time;
    float intensity;

    float start = time / 100.;
    float stop = time / 100. + .25;

    float color2 = max( abs( uv.x - 0.5 ), abs( uv.y - 0.5 ));
    float color = floor( color2 * 2. + start );
    color += 1. - floor( color2 * 2. + stop );

    gl_FragColor = vec4(color, color, color, 1.);
}
