import Engine from "../core/engine.js";
import Input, { Keys } from "../core/input.js";
import Component from "../scene/component.js";
import Entity from "../scene/entity.js";
import Transform from "./transform.js";
export default class PlayerController extends Component {
    name = "PlayerController";
    entityId = "";
    speed = 3.0;
    spriteAnimator;
    spriteRenderer;
    velocity = [0, 0];
    onUpdate(dt, entityId) {
        const transform = Entity.getEntity(entityId).getComponent(Transform.name);
        if (transform) {
            this.move(transform, dt);
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
    move(transform, dt) {
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
