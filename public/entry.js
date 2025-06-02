import PlayerController from "./lib/components/playercontroller.js";
import SpriteAnimator from "./lib/components/spriteanimator.js";
import SpriteRenderer from "./lib/components/spriterenderer.js";
import Engine from "./lib/core/engine.js";
import SpriteSheet from "./lib/renderer/spritesheet.js";
import Texture from "./lib/renderer/texture.js";
main();
function main() {
    const engine = new Engine();
    engine.start();
    const scene = engine.getScene();
    const ent1 = scene.createEntity();
    ent1.addComponent(PlayerController);
    const sprite = ent1.addComponent(SpriteRenderer);
    sprite.zIndex = 1;
    const animator = ent1.addComponent(SpriteAnimator);
    animator.spriteRenderer = sprite;
    const texture = new Texture("assets/knight.png");
    texture.load().then((data) => {
        animator.spriteSheet = new SpriteSheet(texture, [32, 32], 4);
        sprite.sprite = animator.spriteSheet.getNextSprite();
    });
    const ent2 = scene.createEntity();
    ent2.addComponent(SpriteRenderer);
    ent2.position[0] = 2;
}
