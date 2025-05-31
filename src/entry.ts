import SpriteAnimator from "./lib/components/spriteanimator.js";
import SpriteRenderer from "./lib/components/spriterenderer.js";
import Engine from "./lib/core/engine.js";
import Input, { Keys } from "./lib/core/input.js";
import Sprite from "./lib/renderer/sprite.js";
import SpriteSheet from "./lib/renderer/spritesheet.js";
import Texture from "./lib/renderer/texture.js";
import type Component from "./lib/scene/component.js";

main();

function main() {
  const engine = new Engine();

  class MovementComponent implements Component {
    readonly name: string = "MovementComponent";
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

  engine.start();
  const scene = engine.getScene();
  const ent1 = scene.createEntity();
  ent1.addComponent<MovementComponent>(MovementComponent);
  const sprite = ent1.addComponent<SpriteRenderer>(SpriteRenderer);
  const animator = ent1.addComponent<SpriteAnimator>(SpriteAnimator);
  animator.spriteRenderer = sprite;
  const texture = new Texture("assets/test.png");
  texture.load().then((data) => {
    animator.spriteSheet = new SpriteSheet(texture, [32, 32]);
    sprite.sprite = animator.spriteSheet.getNextSprite();
  });
}
