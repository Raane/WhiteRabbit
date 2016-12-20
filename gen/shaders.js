SHADERS={};SHADERS.animelines = {uniforms: {
    "tDiffuse": { "type": "t", "value": null },
    "colorA": { "value": null },
    "colorB": { "value": null },
    "time": { "type": "f", "value": null }
}
,vertexShader: "uniform sampler2D tDiffuse;\n\nvarying vec2 vUv;\n\nvoid main() {\n    vUv = uv;\n    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}\n",fragmentShader: "uniform float time;\nuniform float variant;\nuniform vec3 colorA;\nuniform vec3 colorB;\nuniform sampler2D tDiffuse;\n\nvarying vec2 vUv;\n\n#define PI 3.1415926535897932384626433832795\n\nfloat draw_circle(vec2 position, vec2 scale) {\n    vec2 uv = mod(vUv * 8., 1.);\n    uv.y = mod(uv.y * 2., 1.);\n\tfloat distance = sqrt(pow((uv.x - position.x) * scale.x , 2.) + pow((uv.y - position.y) * scale.y, 2.));\n\treturn 1. - min(distance, 1.0);\n}\n\nvoid main() {\n\tfloat motion = time;\n    float intensity;\n\tintensity += draw_circle(vec2(mod(motion*0.1+1.1, 2.1)-1., 0.05), vec2(2.0, 20.0));\n\tintensity += draw_circle(vec2(mod(motion*0.1+1.1, 2.4)-1., 0.11), vec2(2.2, 22.0));\n\tintensity += draw_circle(vec2(mod(motion*0.1+2.2, 2.5)-1., 0.16), vec2(2.4, 50.0));\n\tintensity += draw_circle(vec2(mod(motion*0.1+4.7, 2.6)-1., 0.24), vec2(2.5, 43.0));\n\tintensity += draw_circle(vec2(mod(motion*0.1+2.2, 2.1)-1., 0.33), vec2(2.7, 52.0));\n\tintensity += draw_circle(vec2(mod(motion*0.1+4.7, 2.4)-1., 0.35), vec2(2.8, 20.0));\n\tintensity += draw_circle(vec2(mod(motion*0.1+0.2, 2.5)-1., 0.44), vec2(2.3, 37.0));\n\tintensity += draw_circle(vec2(mod(motion*0.1+7.2, 2.6)-1., 0.50), vec2(2.0, 23.0));\n\tintensity += draw_circle(vec2(mod(motion*0.1+7.2, 2.1)-1., 0.59), vec2(2.5, 48.0));\n\tintensity += draw_circle(vec2(mod(motion*0.1+2.2, 2.4)-1., 0.65), vec2(2.0, 20.0));\n\tintensity += draw_circle(vec2(mod(motion*0.1+4.7, 2.5)-1., 0.75), vec2(1.3, 60.0));\n\tintensity += draw_circle(vec2(mod(motion*0.1+7.2, 2.6)-1., 0.80), vec2(1.0, 49.0));\n\tintensity += draw_circle(vec2(mod(motion*0.1+2.2, 2.4)-1., 0.87), vec2(2.5, 42.0));\n\tintensity += draw_circle(vec2(mod(motion*0.1+2.2, 2.5)-1., 0.92), vec2(2.6, 52.0));\n\tintensity += draw_circle(vec2(mod(motion*0.1+1.2, 2.6)-1., 0.97), vec2(2.0, 58.0));\n\tintensity += draw_circle(vec2(mod(motion*0.1+4.7, 2.1)-1., 0.06), vec2(1.8, 20.0));\n\tintensity += draw_circle(vec2(mod(motion*0.1+7.2, 2.4)-1., 0.14), vec2(2.0, 22.0));\n\tintensity += draw_circle(vec2(mod(motion*0.1+2.2, 2.5)-1., 0.12), vec2(2.0, 50.0));\n\tintensity += draw_circle(vec2(mod(motion*0.1+4.7, 2.6)-1., 0.29), vec2(2.9, 43.0));\n\tintensity += draw_circle(vec2(mod(motion*0.1+2.9, 2.1)-1., 0.39), vec2(2.8, 52.0));\n\tintensity += draw_circle(vec2(mod(motion*0.1+2.2, 2.4)-1., 0.31), vec2(2.0, 20.0));\n\tintensity += draw_circle(vec2(mod(motion*0.1+4.7, 2.5)-1., 0.90), vec2(2.3, 37.0));\n\tintensity += draw_circle(vec2(mod(motion*0.1+2.2, 2.6)-1., 0.74), vec2(2.0, 23.0));\n\tintensity += draw_circle(vec2(mod(motion*0.1+4.7, 2.1)-1., 0.88), vec2(1.4, 48.0));\n\tintensity += draw_circle(vec2(mod(motion*0.1+2.2, 2.4)-1., 0.90), vec2(1.9, 22.0));\n\tintensity += draw_circle(vec2(mod(motion*0.1+4.7, 2.5)-1., 0.92), vec2(2.3, 59.0));\n\tintensity += draw_circle(vec2(mod(motion*0.1+2.2, 2.6)-1., 0.95), vec2(2.0, 49.0));\n\tintensity += draw_circle(vec2(mod(motion*0.1+4.7, 2.4)-1., 0.99), vec2(2.5, 42.0));\n\tintensity += draw_circle(vec2(mod(motion*0.1+9.9, 2.5)-1., 0.08), vec2(2.4, 52.0));\n\tintensity += draw_circle(vec2(mod(motion*0.1+0.0, 2.6)-1., 0.97), vec2(2.3, 58.0));\n    \n    float invertAmount = 0.;//0.3 * sin(mod(vUv.y, 8.) * 5. + time * 0.05 - mod(vUv.x, 8.) * 3.14) + 0.7;\n    intensity = mix(intensity, 1. - intensity, invertAmount);\n    intensity *= (0.25 - 0.75 * cos(mod(vUv.y, 8.) * PI * 2.));\n    vec3 color = mix(colorA, colorB, intensity);\n    gl_FragColor = vec4(color, 1.);\n}\n"};
SHADERS.img = {uniforms: {
    "tDiffuse": { "type": 't', "value": null },
    "img": { "type": 't', "value": null }
}
,vertexShader: "varying vec2 vUv;\n\nvoid main() {\n    vUv = uv;\n    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}\n",fragmentShader: "varying mediump vec2 vUv;\nuniform sampler2D img;\n\nvoid main() {\n    gl_FragColor = texture2D(img, vUv);\n}\n"};
SHADERS.topshader = {uniforms: {
    "tDiffuse": { "type": "t", "value": null },
    "tiles": { "value": null },
    "time": { "type": "f", "value": null }
}
,vertexShader: "uniform sampler2D tDiffuse;\n\nvarying vec2 vUv;\n\nvoid main() {\n    vUv = uv;\n    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}\n",fragmentShader: "uniform float time;\nuniform float tiles;\nuniform sampler2D tDiffuse;\n\nvarying vec2 vUv;\n\n#define PI 3.1415926535897932384626433832795\n\nvoid main() {\n\tvec2 uv = mod(vUv * tiles, 1.);\n\tfloat motion = time;\n    float intensity;\n\n    float start = time / 100.;\n    float stop = time / 100. + .25;\n\n    float color2 = max( abs( uv.x - 0.5 ), abs( uv.y - 0.5 ));\n    float color = floor( color2 * 2. + start );\n    color += 1. - floor( color2 * 2. + stop );\n\n    gl_FragColor = vec4(color, color, color, 1.);\n}\n"};
SHADERS.wallshader = {uniforms: {
    "tDiffuse": { "type": "t", "value": null },
    "colorA": { "value": null },
    "colorB": { "value": null },
    "time": { "type": "f", "value": null }
}
,vertexShader: "uniform sampler2D tDiffuse;\n\nvarying vec2 vUv;\n\nvoid main() {\n    vUv = uv;\n    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}\n",fragmentShader: "uniform float time;\nuniform float variant;\nuniform vec3 colorA;\nuniform vec3 colorB;\nuniform sampler2D tDiffuse;\n\nvarying vec2 vUv;\n\n#define PI 3.1415926535897932384626433832795\n\nvoid main() {\n\tvec2 uv = mod(vUv * 8., 1.);\n\tfloat motion = time;\n    float intensity;\n\n    vec3 color = vec3(uv.y, uv.y, uv.y);\n    gl_FragColor = vec4(color, 1.);\n}\n"};
SHADERS.default = {uniforms: {
    tDiffuse: { type: 't', value: null },
}
,vertexShader: "varying vec2 vUv;\n\nvoid main() {\n    vUv = uv;\n    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}\n",fragmentShader: "uniform sampler2D tDiffuse;\n\nvarying vec2 vUv;\n\nvoid main() {\n    vec4 colorInput = texture2D( tDiffuse, vUv );\n    gl_FragColor = colorInput;\n}\n"};
SHADERS.multiply = {uniforms: {
    tDiffuse: { type: 't', value: null },
    amount: { type: 'f', value: 0},
    r: { type: 'f', value: 0},
    g: { type: 'f', value: 0},
    b: { type: 'f', value: 0}
}
,vertexShader: "varying vec2 vUv;\n\nvoid main() {\n    vUv = uv;\n    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}\n",fragmentShader: "uniform float amount;\nuniform float r;\nuniform float g;\nuniform float b;\nuniform sampler2D tDiffuse;\nvarying vec2 vUv;\n\nvoid main() {\n    vec4 fragColor = texture2D(tDiffuse, vUv);\n    gl_FragColor = vec4(mix(fragColor.r, fragColor.r * r, amount),\n                        mix(fragColor.g, fragColor.g * g, amount),\n                        mix(fragColor.b, fragColor.b * b, amount),\n                        1.);\n}\n"};
SHADERS.vignette = {uniforms: {
    tDiffuse: { type: 't', value: null },
    amount: { type: 'f', value: 0}
}
,vertexShader: "varying vec2 vUv;\n\nvoid main() {\n    vUv = uv;\n    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}\n",fragmentShader: "uniform sampler2D tDiffuse;\nuniform float amount;\nvarying vec2 vUv;\n\nvoid main() {\n    vec4 original = texture2D(tDiffuse, vUv);\n    float dist = length(vUv - vec2(0.5, 0.5));\n    dist = dist / 0.707;\n    if(dist < 0.) dist = 0.;\n    if(dist > 1.) dist = 1.;\n    dist = dist * dist * dist;\n    gl_FragColor = vec4(original.xyz * (1. - dist * amount), 1.);\n}\n"};
