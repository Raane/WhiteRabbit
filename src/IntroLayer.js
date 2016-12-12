/**
 * @constructor
 */
function IntroLayer(layer) {
  this.config = layer.config;

  this.scene = new THREE.Scene();
  this.camera = new THREE.PerspectiveCamera(45, 16 / 9, 1, 100);
  
  this.camera.position.z = 3;
  this.camera.position.y = 14;

  this.camera.lookAt(new THREE.Vector3(0,0,1));

  var light = new THREE.PointLight( 0xffffff, 1, 100 );
  light.position.set( 2, 2, 2 );
  this.scene.add(light);

  this.create_geoms();

  //this.top_material = new THREE.MeshBasicMaterial( { color: 0xFFFFFF } ) ;
  this.top_material = new THREE.ShaderMaterial(SHADERS.animelines);
  

  this.inner_side_material = new THREE.MeshBasicMaterial( {color: 0x888888});
  
  this.create_top(this.large_square_geom, this.top_material);
  this.create_top(this.small_square_geom, this.top_material);

  this.create_walls(1, this.top_material, false);
  this.create_walls(2, this.top_material, true);

  this.create_walls(3, this.top_material, false);
  this.create_walls(4, this.top_material, true);
 
  this.renderPass = new THREE.RenderPass(this.scene, this.camera);
}

IntroLayer.prototype.create_top = function(geometry, material) {
  var mesh = new THREE.Mesh( geometry, material );
  this.scene.add( mesh );
}

IntroLayer.prototype.create_walls = function(offset, material, outer_wall) {

  var small_inner_side_geom = new THREE.PlaneGeometry(2 * offset, 2 * offset);

  var side1 = new THREE.Mesh( small_inner_side_geom, material );
  side1.position.set(0, -offset, -offset);
  side1.rotation.y = Math.PI * outer_wall;
  this.scene.add( side1 );

  var side2 = new THREE.Mesh( small_inner_side_geom, material );
  side2.position.set(offset, -offset, 0);
  side2.rotation.y = Math.PI * -0.5 + Math.PI * outer_wall;
  this.scene.add( side2 );

  var side3 = new THREE.Mesh( small_inner_side_geom, material );
  side3.position.set(0, -offset, offset);
  side3.rotation.y = Math.PI * 1 + Math.PI * outer_wall;
  this.scene.add( side3 );

  var side4 = new THREE.Mesh( small_inner_side_geom, material );
  side4.position.set(-offset, -offset, 0);
  side4.rotation.y = Math.PI * 0.5 + Math.PI * outer_wall;
  this.scene.add( side4 );
}

IntroLayer.prototype.create_geoms = function() {
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

IntroLayer.prototype.getEffectComposerPass = function() {
  return this.renderPass;
};

IntroLayer.prototype.start = function() {
};

IntroLayer.prototype.end = function() {
};

IntroLayer.prototype.update = function(frame) {
  this.top_material.uniforms.time.value = frame;

  this.top_material.uniforms.colorA.value = new THREE.Color(19 / 255, 18 / 255, 94 / 255);
  this.top_material.uniforms.colorB.value = new THREE.Color(208 / 255, 225 / 255, 255 / 255);
  //this.large_square.rotation.y = frame/100 + Math.PI/4;
  //this.small_square.rotation.y = frame/100;
  //side1.rotation.y = frame/100;
};
