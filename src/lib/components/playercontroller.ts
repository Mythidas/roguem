import Engine from "../core/engine.js";
import Input, { Keys } from "../core/input.js";
import type Component from "../scene/component.js";

export default class PlayerController implements Component {
  readonly name: string = "PlayerController";
  entityId: string = "";

  speed = 3.0;

  onUpdate(dt: number): void {
    const entity = Engine.get()?.getScene().getEntity(this.entityId);
    if (entity) {
      if (Input.isKeyDown(Keys.W)) {
        entity.position[1] += this.speed * dt;
      }
      if (Input.isKeyDown(Keys.S)) {
        entity.position[1] -= this.speed * dt;
      }
      if (Input.isKeyDown(Keys.A)) {
        entity.position[0] -= this.speed * dt;
      }
      if (Input.isKeyDown(Keys.D)) {
        entity.position[0] += this.speed * dt;
      }
    }
  }
}