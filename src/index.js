import './style.css';

import * as THREE from 'three';

import { FlyControls } from 'three/examples/jsm/controls/FlyControls'

import { addWallLighting, addRoom } from './common';

let camera, scene, canvas, controls, renderer
// 3. define cameraDirection and span variables
let cameraDirection = new THREE.Vector3()
let camPositionSpan, camLookAtSpan

init()
animate()

function init() {
  scene = new THREE.Scene();
  canvas = document.querySelector("#canvas");
  // 4. set the spans with the queried HTML DOM elements
  camPositionSpan = document.querySelector("#position");
  camLookAtSpan = document.querySelector("#lookingAt");

  // Set up the renderer
  renderer = new THREE.WebGLRenderer({canvas});
  renderer.setSize( window.innerWidth, window.innerHeight );

  // Set up camera
  camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500);
  camera.position.set(0, 75, 160);

  // Initiate FlyControls with various params
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

  // update controls with a small step value to "power its engines"
  controls.update(0.01)

  // 5. calculate and display the vector values on screen
  // this copies the camera's unit vector direction to cameraDirection
  camera.getWorldDirection(cameraDirection)
  // scale the unit vector up to get a more intuitive value
  cameraDirection.set(cameraDirection.x * 100, cameraDirection.y * 100, cameraDirection.z * 100)
  // update the onscreen spans with the camera's position and lookAt vectors
  camPositionSpan.innerHTML = `Position: (${camera.position.x.toFixed(1)}, ${camera.position.y.toFixed(1)}, ${camera.position.z.toFixed(1)})`
  camLookAtSpan.innerHTML = `LookAt: (${(camera.position.x + cameraDirection.x).toFixed(1)}, ${(camera.position.y + cameraDirection.y).toFixed(1)}, ${(camera.position.z + cameraDirection.z).toFixed(1)})`

  requestAnimationFrame( animate );
};