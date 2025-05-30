import GLRenderer from "../renderer/renderer.js";
import Scene from "../scene/scene.js";
export default class Engine {
    static singleton;
    running = false;
    renderer;
    scene = new Scene("default");
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
    update(dt) {
        this.scene.onUpdate(dt);
    }
    render(dt) {
        this.renderer?.begin();
        this.scene.onRender(dt);
        this.renderer?.end();
    }
    tick = (timestamp) => {
        if (!this.running)
            return;
        const deltaTime = (timestamp - this.lastFrameTime) / 1000; // in seconds
        this.lastFrameTime = timestamp;
        this.update(deltaTime);
        this.render(deltaTime);
        requestAnimationFrame(this.tick);
    };
}
