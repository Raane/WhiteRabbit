/**
 * @constructor
 */
function HypnoCubeLayer(layer) {
  this.config = layer.config;

  this.scene = new THREE.Scene();
  this.camera = new THREE.PerspectiveCamera(45, 16 / 9, 1, 100);
  
  this.camera.position.z = 0;
  this.camera.position.y = 34;

  this.camera.lookAt(new THREE.Vector3(0,0,0));

  var light = new THREE.PointLight( 0xffffff, 1, 100 );
  light.position.set( 2, 2, 2 );
  this.scene.add(light);

  this.create_geoms();

  this.top_material = new THREE.ShaderMaterial(SHADERS.topshader);
  this.wall_material = new THREE.ShaderMaterial(SHADERS.wallshader);
  
  this.create_layer(0);
  this.create_layer(-20);
  this.create_layer(-40);
  this.create_layer(-60);
  this.create_layer(-80);
  this.create_layer(-100);
  this.create_layer(-120);
  this.create_layer(-140);
  this.create_layer(-160);
  this.create_layer(-180);
  this.create_layer(-200);
  this.create_layer(-220);
  this.create_layer(-240);
  this.create_layer(-260);
 
  this.renderPass = new THREE.RenderPass(this.scene, this.camera);
}

// Create a full layer of squares
HypnoCubeLayer.prototype.create_layer = function(y) {
 var distance = 8.485; // sqrt(6^2 + 6^2)
 var elevation = 1;
 var elevation2 = 0.5;
 var elevation3 = 1;

  // Center cube
  this.create_small(0,y+elevation,0,0);
  this.create_large(0,y,0,Math.PI/4);

  // Over, under, right left cube
  this.create_small(distance,y+elevation,0,0);
  this.create_large(distance,y+elevation2,0,Math.PI/4);

  this.create_small(-distance,y+elevation,0,0);
  this.create_large(-distance,y+elevation2,0,Math.PI/4);

  this.create_small(0,y+elevation,distance,0);
  this.create_large(0,y+elevation2,distance,Math.PI/4);

  this.create_small(0,y+elevation,-distance,0);
  this.create_large(0,y+elevation2,-distance,Math.PI/4);

  // Corner cubes
  this.create_small(distance,y+elevation,distance,0);
  this.create_large(distance,y+elevation3,distance,Math.PI/4);

  this.create_small(-distance,y+elevation,-distance,0);
  this.create_large(-distance,y+elevation3,-distance,Math.PI/4);
  
  this.create_small(distance,y+elevation,-distance,0);
  this.create_large(distance,y+elevation3,-distance,Math.PI/4);
  
  this.create_small(-distance,y+elevation,distance,0);
  this.create_large(-distance,y+elevation3,distance,Math.PI/4);
}

// Create a small cube at the desired location.
HypnoCubeLayer.prototype.create_small = function(x, y, z, ry) {
  var mesh = new THREE.Mesh();

  this.create_top(mesh, this.small_square_geom, this.top_material);

  this.create_walls(mesh, 1, this.wall_material, false);
  this.create_walls(mesh, 2, this.wall_material, true);

  mesh.position.x = x;
  mesh.position.y = y;
  mesh.position.z = z;
  mesh.rotation.y = ry;

  var small_scale = 1.2;
  mesh.scale.set(small_scale, small_scale, small_scale);

  this.scene.add(mesh);
}

// Create a large cube at the desired location.
HypnoCubeLayer.prototype.create_large = function(x, y, z, ry) {
  var mesh = new THREE.Mesh();

  this.create_top(mesh, this.large_square_geom, this.top_material);

  this.create_walls(mesh, 3, this.wall_material, false);
  this.create_walls(mesh, 4, this.wall_material, true);

  mesh.position.x = x;
  mesh.position.y = y;
  mesh.position.z = z;
  mesh.rotation.y = ry;

  this.scene.add(mesh);
}

// Create a top
HypnoCubeLayer.prototype.create_top = function(parrent, geometry, material) {
  var mesh = new THREE.Mesh( geometry, material );
  parrent.add( mesh );
}

