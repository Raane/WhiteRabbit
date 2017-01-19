/**
 * @constructor
 */
function HypnoWingLayer(layer) {
  this.config = layer.config;

  this.scene = new THREE.Scene();
  this.camera = new THREE.PerspectiveCamera(45, 16 / 9, 1, 100);
  
  this.camera.position.z = 0;
  this.camera.position.y = 40
  ;

  this.camera.lookAt(new THREE.Vector3(0,0,0));

  var light = new THREE.PointLight( 0xffffff, 1, 100 );
  light.position.set( 2, 2, 2 );
  this.scene.add(light);

  this.large_square_geom = [];
  for(var i=0;i<6;i++) {
    this.large_square_geom.push(new THREE.Geometry());
    this.create_geoms(this.large_square_geom[i], 11 - (11 / 6) * i);
  }

  this.top_material = new THREE.MeshBasicMaterial( { 
    color: 0xffffff, 
    specular: 0x050505,
    side: THREE.DoubleSide,
    shininess: 100,
    map: Loader.loadTexture('res/' + 'UV-testmap.jpg'),
    opacity: 1.0, transparent: false
  } );

  this.create_layer(0);
 
  this.renderPass = new THREE.RenderPass(this.scene, this.camera);
}

// Create a full layer of squares
HypnoWingLayer.prototype.create_layer = function(y) {
 var distance = 16;
 var elevation = 0.5;

  // Over, under, right left cube
  this.create_large(distance,y+elevation,distance,Math.PI/2);
  this.create_large(distance,y+elevation,distance,2*Math.PI/2);

  this.create_large(distance,y+elevation,-distance,2*Math.PI/2);
  this.create_large(distance,y+elevation,-distance,3*Math.PI/2);

  this.create_large(-distance,y+elevation,-distance,3*Math.PI/2);
  this.create_large(-distance,y+elevation,-distance,4*Math.PI/2);

  this.create_large(-distance,y+elevation,distance,4*Math.PI/2);
  this.create_large(-distance,y+elevation,distance,5*Math.PI/2);
}

// Create a large cube at the desired location.
HypnoWingLayer.prototype.create_large = function(x, y, z, ry) {
  var offset = 11/6;
  for(var i=0; i<6; i++) {
    var mesh = new THREE.Mesh();

    this.create_top(mesh, this.large_square_geom[i], this.top_material);

    mesh.position.x = x + ((x<0)?i:-i) * offset / 2;
    mesh.position.y = y;
    mesh.position.z = z + ((z<0)?i:-i) * offset / 2;
    mesh.rotation.y = ry;

    this.scene.add(mesh);
  }
}

// Create a top
HypnoWingLayer.prototype.create_top = function(parrent, geometry, material) {
  var mesh = new THREE.Mesh( geometry, material );
  parrent.add( mesh );
}

// Create the custom geometry for the top surfaces (square with hole)
HypnoWingLayer.prototype.create_geoms = function(geometry, size) {
  var lv0 = new THREE.Vector3(0,0,0);
  var lv1 = new THREE.Vector3(0,-1,0);
  var lv2 = new THREE.Vector3(0,-10,0);
  var lv3 = new THREE.Vector3(0,-11,0);
  var lv4 = new THREE.Vector3(size,0,0);
  var lv6 = new THREE.Vector3(size-1,-1,0);
  var lv7 = new THREE.Vector3(size-1,-10,0);
  var lv5 = new THREE.Vector3(size,-11,0);

  geometry.vertices.push(lv0);
  geometry.vertices.push(lv1);
  geometry.vertices.push(lv2);
  geometry.vertices.push(lv3);
  geometry.vertices.push(lv4);
  geometry.vertices.push(lv5);
  geometry.vertices.push(lv6);
  geometry.vertices.push(lv7);

  geometry.faces.push( new THREE.Face3( 0, 6, 1 ) );
  geometry.faces.push( new THREE.Face3( 0, 4, 6 ) );
  geometry.faces.push( new THREE.Face3( 4, 7, 6 ) );
  geometry.faces.push( new THREE.Face3( 4, 5, 7 ) );
  geometry.faces.push( new THREE.Face3( 5, 3, 7 ) );
  geometry.faces.push( new THREE.Face3( 7, 3, 2 ) );
  geometry.faces.push( new THREE.Face3( 1, 6, 2 ) );
  geometry.faces.push( new THREE.Face3( 2, 6, 7 ) );

  var lt0 = new THREE.Vector2( 0, 0 );
  var lt1 = new THREE.Vector2( 0, 0.25 );
  var lt2 = new THREE.Vector2( 0, 0.75 );
  var lt3 = new THREE.Vector2( 0, 1 );
  var lt4 = new THREE.Vector2( 1, 0 );
  var lt6 = new THREE.Vector2( 0.75, 0.25 );
  var lt7 = new THREE.Vector2( 0.75, 0.75 );
  var lt5 = new THREE.Vector2( 1, 1 );

  geometry.faceVertexUvs[0][0] = [lt0, lt6, lt1];
  geometry.faceVertexUvs[0][1] = [lt0, lt4, lt6];
  geometry.faceVertexUvs[0][2] = [lt4, lt7, lt6];
  geometry.faceVertexUvs[0][3] = [lt4, lt5, lt7];
  geometry.faceVertexUvs[0][4] = [lt5, lt3, lt7];
  geometry.faceVertexUvs[0][5] = [lt7, lt3, lt2];
  geometry.faceVertexUvs[0][6] = [lt1, lt6, lt2];
  geometry.faceVertexUvs[0][7] = [lt2, lt6, lt7];
};

HypnoWingLayer.prototype.getEffectComposerPass = function() {
  return this.renderPass;
};

HypnoWingLayer.prototype.start = function() {
};

HypnoWingLayer.prototype.end = function() {
};

HypnoWingLayer.prototype.update = function(frame) {
};
