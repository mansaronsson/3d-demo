import * as THREE from 'three';

export class Scene {
    public scene: THREE.Scene;
    public camera: THREE.PerspectiveCamera;
    public renderer: THREE.WebGLRenderer;

    constructor() {
        // Scene
        this.scene = new THREE.Scene();

        // fov, aspect ratio, near, far
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(0, 1.2, 1.6);
        this.camera.rotation.set(-0.5, 0, 0);

        // Renderer
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
    }

    public initialize() {
        // Light
        const white_ambient_light = new THREE.AmbientLight(0xffffff, 0.1);
        this.scene.add(white_ambient_light);

        const lamp_light = new THREE.PointLight(0x8888ff, 2.0);
        lamp_light.position.set(0.5, 0.5, 0.5);
        this.scene.add(lamp_light);

        const white_directional_light = new THREE.DirectionalLight(0xffffff, 2.0);
        white_directional_light.position.set(-5, 5, 0);
        white_directional_light.target.position.set(0, 0, 0);
        this.scene.add(white_directional_light);
    }

    public render() {
        this.renderer.render(this.scene, this.camera);
    }
}
