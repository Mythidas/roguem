import Engine from "../core/engine.js";
import Input, { Keys } from "../core/input.js";
export default class PlayerController {
    name = "PlayerController";
    entityId = "";
    speed = 3.0;
    spriteAnimator;
    spriteRenderer;
    velocity = [0, 0];
    onUpdate(dt) {
        const entity = Engine.get()?.getScene().getEntity(this.entityId);
        if (entity) {
            this.move(entity, dt);
            if (this.spriteAnimator) {
                if (this.velocity[0] !== 0 || this.velocity[1] !== 0) {
                    this.spriteAnimator.setVar('walking', true);
                }
                else
                    this.spriteAnimator.setVar('walking', false);
            }
            if (this.spriteRenderer) {
                if (this.velocity[0] < 0) {
                    this.spriteRenderer.flipX = true;
                }
                else if (this.velocity[0] > 0) {
                    this.spriteRenderer.flipX = false;
                }
            }
        }
    }
    move(entity, dt) {
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
        entity.position[0] += this.velocity[0] * dt;
        entity.position[1] += this.velocity[1] * dt;
    }
}
