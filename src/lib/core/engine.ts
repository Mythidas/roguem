import Camera from "../components/camera.js";
import Overlay from "../renderer/overlay.js";
import GLRenderer from "../renderer/renderer.js";
import Scene from "../scene/scene.js";
import type System from "./system.js";

export default class Engine {
  static singleton: Engine | undefined;

  private running = false;
  private renderer: GLRenderer | undefined;
  private scene: Scene = new Scene("default");
  private systems: System[] = [];
  private lastFrameTime: number = 0;

  constructor() {
    if (!Engine.singleton) {
      Engine.singleton = this;
    } else {
      console.log("Engine instance already exists");
      return;
    }

    const canvas = document.querySelector("#gl-canvas") as HTMLCanvasElement;
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
    if (this.running === true) return;

    this.running = true;
    this.lastFrameTime = performance.now();

    requestAnimationFrame(this.tick);
  }

  stop() {
    this.running = false;
    this.renderer?.destroy();
  }

  addSystem(system: System) {
    this.systems.push(system);
  }

  private update(dt: number) {
    this.scene.onUpdate(dt);

    for (const system of this.systems) {
      if (system.onUpdate) system.onUpdate(dt);
    }
  }

  private render() {
    let mainCamera = undefined;
    const cameraView = this.scene.getView(Camera.name);
    for (const [id, camera] of cameraView.entities()) {
      mainCamera = camera as Camera;
    }

    this.renderer?.begin(mainCamera);
    this.scene.onRender();
    for (const system of this.systems) {
      if (system.onRender) system.onRender();
    }
    this.renderer?.end();
  }

  private tick = (timestamp: number) => {
    if (!this.running) return;

    const deltaTime = (timestamp - this.lastFrameTime) / 1000; // in seconds
    this.lastFrameTime = timestamp;

    this.update(deltaTime);
    this.render();

    requestAnimationFrame(this.tick);
  }
}