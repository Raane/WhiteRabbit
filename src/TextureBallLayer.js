/**
 * @constructor
 */
function TextureBallLayer(layer) {
  this.config = layer.config;

/**Comment yo shit, ya'll
*/
  this.scene = new THREE.Scene();
  this.camera = new THREE.PerspectiveCamera(45, 16 / 9, 1, 100);
  
  this.camera.position.z = 0;
  this.camera.position.y = 34;

  this.camera.lookAt(new THREE.Vector3(0,0,0));

  this.top_material = new THREE.ShaderMaterial(SHADERS.topshader);
  this.wall_material = new THREE.ShaderMaterial(SHADERS.wallshader);
  this.ball_material = new THREE.ShaderMaterial(SHADERS.ballshader);
  this.ball_material2 = new THREE.ShaderMaterial(SHADERS.ballshader2);
  this.ball_material3 = new THREE.ShaderMaterial(SHADERS.ballshader3);

  var light = new THREE.PointLight( 0xffffff, 1, 100 );
  light.position.set( 2, 2, 2 );
  this.scene.add(light);

  var geometry = new THREE.SphereGeometry(3, 50, 50, 0, Math.PI * 2);
  var ball_material = new THREE.ShaderMaterial(SHADERS.topshader);
  var ball = new THREE.Mesh(geometry, ball_material);
  ball.position.set(4,0,6);
  this.scene.add(ball);

  var ball_material2 = new THREE.ShaderMaterial(SHADERS.wallshader);
  var ball2 = new THREE.Mesh(geometry, ball_material2);
  ball2.position.set(-4,0,-6);
  this.scene.add(ball2);

  var ball_material3 = new THREE.ShaderMaterial(SHADERS.ballshader);
  var ball3 = new THREE.Mesh(geometry, ball_material3);
  ball3.position.set(4,0,-6);
  this.scene.add(ball3);

  var ball_material4 = new THREE.ShaderMaterial(SHADERS.ballshader2);
  var ball4 = new THREE.Mesh(geometry, ball_material4);
  ball4.position.set(-4,0,6);
  this.scene.add(ball4);
  this.renderPass = new THREE.RenderPass(this.scene, this.camera);

  var ball_material5 = new THREE.ShaderMaterial(SHADERS.ballshader3);
  var ball5 = new THREE.Mesh(geometry, ball_material5);
  ball5.position.set(-6,0,0);
  this.scene.add(ball5);
  this.renderPass = new THREE.RenderPass(this.scene, this.camera);
}

TextureBallLayer.prototype.getEffectComposerPass = function() {
  return this.renderPass;
};

TextureBallLayer.prototype.start = function() {
};

TextureBallLayer.prototype.end = function() {
};

TextureBallLayer.prototype.update = function(frame) {

  this.wall_material.uniforms.colorA.value = new THREE.Color(19 / 255, 18 / 255, 94 / 255);
  this.wall_material.uniforms.colorB.value = new THREE.Color(208 / 255, 225 / 255, 255 / 255);
  this.wall_material.uniforms.time.value = frame;

  this.ball_material.uniforms.time.value = frame;
  this.ball_material2.uniforms.time.value = frame;
  this.ball_material3.uniforms.time.value = frame;

  this.top_material.uniforms.tiles.value = 4;
  this.top_material.uniforms.time.value = frame;
};
