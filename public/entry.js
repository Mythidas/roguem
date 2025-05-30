import Engine from "./lib/core/engine.js";
import Input, { Keys } from "./lib/core/input.js";
import Sprite from "./lib/renderer/sprite.js";
import SpriteSheet from "./lib/renderer/spritesheet.js";
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
        sprite;
        spriteSheet;
        speed = 0.5;
        speedTemp = 1;
        constructor(path) {
            const texture = new Texture(path);
            texture.load().then((data) => {
                this.spriteSheet = new SpriteSheet(texture, [32, 32]);
                this.sprite = this.spriteSheet.getNextSprite();
            });
        }
        onUpdate(dt, entId) {
            this.speedTemp -= dt;
            if (this.speedTemp <= 0 && this.spriteSheet) {
                this.speedTemp = this.speed;
                this.sprite = this.spriteSheet?.getNextSprite();
            }
        }
        onRender(dt, entId) {
            const ent = Engine.get()?.getScene().getEntity(entId);
            if (ent) {
                Engine.get()?.getRenderer()?.drawQuad(ent.position, ent.scale, [1, 1, 1, 1], this.sprite?.coordinates, undefined, this.sprite?.texture);
            }
        }
    }
    engine.start();
    const scene = engine.getScene();
    const ent1 = scene.createEntity();
    ent1.addComponent(new MovementComponent());
    ent1.addComponent(new SpriteComponent("assets/test.png"));
}
