import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export class ModelLoader {
    private loader: GLTFLoader;
    private scene: THREE.Scene;
    private camera: THREE.PerspectiveCamera;
    private renderer: THREE.WebGLRenderer;

    constructor(scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer) {
        this.loader = new GLTFLoader();
        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;
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
}
