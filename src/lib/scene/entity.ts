import type { Vector2, Vector3 } from "../math/vector.js";
import type Component from "./component.js";

export default class Entity {
  readonly id: string;
  position: Vector3 = [0, 0, 0];
  rotation: Vector3 = [0, 0, 0];
  scale: Vector2 = [1, 1];

  private components: Record<string, Component> = {};

  constructor() {
    this.id = crypto.randomUUID();
  }

  public hasComponent(name: string) {
    return !!this.components[name];
  }

  public getComponent<T extends Component>(name: string): T | undefined {
    return this.components[name] as T | undefined;
  }

  public addComponent(component: Component) {
    this.components[component.name] = component;
  }

  public removeComponent(name: string) {
    if (this.components[name]) {
      delete this.components[name];
    }
  }

  public getComponents = () => this.components;
}