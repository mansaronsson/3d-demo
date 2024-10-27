import { Scene } from './core/Scene';
import { ModelLoader } from './core/ModelLoader';

const scene = new Scene();
scene.initialize();

const model_loader = new ModelLoader(scene.scene, scene.camera, scene.renderer);
model_loader.loadModel('assets/models/table.glb', (model) => {
    model.position.set(-.5, 0, -.5);
});
model_loader.loadModel('assets/models/lamp.glb', (model) => {
    model.scale.set(0.1, 0.1, 0.1);
    model.position.set(0.5, -0.2, .5);
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Do something

    scene.render();
}
animate();
