// sceneSetup.js

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

// Scene
const scene = new THREE.Scene();//创建场景
scene.background = new THREE.CubeTextureLoader()
    .setPath('textures/cube/')
    .load(['posx.jpg', 'negx.jpg', 'posy.jpg', 'negy.jpg', 'posz.jpg', 'negz.jpg']);

// Ground
let mesh = new THREE.Mesh(new THREE.PlaneGeometry(80, 90), new THREE.MeshPhongMaterial({ color: 0x999999, depthWrite: false }));
mesh.rotation.x = - Math.PI / 2;
mesh.position.set(0, -2.5, 0)
mesh.receiveShadow = true;
scene.add(mesh);

// Lights 环境光
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

const directionalLight = new THREE.SpotLight(0xffffff, 0.5);
directionalLight.position.set(60, 30, 0);
scene.add(directionalLight);

const directionalLight2 = new THREE.SpotLight(0xffffff, 0.5);
directionalLight2.position.set(-60, -30, 0);
scene.add(directionalLight2);

const directionalLight3 = new THREE.SpotLight(0xffffff, 0.5);
directionalLight3.position.set(0, 30, 60);
scene.add(directionalLight3);

const directionalLight4 = new THREE.SpotLight(0xffffff, 0.5);
directionalLight4.position.set(0, -30, -60);
scene.add(directionalLight4);

const directionalLight5 = new THREE.SpotLight(0xffffff, 0.5);
directionalLight5.position.set(0, 80, 0);
scene.add(directionalLight5);

// Camera
const camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    1,
    500
);
camera.position.set(25, 20, 12);
camera.position.y += 1;
camera.translateZ(1);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

// document.body.append(renderer.domElement);

// Controls
const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.enableDamping = true;
orbitControls.enableZoom = true;
orbitControls.target.set(0, 5, 0);

orbitControls.addEventListener('change', () => {
  const cameraData = {
    position: camera.position.clone(),
    rotation: camera.rotation.clone()
  };
  localStorage.setItem('cameraData', JSON.stringify(cameraData));
});

function loadCameraData() {
  const data = localStorage.getItem('cameraData');
  if (data) {
    const cameraData = JSON.parse(data);
    camera.position.copy(cameraData.position);
    camera.rotation.copy(cameraData.rotation);
  }
}

// 调用此函数来加载相机数据
loadCameraData();

// Resize
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onWindowResize, false);



// FBX模型加载
const big1 = new FBXLoader();
big1.load('models/fbx/big.fbx',
    obj => {
      obj.name = 'car1'
      obj.scale.set(0.01, 0.01, 0.01)
      // y,z,x
      obj.position.set(-0.7, 5, 0)
      obj.rotation.y = Math.PI;
      obj.castShadow = true
      obj.receiveShadow = true

      // obj.children[0].material = tmaterial

      obj.material = new THREE.MeshStandardMaterial({


        // 默认 0.5. 0.0到1.0之间的值可用于生锈的金属外观
        metalness: 1.0,
        // 金属度贴图
        // metalnessMap: texLoader.load("textures/jinshudu.jpg"),
        // 材料的粗糙程度. 0.0表示平滑的镜面反射，1.0表示完全漫反射. 默认 0.5
        roughness: 0.9,
        // 粗糙度贴图
        // roughnessMap: texLoader.load("textures/cucaodu.jpg"),

        // transparent: true
      })

      obj.children[0].material.needsUpdate = true;

      scene.add(obj);

    });


const small1 = new FBXLoader();
let texLoader = new THREE.TextureLoader()


small1.load('models/fbx/small.fbx',
    obj => {
      obj.name = 'car1-1'
      obj.scale.set(0.01, 0.01, 0.01)
      obj.position.set(-5, 5.4, -0.3)
      obj.castShadow = true
      obj.receiveShadow = true

      obj.material = new THREE.MeshPhysicalMaterial({
        // color:0xff0000,
        // 材质像金属的程度
        // 默认 0.5. 0.0到1.0之间的值可用于生锈的金属外观
        metalness: 1.0,
        // 材料的粗糙程度. 0.0表示平滑的镜面反射，1.0表示完全漫反射. 默认 0.5
        roughness: 0.9,
        // 粗糙度贴图
        roughnessMap: texLoader.load("textures/cucaodu.jpg"),
        // 金属度贴图
        metalnessMap: texLoader.load("textures/jinshudu.jpg"),
      })
      scene.add(obj);

      // console.log(obj);
    });


