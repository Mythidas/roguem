import Engine from "../core/engine.js";
import type Component from "./component.js";
import type Scene from "./scene.js";
import type { EntityID } from "./scene.js";

export default class Entity {
  private scene: Scene;

  constructor(readonly id: EntityID) {
    this.scene = Engine.get()!.getScene();
  }

  static createEntity = () => new Entity(Engine.get()?.getScene().createEntity()!);
  static getEntity = (id: EntityID) => new Entity(id);
  static destroyEntity = (id: EntityID) => Engine.get()?.getScene().destroyEntity(id);

  addComponent = <T extends Component>(t: string, d: object) => this.scene.addComponent<T>(this.id, t, d)!;
  getComponent = <T extends Component>(t: string) => this.scene.getComponent<T>(this.id, t);
  removeComponent = (t: string) => this.scene.removeComponent(this.id, t);
  hasComponent = (type: string) => this.scene.hasComponent(this.id, type);
  destroy = () => this.scene.destroyEntity(this.id);
}