import './style.css';

import * as THREE from 'three';
// 1. import FlyControls
import { FlyControls } from 'three/examples/jsm/controls/FlyControls'

import { addWallLighting, addRoom } from './common';

let camera, scene, canvas, controls, renderer

init()
animate()

function init() {
  scene = new THREE.Scene();
  canvas = document.querySelector("#canvas");

  // Set up the renderer
  renderer = new THREE.WebGLRenderer({canvas});
  renderer.setSize( window.innerWidth, window.innerHeight );

  // Set up camera
  camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500);
  camera.position.set( 0, 75, 160 );

  // 2. Initiate FlyControls with various params
  controls = new FlyControls( camera, renderer.domElement );
  controls.movementSpeed = 100;
  controls.rollSpeed = Math.PI / 24;
  controls.autoForward = false;
  controls.dragToLook = true;

  // set up a basic room scene
  addWallLighting(scene);
  addRoom(scene);
}

// Animate the scene
function animate() {
  renderer.render( scene, camera );

  // 3. update controls with a small step value to "power its engines"
  controls.update(0.01)

  requestAnimationFrame( animate );
};