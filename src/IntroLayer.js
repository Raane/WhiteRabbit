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

  this.top_material = new THREE.MeshBasicMaterial( { color: 0xFFFFFF } ) ;
  this.large_square = new THREE.Mesh( this.large_square_geom  , this.top_material );
  this.small_square = new THREE.Mesh( this.small_square_geom  , this.top_material );
  this.scene.add( this.large_square );
  this.scene.add( this.small_square );

  this.inner_side_material = new THREE.MeshBasicMaterial( {color: 0x888888});
  
  this.small_inner_side1 = new THREE.Mesh( this.small_inner_side_geom, this.inner_side_material );
  this.small_inner_side1.position.set(0, -1, -1);
  this.scene.add( this.small_inner_side1 );

  this.small_inner_side2 = new THREE.Mesh( this.small_inner_side_geom, this.inner_side_material );
  this.small_inner_side2.position.set(1, -1, 0);
  this.small_inner_side2.rotation.y = Math.PI * -0.5;
  this.scene.add( this.small_inner_side2 );

  this.small_inner_side3 = new THREE.Mesh( this.small_inner_side_geom, this.inner_side_material );
  this.small_inner_side3.position.set(0, -1, 1);
  this.small_inner_side3.rotation.y = Math.PI * 1;
  this.scene.add( this.small_inner_side3 );

  this.small_inner_side4 = new THREE.Mesh( this.small_inner_side_geom, this.inner_side_material );
  this.small_inner_side4.position.set(-1, -1, 0);
  this.small_inner_side4.rotation.y = Math.PI * 0.5;
  this.scene.add( this.small_inner_side4 );

  this.renderPass = new THREE.RenderPass(this.scene, this.camera);
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

// Small square with hole
  this.small_square_geom = new THREE.Geometry(); 
  var sv0 = new THREE.Vector3(2,0,2);
  var sv1 = new THREE.Vector3(1,0,1);
  var sv2 = new THREE.Vector3(2,0,-2);
  var sv3 = new THREE.Vector3(1,0,-1);
  var sv4 = new THREE.Vector3(-2,0,2);
  var sv5 = new THREE.Vector3(-1,0,1);
  var sv6 = new THREE.Vector3(-2,0,-2);
  var sv7 = new THREE.Vector3(-1,0,-1);

  this.small_square_geom.vertices.push(sv0);
  this.small_square_geom.vertices.push(sv1);
  this.small_square_geom.vertices.push(sv2);
  this.small_square_geom.vertices.push(sv3);
  this.small_square_geom.vertices.push(sv4);
  this.small_square_geom.vertices.push(sv5);
  this.small_square_geom.vertices.push(sv6);
  this.small_square_geom.vertices.push(sv7);

  this.small_square_geom.faces.push( new THREE.Face3( 0, 2, 1 ) );
  this.small_square_geom.faces.push( new THREE.Face3( 1, 2, 3 ) );
  this.small_square_geom.faces.push( new THREE.Face3( 0, 1, 5 ) );
  this.small_square_geom.faces.push( new THREE.Face3( 0, 5, 4 ) );
  this.small_square_geom.faces.push( new THREE.Face3( 4, 5, 7 ) );
  this.small_square_geom.faces.push( new THREE.Face3( 4, 7, 6 ) );
  this.small_square_geom.faces.push( new THREE.Face3( 3, 2, 6 ) );
  this.small_square_geom.faces.push( new THREE.Face3( 3, 6, 7 ) );

  // Planes
  this.small_inner_side_geom = new THREE.PlaneGeometry(2, 2);
  this.small_outer_side_geom = new THREE.PlaneGeometry(4, 4);
  this.large_inner_side_geom = new THREE.PlaneGeometry(6, 6);
  this.large_outer_side_geom = new THREE.PlaneGeometry(8, 8);

};

IntroLayer.prototype.getEffectComposerPass = function() {
  return this.renderPass;
};

IntroLayer.prototype.start = function() {
};

IntroLayer.prototype.end = function() {
};

IntroLayer.prototype.update = function(frame) {
  this.large_square.rotation.y = frame/100 + Math.PI/4;
  //this.small_square.rotation.y = frame/100;
  //this.small_inner_side1.rotation.y = frame/100;
};
