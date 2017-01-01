/**
 * @constructor
 */
function CubeRenderLayer(layer) {
  this.config = layer.config;

/**Comment yo shit, ya'll
*/
  this.scene = new THREE.Scene();
  this.camera = new THREE.PerspectiveCamera(45, 16 / 9, 1, 100);

  this.add_lighting();

  this.cube_count = 1000;
  this.generate_cubes();

  this.renderPass = new THREE.RenderPass(this.scene, this.camera);
}

CubeRenderLayer.prototype.add_lighting = function() {
  var ambient_light = new THREE.AmbientLight( 0x404040 );
  this.scene.add( ambient_light );

  this.point_light = new THREE.PointLight( 0xffffff, 1, 1000 );
  this.scene.add( this.point_light );

  var point_light1 = new THREE.PointLight( 0xffffff, 3, 20 );
  point_light1.position.set(0,0,-5);
  this.scene.add( point_light1 );

  var point_light2 = new THREE.PointLight( 0xffffff, 3, 20 );
  point_light2.position.set(0,0,-15);
  this.scene.add( point_light2 );

  var point_light3 = new THREE.PointLight( 0xffffff, 3, 20 );
  point_light3.position.set(0,0,-25);
  this.scene.add( point_light3 );
}

CubeRenderLayer.prototype.generate_cubes = function() {
  var geometry = new THREE.BoxGeometry(3,3,3);
  //var ball_material = new THREE.ShaderMaterial(SHADERS.topshader);
  var ball_material = new THREE.MeshPhongMaterial( { 
    color: 0xffffff, 
    specular: 0x050505,
    shininess: 100,
    map: Loader.loadTexture('res/' + 'triangle.png'),
    opacity: 1.0, transparent: false
  } );
  this.cubes = [];

  for(var i = 0; i < this.cube_count; i++) {
    this.cubes.push(new THREE.Mesh(geometry, ball_material));
    this.scene.add(this.cubes[i]);

    var position = i/(3*64);
    var dnp = this.corePositionDerived(position);
    this.cubes[i].rotation.set(dnp.x, dnp.y, dnp.z);
  }
}

// Returns a point (x,y,z) at based on a position forming a continous line for continous input
CubeRenderLayer.prototype.cubePositionFunction = function(position, scale) {
  var core_potition = this.corePositionFunction(position);
  var cube_position = new THREE.Vector3(Math.cos(position * 64), Math.sin(position * 64), 0);
  cube_position.multiply(new THREE.Vector3(scale, scale, scale));
  return core_potition.add(cube_position);
}

// Returns a point (x,y,z) at based on a position forming a continous line for continous input
CubeRenderLayer.prototype.corePositionFunction = function(position) {
  return new THREE.Vector3(4 * Math.cos(position), 4 * Math.sin(position), position * 3);
}

// Returns the derivate of cubePositionFunction.
CubeRenderLayer.prototype.corePositionDerived = function(position) {
  return new THREE.Vector3(4 * -Math.sin(position), 4 * Math.cos(position), 3);
}

CubeRenderLayer.prototype.getEffectComposerPass = function() {
  return this.renderPass;
};

CubeRenderLayer.prototype.start = function() {
};

CubeRenderLayer.prototype.end = function() {
};

CubeRenderLayer.prototype.update = function(frame) {
  /*this.camera.position.x = 30 * Math.sin(frame/200);
  this.camera.position.y = 0;
  this.camera.position.z = 30 * Math.cos(frame/200);;
  this.camera.lookAt(new THREE.Vector3(0,0,0));*/

  for(var i = 0; i < this.cube_count; i++) {
    var scale = Math.max( Math.pow(Math.sin(frame/100 + i/(this.cube_count * 1.3) * Math.PI * 2) + 1, 3) - 0.5, 0);
    scale /= 15 * 3;
    this.cubes[i].scale.set(scale, scale, scale);

    var position = i/(3*64) - 10;
    var np = this.cubePositionFunction(position, scale * 3 * 3 );
    this.cubes[i].position.set(np.x, np.y, np.z);
  }
};