// Create walls with an offset from the center forming a square tube facing inward or outward.
HypnoCubeLayer.prototype.create_walls = function(parrent, offset, material, outer_wall) {

  var small_inner_side_geom = new THREE.PlaneGeometry(2 * offset, 2 * offset);

  var side1 = new THREE.Mesh( small_inner_side_geom, material );
  side1.position.set(0, -offset, -offset);
  side1.rotation.y = Math.PI * outer_wall;
  parrent.add( side1 );

  var side2 = new THREE.Mesh( small_inner_side_geom, material );
  side2.position.set(offset, -offset, 0);
  side2.rotation.y = Math.PI * -0.5 + Math.PI * outer_wall;
  parrent.add( side2 );

  var side3 = new THREE.Mesh( small_inner_side_geom, material );
  side3.position.set(0, -offset, offset);
  side3.rotation.y = Math.PI * 1 + Math.PI * outer_wall;
  parrent.add( side3 );

  var side4 = new THREE.Mesh( small_inner_side_geom, material );
  side4.position.set(-offset, -offset, 0);
  side4.rotation.y = Math.PI * 0.5 + Math.PI * outer_wall;
  parrent.add( side4 );
}

// Create the custom geometry for the top surfaces (square with hole)
HypnoCubeLayer.prototype.create_geoms = function() {
  // Large square with hole
  this.large_square_geom = new THREE.Geometry(); 
  var lv0 = new THREE.Vector3(4,0,4);
  var lv1 = new THREE.Vector3(3,0,3);
  var lv2 = new THREE.Vector3(4,0,-4);
  var lv3 = new THREE.Vector3(3,0,-3);
  var lv4 = new THREE.Vector3(-4,0,4);
  var lv5 = new THREE.Vector3(-3,0,3);
  var lv6 = new THREE.Vector3(-4,0,-4);
  var lv7 = new THREE.Vector3(-3,0,-3);

  this.large_square_geom.vertices.push(lv0);
  this.large_square_geom.vertices.push(lv1);
  this.large_square_geom.vertices.push(lv2);
  this.large_square_geom.vertices.push(lv3);
  this.large_square_geom.vertices.push(lv4);
  this.large_square_geom.vertices.push(lv5);
  this.large_square_geom.vertices.push(lv6);
  this.large_square_geom.vertices.push(lv7);

  this.large_square_geom.faces.push( new THREE.Face3( 0, 2, 1 ) );
  this.large_square_geom.faces.push( new THREE.Face3( 1, 2, 3 ) );
  this.large_square_geom.faces.push( new THREE.Face3( 0, 1, 5 ) );
  this.large_square_geom.faces.push( new THREE.Face3( 0, 5, 4 ) );
  this.large_square_geom.faces.push( new THREE.Face3( 4, 5, 7 ) );
  this.large_square_geom.faces.push( new THREE.Face3( 4, 7, 6 ) );
  this.large_square_geom.faces.push( new THREE.Face3( 3, 2, 6 ) );
  this.large_square_geom.faces.push( new THREE.Face3( 3, 6, 7 ) );

  var lt0 = new THREE.Vector2( 1, 1 );
  var lt1 = new THREE.Vector2( 7/8, 7/8 );
  var lt2 = new THREE.Vector2( 1, 0 );
  var lt3 = new THREE.Vector2( 7/8, 1/8 );
  var lt4 = new THREE.Vector2( 0, 1 );
  var lt5 = new THREE.Vector2( 1/8, 7/8 );
  var lt6 = new THREE.Vector2( 0, 0 );
  var lt7 = new THREE.Vector2( 1/8, 1/8 );

  this.large_square_geom.faceVertexUvs[0][0] = [lt0, lt2, lt1];
  this.large_square_geom.faceVertexUvs[0][1] = [lt1, lt2, lt3];
  this.large_square_geom.faceVertexUvs[0][2] = [lt0, lt1, lt5];
  this.large_square_geom.faceVertexUvs[0][3] = [lt0, lt5, lt4];
  this.large_square_geom.faceVertexUvs[0][4] = [lt4, lt5, lt7];
  this.large_square_geom.faceVertexUvs[0][5] = [lt4, lt7, lt6];
  this.large_square_geom.faceVertexUvs[0][6] = [lt3, lt2, lt6];
  this.large_square_geom.faceVertexUvs[0][7] = [lt3, lt6, lt7];

// Small square with hole
  this.small_square_geom = new THREE.Geometry(); 
  var sv0 = new THREE.Vector3( 2, 0, 2 );
  var sv1 = new THREE.Vector3( 1, 0, 1 );
  var sv2 = new THREE.Vector3( 2, 0, -2 );
  var sv3 = new THREE.Vector3( 1, 0, -1 );
  var sv4 = new THREE.Vector3( -2, 0, 2 );
  var sv5 = new THREE.Vector3( -1, 0, 1 );
  var sv6 = new THREE.Vector3( -2, 0, -2 );
  var sv7 = new THREE.Vector3( -1, 0, -1 );

  this.small_square_geom.vertices.push( sv0 );
  this.small_square_geom.vertices.push( sv1 );
  this.small_square_geom.vertices.push( sv2 );
  this.small_square_geom.vertices.push( sv3 );
  this.small_square_geom.vertices.push( sv4 );
  this.small_square_geom.vertices.push( sv5 );
  this.small_square_geom.vertices.push( sv6 );
  this.small_square_geom.vertices.push( sv7 );

  this.small_square_geom.faces.push( new THREE.Face3( 0, 2, 1 ) );
  this.small_square_geom.faces.push( new THREE.Face3( 1, 2, 3 ) );
  this.small_square_geom.faces.push( new THREE.Face3( 0, 1, 5 ) );
  this.small_square_geom.faces.push( new THREE.Face3( 0, 5, 4 ) );
  this.small_square_geom.faces.push( new THREE.Face3( 4, 5, 7 ) );
  this.small_square_geom.faces.push( new THREE.Face3( 4, 7, 6 ) );
  this.small_square_geom.faces.push( new THREE.Face3( 3, 2, 6 ) );
  this.small_square_geom.faces.push( new THREE.Face3( 3, 6, 7 ) );

  var st0 = new THREE.Vector2( 1, 1 );
  var st1 = new THREE.Vector2( 3/4, 3/4 );
  var st2 = new THREE.Vector2( 1, 0 );
  var st3 = new THREE.Vector2( 3/4, 1/4 );
  var st4 = new THREE.Vector2( 0, 1 );
  var st5 = new THREE.Vector2( 1/4, 3/4 );
  var st6 = new THREE.Vector2( 0, 0 );
  var st7 = new THREE.Vector2( 1/4, 1/4 );

  this.small_square_geom.faceVertexUvs[0][0] = [st0, st2, st1];
  this.small_square_geom.faceVertexUvs[0][1] = [st1, st2, st3];
  this.small_square_geom.faceVertexUvs[0][2] = [st0, st1, st5];
  this.small_square_geom.faceVertexUvs[0][3] = [st0, st5, st4];
  this.small_square_geom.faceVertexUvs[0][4] = [st4, st5, st7];
  this.small_square_geom.faceVertexUvs[0][5] = [st4, st7, st6];
  this.small_square_geom.faceVertexUvs[0][6] = [st3, st2, st6];
  this.small_square_geom.faceVertexUvs[0][7] = [st3, st6, st7];

  // Planes
  side_geom = new THREE.PlaneGeometry(2, 2);
  this.small_outer_side_geom = new THREE.PlaneGeometry( 4, 4 );
  this.large_inner_side_geom = new THREE.PlaneGeometry( 6, 6 );
  this.large_outer_side_geom = new THREE.PlaneGeometry( 8, 8 );

};

HypnoCubeLayer.prototype.getEffectComposerPass = function() {
  return this.renderPass;
};

HypnoCubeLayer.prototype.start = function() {
};

HypnoCubeLayer.prototype.end = function() {
};

HypnoCubeLayer.prototype.update = function(frame) {
  this.top_material.uniforms.time.value = frame * 0;

  this.camera.position.y = 34 - frame/20 ;

  this.wall_material.uniforms.colorA.value = new THREE.Color(19 / 255, 18 / 255, 94 / 255);
  this.wall_material.uniforms.colorB.value = new THREE.Color(208 / 255, 225 / 255, 255 / 255);
  this.wall_material.uniforms.time.value = frame;

  this.top_material.uniforms.tiles.value = 4;
  this.top_material.uniforms.time.value = frame;
};
