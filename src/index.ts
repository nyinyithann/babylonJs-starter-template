import './style.css';
import '../node_modules/modern-normalize/modern-normalize.css';
import {Engine, Scene, MeshBuilder, ArcRotateCamera, HemisphericLight, Vector3} from 'babylonjs';
import {addLabelToMesh} from './gui';

const canvas: any = document.getElementById('render-canvas');
const engine = new Engine(canvas, true);

function createScene(canvas: any, engine: Engine) {
  const scene = new Scene(engine);
  const camera = new ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, Vector3.Zero(), scene);
  camera.attachControl(canvas, true);
  const _ = new HemisphericLight("light1", new Vector3(1, 1, 0), scene);
  const sphere = MeshBuilder.CreateSphere("Sphere", {diameter: 1}, scene);
  addLabelToMesh(sphere);
  return scene;
}

const scene = createScene(canvas, engine);
engine.runRenderLoop(() => scene.render());

window.addEventListener('resize', function () {
  engine.resize();
});
