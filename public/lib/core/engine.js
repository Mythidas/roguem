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
        const gl2 = canvas.getContext("webgl2");
        if (!gl2) {
            console.log("Unable to initialize WebGL2. Your browser or machine may not support it.");
            return;
        }
        this.renderer = new GLRenderer(gl2, canvas);
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
        this.renderer?.begin();
        this.renderer?.drawQuad([-3, 0, 0], [1, 1], [1, 1, 1, 1]);
        this.renderer?.drawQuad([0, 0, 0], [1, 1], [0, 0, 0, 0]);
        this.renderer?.end();
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
