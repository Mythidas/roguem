import Engine from "../core/engine.js";
import Input, { Keys } from "../core/input.js";
export var PlayerState;
(function (PlayerState) {
    PlayerState[PlayerState["IDLE"] = 0] = "IDLE";
    PlayerState[PlayerState["WALKING"] = 1] = "WALKING";
})(PlayerState || (PlayerState = {}));
export default class PlayerController {
    name = "PlayerController";
    entityId = "";
    speed = 3.0;
    state = PlayerState.IDLE;
    spriteAnimator;
    velocity = [0, 0];
    onUpdate(dt) {
        const entity = Engine.get()?.getScene().getEntity(this.entityId);
        if (entity) {
            this.move(entity, dt);
            if (this.spriteAnimator) {
                if (this.state === PlayerState.IDLE) {
                    this.spriteAnimator.setVar("walking", false);
                }
                else
                    this.spriteAnimator.setVar("walking", true);
            }
        }
    }
    move(entity, dt) {
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
        }
        else
            this.state = PlayerState.IDLE;
        this.velocity = [0, 0];
    }
}
