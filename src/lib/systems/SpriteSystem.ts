import SpriteRenderer from "../components/spriterenderer.js";
import Transform from "../components/transform.js";
import Engine from "../core/engine.js";
import System from "../core/system.js";

export default class SpriteSystem extends System {
  onRender(): void {
    const spriteView = Engine.get()?.getScene().getView(SpriteRenderer.name, Transform.name);
    if (!spriteView) return;

    for (const [ent, sprite, transform] of spriteView.entities()) {
      Engine.get()?.getRenderer()?.drawQuad(
        transform.position,
        [transform.scale[0] * (sprite.flipX ? -1 : 1), transform.scale[1] * (sprite.flipY ? -1 : 1)],
        [1, 1, 1, 1],
        sprite.zIndex,
        sprite.sprite?.coordinates,
        undefined,
        sprite.sprite?.texture
      );
    }
  }
}