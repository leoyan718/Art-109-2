// Basic Three.JS scene from documentation, importing Three.JS through a CDN 
// https://threejs.org/docs/#manual/en/introduction/Creating-a-scene


//~~~~~~~Import Three.js (also linked to as import map in HTML)~~~~~~
import * as THREE from 'three';

// Import add-ons
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


// ~~~~~~~~~~~~~~~~Set up~~~~~~~~~~~~~~~~
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const light = new THREE.DirectionalLight(0xffffff, 3)
light.position.set(1,1,5);
scene.add(light);

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.OctahedronGeometry( 1, 4, 2 );
// const material = new THREE.MeshBasicMaterial( { color: 0x0000ff } );

const texture = new THREE.TextureLoader().load('textures/icecube.jpg')
const material = new THREE.MeshBasicMaterial( { map: texture } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

function animate(){
    requestAnimationFrame(animate);

    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;

    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window,innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

}

window.addEventListener('resize', onWindowResize, false);

const lightleft = new THREE.DirectionalLight (0xffffff,3);
lightleft.position.set(3,4,5);
scene.add(lightleft);

// ~~~~~~~~~~~~~~~~ Initiate add-ons ~~~~~~~~~~~~~~~~
const controls = new OrbitControls(camera, renderer.domElement);

const loader = new GLTFLoader(); // to load 3d models

loader.load('assets/piano1.gltf', function(gltf){
    const piano = gltf.scene;
    scene.add(piano);
    model.scale.set(1,1,1);
})



// ~~~~~~~~~~~~~~~~ Create scene here ~~~~~~~~~~~~~~~~
// →→→→→→ Follow next steps in tutorial: 
// // https://threejs.org/docs/#manual/en/introduction/Creating-a-scene

animate();