const big2 = new FBXLoader();
big2.load('models/fbx/big.fbx',
    obj => {
      obj.name = 'car2'
      obj.scale.set(0.01, 0.01, 0.01)
      // y,z,x

      obj.position.set(-0.7, 5, -16.5)
      obj.rotation.y = Math.PI;
      obj.castShadow = true
      obj.receiveShadow = true

      obj.material = new THREE.MeshPhysicalMaterial({
        // color:0xff0000,
        // 材质像金属的程度
        // 默认 0.5. 0.0到1.0之间的值可用于生锈的金属外观
        metalness: 1.0,
        // 材料的粗糙程度. 0.0表示平滑的镜面反射，1.0表示完全漫反射. 默认 0.5
        roughness: 0.9,
        // 粗糙度贴图
        roughnessMap: texLoader.load("textures/cucaodu.jpg"),
        // 金属度贴图
        metalnessMap: texLoader.load("textures/jinshudu.jpg"),
      })

      scene.add(obj);

      // console.log(obj);
    });


const small2 = new FBXLoader();

small2.load('models/fbx/small.fbx',
    obj => {
      obj.name = 'car2-1'
      obj.scale.set(0.01, 0.01, 0.01)
      obj.position.set(-5, 5.4, -16.8)
      obj.castShadow = true
      obj.receiveShadow = true

      obj.material = new THREE.MeshPhysicalMaterial({
        // color:0xff0000,
        // 材质像金属的程度
        // 默认 0.5. 0.0到1.0之间的值可用于生锈的金属外观
        metalness: 1.0,
        // 材料的粗糙程度. 0.0表示平滑的镜面反射，1.0表示完全漫反射. 默认 0.5
        roughness: 0.9,
        // 粗糙度贴图
        roughnessMap: texLoader.load("textures/cucaodu.jpg"),
        // 金属度贴图
        metalnessMap: texLoader.load("textures/jinshudu.jpg"),
      })

      scene.add(obj);

      // console.log(obj);
    });



const big3 = new FBXLoader();
big3.load('models/fbx/big.fbx',
    obj => {
      obj.scale.set(0.01, 0.01, 0.01)
      obj.position.set(-0.7, 5, -14)
      obj.rotation.y = Math.PI;
      obj.castShadow = true
      obj.receiveShadow = true

      obj.children[0].material = new THREE.MeshPhysicalMaterial({
        // 颜色
        // color:0xff0000,

        //release
        // 材质像金属的程度
        // 默认 0.5. 0.0到1.0之间的值可用于生锈的金属外观
        metalness: 1.0,
        // 材料的粗糙程度. 0.0表示平滑的镜面反射，1.0表示完全漫反射. 默认 0.5
        roughness: 0.9,
        // 粗糙度贴图
        roughnessMap: texLoader.load("textures/cucaodu.jpg"),
        // 金属度贴图
        metalnessMap: texLoader.load("textures/jinshudu.jpg"),
      })

      scene.add(obj);

      // console.log(obj);
    });



    let smallMaterial = new THREE.MeshStandardMaterial({
      color: 0x969696,
      roughness: 0.9,
      metalness: 1.0,
    })

    function small3handleFBXLoad(obj) {
      obj.name = 'car2-1';
      obj.scale.set(0.01, 0.01, 0.01);
      obj.position.set(0, 5.35, -13.57);
      obj.castShadow = true;
      obj.receiveShadow = true;

      obj.traverse(function (child) {
        if (child.isMesh) {
          child.material = smallMaterial
        }
      })
      // let texLoader = new THREE.TextureLoader();
      // obj.material = new THREE.MeshPhysicalMaterial({
      //     metalness: 1.0,
      //     roughness: 0.9,
      //     roughnessMap: texLoader.load("textures/cucaodu.jpg"),
      //     metalnessMap: texLoader.load("textures/jinshudu.jpg"),
      // });

      scene.add(obj);
    }

    const small3 = new FBXLoader();


    small3.load('models/fbx/small.fbx',
        obj => {
          obj.scale.set(0.01, 0.01, 0.01)
          obj.position.set(0, 5.4, -14.3)
          obj.castShadow = true
          obj.receiveShadow = true

          obj.traverse(function (child) {
            if (child.isMesh) {
              child.material = smallMaterial
            }
          })

          scene.add(obj);
        }
    );



//加载纹理贴图
let glasstexture = new THREE.TextureLoader().load('textures/glass.jpg');


let group = new THREE.Group()
const wall = new FBXLoader();
wall.load('models/fbx/wall.fbx',
    obj => {
      obj.name = "wall1"
      obj.scale.set(0.01, 0.01, 0.011)
      obj.position.set(-2, -2.5, 0)
      obj.castShadow = true
      obj.receiveShadow = true


      obj.children[0].material = new THREE.MeshPhongMaterial({
        map: glasstexture,
        transparent: true,     //是否透明
        opacity: 0.4,//透明度
        side: THREE.DoubleSide,
        depthWrite: false,
        shininess: 10,


      })

      obj.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
          //将贴图赋于材质
          child.material.map = glasstexture;
          //重点，没有该句会导致PNG无法正确显示透明效果
          child.material.transparent = true;
          child.material.alphaTest = 0.4;
          child.material.depthWrite = true;
        }
      });



      // scene.add(obj);
      // console.log(obj);
      group.name = "wall"
      group.add(obj)
      scene.add(group)
    });

export { scene, camera, renderer, orbitControls };
