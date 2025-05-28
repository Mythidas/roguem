import GLRenderer from "../renderer/renderer.js";
export default class Engine {
    static singleton;
    state = {
        running: false
    };
    renderer;
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
        this.renderer = new GLRenderer(canvas);
        if (!this.renderer.initialized()) {
            console.log("Unable to initialize WebGL. Your browser or machine may not support it.");
            return;
        }
    }
    start() {
        if (this.state.running === true)
            return;
        this.state.running = true;
        this.lastFrameTime = performance.now();
        requestAnimationFrame(this.tick);
    }
    stop() {
        this.state.running = false;
    }
    update(dt) {
    }
    render(dt) {
        this.renderer?.beginScene();
        this.renderer?.drawQuad([-3, 0, 0], [1, 1]);
        this.renderer?.drawQuad([0, 0, 0], [1, 1]);
        this.renderer?.endScene();
    }
    tick = (timestamp) => {
        if (!this.state.running)
            return;
        const deltaTime = (timestamp - this.lastFrameTime) / 1000; // in seconds
        this.lastFrameTime = timestamp;
        this.update(deltaTime);
        this.render(deltaTime);
        requestAnimationFrame(this.tick);
    };
    get() {
        return Engine.singleton;
    }
    getState() {
        return this.state;
    }
}
