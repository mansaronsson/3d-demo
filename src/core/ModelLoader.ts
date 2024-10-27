import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export class ModelLoader {
    private loader: GLTFLoader;
    private scene: THREE.Scene;
    private camera: THREE.PerspectiveCamera;
    private renderer: THREE.WebGLRenderer;
    private raycaster: THREE.Raycaster;
    private mouse: THREE.Vector2;
    private selected_model: THREE.Object3D | null = null;

    constructor(scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer) {
        this.loader = new GLTFLoader();
        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;

        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();

        this.renderer.domElement.addEventListener('click', this.onClick.bind(this), false);
    }

    public loadModel(path: string, onLoadCallback?: (model: THREE.Object3D) => void) {
        this.loader.load(
            path,
            (gltf) => {
                const model = gltf.scene;
                this.scene.add(model);
                if (onLoadCallback) {
                    onLoadCallback(model);
                }
            },
            undefined,
            (error) => {
                console.error('Error loading model:', error);
            }
        );
    }

    private onClick(event: MouseEvent) {
        // Calculate mouse position in normalized device coordinates (-1 to +1)
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        // Update the raycaster with the mouse coordinates
        this.raycaster.setFromCamera(this.mouse, this.camera);

        // Find intersected objects
        const intersects = this.raycaster.intersectObjects(this.scene.children, true);

        if (intersects.length > 0) {
            // Select the first intersected model
            this.selected_model = intersects[0].object;
            console.log('Model selected:', this.selected_model.name);
        } else {
            this.selected_model = null;
            console.log('No model selected');
        }
    }

    public getSelectedModel(): THREE.Object3D | null {
        return this.selected_model;
    }
}
