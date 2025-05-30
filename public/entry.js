import Engine from "./lib/core/engine.js";
import Input, { Keys } from "./lib/core/input.js";
import Texture from "./lib/renderer/texture.js";
main();
function main() {
    const engine = new Engine();
    class MovementComponent {
        name = "MovementComponent";
        speed = 3.0;
        onUpdate(dt, entId) {
            const entity = Engine.get()?.getScene().getEntity(entId);
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
    class SpriteComponent {
        name = "SpriteComponent";
        texture;
        constructor(path) {
            this.texture = new Texture(path);
        }
        onRender(dt, entId) {
            const ent = Engine.get()?.getScene().getEntity(entId);
            if (ent) {
                Engine.get()?.getRenderer()?.drawQuad(ent.position, ent.scale, [1, 1, 1, 1], undefined, undefined, this.texture);
            }
        }
    }
    engine.start();
    const scene = engine.getScene();
    const ent = scene.createEntity();
    ent.addComponent(new MovementComponent());
    ent.addComponent(new SpriteComponent("assets/test.png"));
}
