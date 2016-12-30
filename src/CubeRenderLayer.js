/**
 * @constructor
 */
function CubeRenderLayer(layer) {
  this.config = layer.config;

/**Comment yo shit, ya'll
*/
  this.scene = new THREE.Scene();
  this.camera = new THREE.PerspectiveCamera(45, 16 / 9, 1, 100);

  this.top_material = new THREE.ShaderMaterial(SHADERS.topshader);
  this.wall_material = new THREE.ShaderMaterial(SHADERS.wallshader);
  this.ball_material = new THREE.ShaderMaterial(SHADERS.ballshader);
  this.ball_material2 = new THREE.ShaderMaterial(SHADERS.ballshader2);
  this.ball_material3 = new THREE.ShaderMaterial(SHADERS.ballshader3);

  var geometry = new THREE.BoxGeometry(3,3,3);  
  var ball_material = new THREE.ShaderMaterial(SHADERS.topshader);
  var ball = new THREE.Mesh(geometry, ball_material);
  ball.position.set(4,0,6);

  this.ball = ball;

  this.generate_cubes();

  this.renderPass = new THREE.RenderPass(this.scene, this.camera);
}

CubeRenderLayer.prototype.generate_cubes = function() {
  var geometry = new THREE.BoxGeometry(3,3,3);
  var ball_material = new THREE.ShaderMaterial(SHADERS.topshader);
  this.cubes = [];

  this.cube_count = 1000;

  for(var i = 0; i < this.cube_count; i++) {
    this.cubes.push(new THREE.Mesh(geometry, ball_material));
    var np = this.cubePositionFunction(i/3 - 100);
    this.cubes[i].position.set(np.x, np.y, np.z);
    this.scene.add(this.cubes[i]);
  }
  console.log(this.cubes);
}

// Returns a point (x,y,z) at based on a position forming a continous line for continous input
CubeRenderLayer.prototype.cubePositionFunction = function(position) {
  return new THREE.Vector3(Math.cos(position), Math.sin(position), position);
}

CubeRenderLayer.prototype.getEffectComposerPass = function() {
  return this.renderPass;
};

CubeRenderLayer.prototype.start = function() {
};

CubeRenderLayer.prototype.end = function() {
};

CubeRenderLayer.prototype.update = function(frame) {
  this.camera.position.x = 30 * Math.sin(frame/100);
  this.camera.position.y = 0;
  this.camera.position.z = 30 * Math.cos(frame/100);;


  this.camera.lookAt(new THREE.Vector3(0,0,0));

  var scale = Math.sin(frame/100)+1
  this.ball.scale.set(scale, scale, scale);

  for(var i = 0; i < this.cube_count; i++) {
    var scale = Math.sin(frame/10 + i/this.cube_count * Math.PI * 2)+1;
    scale /= 10;
    this.cubes[i].scale.set(scale, scale, scale);
  }

  this.wall_material.uniforms.colorA.value = new THREE.Color(19 / 255, 18 / 255, 94 / 255);
  this.wall_material.uniforms.colorB.value = new THREE.Color(208 / 255, 225 / 255, 255 / 255);
  this.wall_material.uniforms.time.value = frame;

  this.ball_material.uniforms.time.value = frame;
  this.ball_material2.uniforms.time.value = frame;
  this.ball_material3.uniforms.time.value = frame;

  this.top_material.uniforms.tiles.value = 4;
  this.top_material.uniforms.time.value = frame;
};
