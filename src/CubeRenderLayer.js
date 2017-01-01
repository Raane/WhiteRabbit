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
    var position = i/(3*64) - 10;
    var np = this.cubePositionFunction2(position);
    this.cubes.push(new THREE.Mesh(geometry, ball_material));
    this.cubes[i].position.set(np.x, np.y, np.z);
    this.scene.add(this.cubes[i]);


    // Draw derived helper lines
    var dnp = this.cubePositionDerived(position);
    this.cubes[i].rotation.set(dnp.x, dnp.y, dnp.z);  
/*
    var linematerial = new THREE.LineBasicMaterial({
      color: 0x00ddff
    });

    var linegeometry = new THREE.Geometry();
    linegeometry.vertices.push(
      new THREE.Vector3( np.x, np.y, np.z ),
      new THREE.Vector3( np.x + dnp.x / 1, np.y + dnp.y / 1, np.z + dnp.z / 1 )
    );

    var line = new THREE.Line( linegeometry,linematerial );
    this.scene.add( line );

// Draw derived helper lines
    var x = 10;
    var y = 0;

    var pvnp = this.cubePositionPlaneVector(position, x, y);
    var linematerial2 = new THREE.LineBasicMaterial({
      color: 0xdd0000
    });

    var v90d = this.vector90degree(dnp);
    var linegeometry2 = new THREE.Geometry();
    linegeometry2.vertices.push(
      new THREE.Vector3( np.x, np.y, np.z ),
      //new THREE.Vector3( np.x + x / 3, np.y + y / 3, np.z + pvnp / 3 )
      new THREE.Vector3( np.x + v90d.x, np.y + v90d.y, np.z + v90d.z)
    );

    var line2 = new THREE.Line( linegeometry2, linematerial2 );
    this.scene.add( line2 );

    console.log(np);
    console.log(this.vector90degree(dnp)); */
  }
}

// Returns a point (x,y,z) at based on a position forming a continous line for continous input
CubeRenderLayer.prototype.cubePositionFunction2 = function(position, scale) {

  var core_potition = new THREE.Vector3(3 * Math.cos(position), 3 * Math.sin(position), position * 3);
  var cube_position = new THREE.Vector3(Math.cos(position * 64), Math.sin(position * 64), 0);
  cube_position.multiply(new THREE.Vector3(scale, scale, scale));
  return core_potition.add(cube_position);
  //return new THREE.Vector3(Math.cos(position), 0, position);
}

// Returns a point (x,y,z) at based on a position forming a continous line for continous input
CubeRenderLayer.prototype.cubePositionFunction = function(position) {
  return new THREE.Vector3(Math.cos(position), Math.sin(position), position);
  //return new THREE.Vector3(Math.cos(position), 0, position);
}

// Returns the derivate of cubePositionFunction.
CubeRenderLayer.prototype.cubePositionDerived = function(position) {
  return new THREE.Vector3(-Math.sin(position), Math.cos(position), 1);
}

CubeRenderLayer.prototype.vector90degree = function(vector) {
  var new_vector = new THREE.Vector3(vector.z, 0, -vector.x);
  var size = Math.sqrt(new_vector.x*new_vector.x + new_vector.y*new_vector.y + new_vector.z*new_vector.z);
  return new THREE.Vector3(new_vector.x / size, new_vector.y / size, new_vector.z / size);
}


// Returns a vector perpendicular to the line.
CubeRenderLayer.prototype.cubePositionPlaneVector = function(position, x, y) {

  var p = this.cubePositionFunction(position);
  var d = this.cubePositionDerived(position);

  var v = (p.x * d.x + p.y * d.y + p.z * d.z) - (d.x * x) - (d.y * y)

  return v;
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


  this.camera.lookAt(new THREE.Vector3(0,0,0));
*/
  var scale = Math.sin(frame/100)+1
  this.ball.scale.set(scale, scale, scale);

  for(var i = 0; i < this.cube_count; i++) {
    var scale = Math.max( Math.pow(Math.sin(frame/100 + i/(this.cube_count * 1.3) * Math.PI * 2) + 1, 3) - 0.5, 0);
    scale /= 15 * 3;
    this.cubes[i].scale.set(scale, scale, scale);

    var position = i/(3*64) - 10;
    var np = this.cubePositionFunction2(position, scale * 3 * 3 );
    this.cubes[i].position.set(np.x, np.y, np.z);
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
