import Camera from "../components/camera.js";
import Overlay from "../renderer/overlay.js";
import GLRenderer from "../renderer/renderer.js";
import Scene from "../scene/scene.js";
export default class Engine {
    static singleton;
    running = false;
    renderer;
    scene = new Scene("default");
    systems = [];
    lastFrameTime = 0;
    constructor() {
        if (!Engine.singleton) {
            Engine.singleton = this;
        }
        else {
            console.log("Engine instance already exists");
            return;
        }
        const canvas = document.querySelector("#gl-canvas");
        const gl2 = canvas.getContext("webgl2");
        if (!gl2) {
            console.log("Unable to initialize WebGL2. Your browser or machine may not support it.");
            return;
        }
        this.renderer = new GLRenderer(gl2, canvas);
    }
    static get = () => Engine.singleton;
    isRunning = () => this.running;
    getScene = () => this.scene;
    getRenderer = () => this.renderer;
    start() {
        if (this.running === true)
            return;
        this.running = true;
        this.lastFrameTime = performance.now();
        requestAnimationFrame(this.tick);
    }
    stop() {
        this.running = false;
        this.renderer?.destroy();
    }
    addSystem(system) {
        this.systems.push(system);
    }
    update(dt) {
        this.scene.onUpdate(dt);
        for (const system of this.systems) {
            if (system.onUpdate)
                system.onUpdate(dt);
        }
    }
    render() {
        let mainCamera = undefined;
        const cameraView = this.scene.getView(Camera.name);
        for (const [id, camera] of cameraView.entities()) {
            mainCamera = camera;
        }
        this.renderer?.begin(mainCamera);
        this.scene.onRender();
        for (const system of this.systems) {
            if (system.onRender)
                system.onRender();
        }
        this.renderer?.end();
    }
    tick = (timestamp) => {
        if (!this.running)
            return;
        const deltaTime = (timestamp - this.lastFrameTime) / 1000; // in seconds
        this.lastFrameTime = timestamp;
        this.update(deltaTime);
        this.render();
        requestAnimationFrame(this.tick);
    };
}
