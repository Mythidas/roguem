import Engine from "../core/engine.js";
import Input, { Keys } from "../core/input.js";
import type { Vector2 } from "../math/vector.js";
import Component from "../scene/component.js";
import Entity from "../scene/entity.js";
import type SpriteAnimator from "./spriteanimator.js";
import type SpriteRenderer from "./spriterenderer.js";
import Transform from "./transform.js";

export default class PlayerController extends Component {
  readonly name: string = "PlayerController";
  entityId: string = "";

  speed = 3.0;
  spriteAnimator: SpriteAnimator | undefined;
  spriteRenderer: SpriteRenderer | undefined;

  private velocity: Vector2 = [0, 0];

  onUpdate(dt: number, entityId: [number, number]): void {
    const transform = Entity.getEntity(entityId).getComponent<Transform>(Transform.name);

    if (transform) {
      this.move(transform, dt);
      if (this.spriteAnimator) {
        if (this.velocity[0] !== 0 || this.velocity[1] !== 0) {
          this.spriteAnimator.setVar('walking', true);
        } else this.spriteAnimator.setVar('walking', false);
      }

      if (this.spriteRenderer) {
        if (this.velocity[0] < 0) {
          this.spriteRenderer.flipX = true;
        } else if (this.velocity[0] > 0) {
          this.spriteRenderer.flipX = false;
        }
      }
    }
  }

  private move(transform: Transform, dt: number) {
    this.velocity = [0, 0];

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

    transform.position[0] += this.velocity[0] * dt;
    transform.position[1] += this.velocity[1] * dt;
  }
}