import type Camera from "../components/camera.js";
import Overlay from "../renderer/overlay.js";
import GLRenderer from "../renderer/renderer.js";
import Scene from "../scene/scene.js";

export default class Engine {
  static singleton: Engine | undefined;

  private running = false;
  private renderer: GLRenderer | undefined;
  private scene: Scene = new Scene("default");
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
  public isRunning = () => this.running;
  public getScene = () => this.scene;
  public getRenderer = () => this.renderer;

  public start() {
    if (this.running === true) return;

    this.running = true;
    this.lastFrameTime = performance.now();

    requestAnimationFrame(this.tick);
  }

  public stop() {
    this.running = false;
    this.renderer?.destroy();
  }

  update(dt: number) {
    this.scene.onUpdate(dt);
  }

  render() {
    let camera = undefined;
    for (const ent of this.scene.getEntities()) {
      const cameraComponent = ent.getComponent<Camera>("Camera");
      if (cameraComponent) {
        camera = cameraComponent;
        break;
      }
    }

    this.renderer?.begin(camera);
    this.scene.onRender();
    this.renderer?.end();
  }

  tick = (timestamp: number) => {
    if (!this.running) return;

    const deltaTime = (timestamp - this.lastFrameTime) / 1000; // in seconds
    this.lastFrameTime = timestamp;

    this.update(deltaTime);
    this.render();

    requestAnimationFrame(this.tick);
  }
}