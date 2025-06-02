import Engine from "../core/engine.js";
import Input, { Keys } from "../core/input.js";
import type { Vector2 } from "../math/vector.js";
import type Component from "../scene/component.js";
import type Entity from "../scene/entity.js";
import type SpriteAnimator from "./spriteanimator.js";

export enum PlayerState {
  IDLE,
  WALKING
}

export default class PlayerController implements Component {
  readonly name: string = "PlayerController";
  entityId: string = "";

  speed = 3.0;
  state: PlayerState = PlayerState.IDLE;
  spriteAnimator: SpriteAnimator | undefined;

  private velocity: Vector2 = [0, 0];

  onUpdate(dt: number): void {
    const entity = Engine.get()?.getScene().getEntity(this.entityId);
    if (entity) {
      this.move(entity, dt);
      if (this.spriteAnimator) {
        if (this.state === PlayerState.IDLE) {
          this.spriteAnimator.setVar("walking", false);
        } else this.spriteAnimator.setVar("walking", true);
      }
    }
  }

  private move(entity: Entity, dt: number) {
    if (Input.isKeyDown(Keys.W)) {
      this.velocity[1] += this.speed;
    }
    if (Input.isKeyDown(Keys.S)) {
      this.velocity[1] -= this.speed;
    }
    if (Input.isKeyDown(Keys.A)) {
      this.velocity[0] -= this.speed;
    }
    if (Input.isKeyDown(Keys.D)) {
      this.velocity[0] += this.speed;
    }

    entity.position[0] += this.velocity[0] * dt;
    entity.position[1] += this.velocity[1] * dt;
    if (this.velocity[0] !== 0 || this.velocity[1] !== 0) {
      this.state = PlayerState.WALKING;
    } else this.state = PlayerState.IDLE;

    this.velocity = [0, 0];
  }
}