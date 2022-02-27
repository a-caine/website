import * as THREE from 'https://cdn.skypack.dev/three@0.138.0';

const scene = new THREE.Scene();

const clock = new THREE.Clock();
var delta = 0;
var time = 0;
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const amb_light = new THREE.AmbientLight( 0xbdd8e4, 0.1 );
const point_light = new THREE.PointLight( 0xffe484, 1.7, 0);

point_light.position.set(10, 8, 15);

point_light.castShadow = true;

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );


renderer.shadowMapEnabled = true;

//renderer.setClearColor( 0xffffff, 0);
document.body.appendChild( renderer.domElement );
const geometry = new THREE.SphereGeometry();

const texture = new THREE.TextureLoader().load('https://avatars.githubusercontent.com/u/41199219?v=4');
const gTexture = new THREE.TextureLoader().load('https://avatars.githubusercontent.com/u/3883376?v=4');

const material = new THREE.MeshStandardMaterial( { map: texture } );
const gMaterial = new THREE.MeshStandardMaterial( { map: gTexture } );
const george_sphere = new THREE.Mesh( geometry, gMaterial );
const toby_sphere = new THREE.Mesh( geometry, material );

george_sphere.castShadow = true;
george_sphere.receiveShadow=true;

toby_sphere.castShadow = true;
toby_sphere.receiveShadow = true;

toby_sphere.scale.x = 2.5;
toby_sphere.scale.y = 2.5;
toby_sphere.scale.z = 2.5;

scene.add(amb_light);
scene.add(point_light);
//scene.add(new THREE.CameraHelper( point_light.shadow.camera));

scene.add( toby_sphere );
scene.add( george_sphere );

const starMaterial = new THREE.MeshBasicMaterial( {color: 0xe6dbac } );

for (var i = 0; i < 200; i++) {
	var star = new THREE.Mesh(geometry, starMaterial);

	star.position.x = Math.floor(Math.random() * 1600) - 800;
	star.position.y = Math.floor(Math.random() * 800) - 400;
	star.position.z = Math.floor(Math.random() * 100) - 500;

	scene.add(star);
}

camera.position.z = 12;

const degreeToRad = (degree) => {
	var factor = (Math.PI / 180);
	var rad = degree / factor;
	return rad;
}

function animate() {
	requestAnimationFrame( animate );

	delta = clock.getDelta();
	time += delta / 400;
	if (time >= 360) {
		time = 0;
	}

	george_sphere.position.x = Math.sin(degreeToRad(time * 4)) * 5;
	george_sphere.position.z = Math.cos(degreeToRad(time * 4)) * 5;
	george_sphere.position.y = Math.sin(degreeToRad(time * 2)) * 5;

	point_light.position.x = Math.sin(degreeToRad(time)) * 10;
	point_light.position.z = Math.cos(degreeToRad(time)) * 15;

	george_sphere.rotation.y += 2 * delta;
	george_sphere.rotation.x += 0.1 * delta;

	//toby_sphere.rotation.x += delta;
	toby_sphere.rotation.y += 0.5 * delta;

	toby_sphere.position.x += toby_sphere.position.x

	//cube.scale.x += 0.001;

	renderer.render( scene, camera );
};

window.addEventListener('resize', resize);

function resize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth, window.innerHeight);
}

animate();
