// Basic Three.JS scene from documentation, importing Three.JS through a CDN 
// https://threejs.org/docs/#manual/en/introduction/Creating-a-scene


//~~~~~~~Import Three.js (also linked to as import map in HTML)~~~~~~
let sceneContainer = document.querySelector
("#scene-container");

let dog;
let mixer;


import * as THREE from 'three';

// Import add-ons
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


// ~~~~~~~~~~~~~~~~Set up~~~~~~~~~~~~~~~~
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x7f9cf5);



const camera = new THREE.PerspectiveCamera(75, sceneContainer.clientWidth / sceneContainer.clientHeight, 0.1, 1000);

const light = new THREE.DirectionalLight(0xffffff, 3)
light.position.set(1,1,5);
scene.add(light);

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(sceneContainer.clientWidth, sceneContainer.clientHeight);
sceneContainer.appendChild(renderer.domElement);

const geometry = new THREE.SphereGeometry( .2, 36, 16 );
// const material = new THREE.MeshBasicMaterial( { color: 0x0000ff } );

const texture = new THREE.TextureLoader().load('textures/icecube.jpg')
const material = new THREE.MeshBasicMaterial( { map: texture } );

const ball = new THREE.Mesh( geometry, material );
scene.add( ball );

camera.position.z = 5;

const clock = new THREE.Clock();
function animate(){
    const delta = clock.getDelta();
    if (mixer) {
        mixer.update(delta); 
    }

    requestAnimationFrame(animate);

    ball.rotation.x += 0.01;
    ball.rotation.y += 0.01;

    ball.position.x = Math.sin(Date.now() / 2000) * 2;
    ball.position.y = Math.sin(Date.now() / 4000) * 2;
    ball.position.z = Math.sin(Date.now() / 5000) * 2;
    // console.log(ball.position.x);

    if(dog){
    // dog.rotation.x += 0.01;
    // dog.rotation.y += 0.01;
    dog.rotation.y = Math.sin(Date.now() / 4000) * 2;
    }   

    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = sceneContainer.clientWidth / sceneContainer.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(sceneContainer.clientWidth, sceneContainer.clientHeight);

}

window.addEventListener('resize', onWindowResize, false);


const lightleft = new THREE.DirectionalLight (0xffffff,3);
lightleft.position.set(3,4,5);
scene.add(lightleft);

// ~~~~~~~~~~~~~~~~ Initiate add-ons ~~~~~~~~~~~~~~~~


const controls = new OrbitControls(camera, renderer.domElement);

const loader = new GLTFLoader(); // to load 3d models

loader.load('assets/dog_shiny.gltf', function(gltf){
    dog = gltf.scene;
    scene.add(dog);
    dog.scale.set(1,1,1);dog
    dog.position.y = -2;

    mixer = new THREE.AnimationMixer(dog);
    const clips = gltf.animations;
    const clip = THREE.AnimationClip.findByName(clips, 'tail')
    const action = mixer.clipAction(clip);
    action.play();


});



// ~~~~~~~~~~~~~~~~ Create scene here ~~~~~~~~~~~~~~~~
// →→→→→→ Follow next steps in tutorial: 
// // https://threejs.org/docs/#manual/en/introduction/Creating-a-scene

animate();

