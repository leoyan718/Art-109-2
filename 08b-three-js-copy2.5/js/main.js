// Basic Three.JS scene from documentation, importing Three.JS through a CDN 
// https://threejs.org/docs/#manual/en/introduction/Creating-a-scene

import * as THREE from 'three';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera (75, window.innerWidth/window.innerHeight, 0.1, 1000);

// const light = new THREE.DirectionalLight(0xffffff, 3)
// light.position.set(1,1,5);
// scene.add(light);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
  });
  
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.position.z = 50;
  
  const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
  const texture = new THREE.TextureLoader().load('textures/icecube.jpg')
  const material = new THREE.MeshBasicMaterial( { map: texture } );
  
  const torus = new THREE.Mesh(geometry, material);
  scene.add(torus);
  
  torus.position.z = -55;
  torus.position.x = -10;

  function moveCamera(){
    const t = document.body.getBoundingClientRect().top;

    camera.position.z = t * 0.1;
    camera.position.x = t * 0.01;
  }

  document.body.onscroll = moveCamera;
  
  moveCamera();

  function animate() {
    requestAnimationFrame(animate);
    torus.rotation.z += 0.01;
    renderer.render(scene, camera);
  }
  
  animate();
