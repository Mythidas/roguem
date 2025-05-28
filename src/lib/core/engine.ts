import GLRenderer from "../renderer/renderer.js";

type EngineState = {
  running: boolean;
}

export default class Engine {
  static singleton: Engine | undefined;

  private state: EngineState = {
    running: false
  };
  private renderer: GLRenderer | undefined;
  private lastFrameTime: number = 0;

  constructor() {
    if (!Engine.singleton) {
      Engine.singleton = this;
    } else {
      console.log("Engine instance already exists");
      return;
    }

    const canvas = document.querySelector("#gl-canvas") as HTMLCanvasElement;
    this.renderer = new GLRenderer(canvas);
    if (!this.renderer.initialized()) {
      console.log("Unable to initialize WebGL. Your browser or machine may not support it.");
      return;
    }
  }

  public start() {
    if (this.state.running === true) return;

    this.state.running = true;
    this.lastFrameTime = performance.now();
    requestAnimationFrame(this.tick);
  }

  public stop() {
    this.state.running = false;
  }

  public update(dt: number) {
  }

  public render(dt: number) {
    this.renderer?.beginScene();
    this.renderer?.drawQuad([-3, 0, 0], [1, 1]);
    this.renderer?.drawQuad([0, 0, 0], [1, 1]);
    this.renderer?.endScene();
  }

  public tick = (timestamp: number) => {
    if (!this.state.running) return;

    const deltaTime = (timestamp - this.lastFrameTime) / 1000; // in seconds
    this.lastFrameTime = timestamp;

    this.update(deltaTime);
    this.render(deltaTime);

    requestAnimationFrame(this.tick);
  }

  public get(): Engine | undefined {
    return Engine.singleton;
  }

  public getState() {
    return this.state;
  }
}