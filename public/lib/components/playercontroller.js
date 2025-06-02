import Engine from "../core/engine.js";
import Input, { Keys } from "../core/input.js";
export default class PlayerController {
    name = "PlayerController";
    entityId = "";
    speed = 3.0;
    onUpdate(dt) {
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
