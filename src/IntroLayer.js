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

  this.geom = new THREE.Geometry(); 
  this.v0 = new THREE.Vector3(4,0,4);
  this.v1 = new THREE.Vector3(3,0,3);
  this.v2 = new THREE.Vector3(4,0,-4);
  this.v3 = new THREE.Vector3(3,0,-3);
  this.v4 = new THREE.Vector3(-4,0,4);
  this.v5 = new THREE.Vector3(-3,0,3);
  this.v6 = new THREE.Vector3(-4,0,-4);
  this.v7 = new THREE.Vector3(-3,0,-3);

  this.geom.vertices.push(this.v0);
  this.geom.vertices.push(this.v1);
  this.geom.vertices.push(this.v2);
  this.geom.vertices.push(this.v3);
  this.geom.vertices.push(this.v4);
  this.geom.vertices.push(this.v5);
  this.geom.vertices.push(this.v6);
  this.geom.vertices.push(this.v7);

  this.geom.faces.push( new THREE.Face3( 0, 2, 1 ) );
  this.geom.faces.push( new THREE.Face3( 1, 2, 3 ) );
  this.geom.faces.push( new THREE.Face3( 0, 1, 5 ) );
  this.geom.faces.push( new THREE.Face3( 0, 5, 4 ) );
  this.geom.faces.push( new THREE.Face3( 4, 5, 7 ) );
  this.geom.faces.push( new THREE.Face3( 4, 7, 6 ) );
  this.geom.faces.push( new THREE.Face3( 3, 2, 6 ) );
  this.geom.faces.push( new THREE.Face3( 3, 6, 7 ) );

  this.geometry = new THREE.BoxGeometry(1, 1, 1);
  this.material = new THREE.MeshBasicMaterial( { color: 0xFFFFFF } ) ;
  this.box = new THREE.Mesh( this.geom  , this.material );
  this.scene.add( this.box );


  this.renderPass = new THREE.RenderPass(this.scene, this.camera);
}

IntroLayer.prototype.getEffectComposerPass = function() {
  return this.renderPass;
};

IntroLayer.prototype.start = function() {
};

IntroLayer.prototype.end = function() {
};

IntroLayer.prototype.update = function(frame) {
  this.box.rotation.y = frame/100;
};
