import Engine from "../core/engine.js";
import type { Vector4 } from "../math/vector.js";
import type Sprite from "../renderer/sprite.js";
import type Component from "../scene/component.js";

class SpriteRenderer implements Component {
  readonly name: string = "SpriteRenderer";
  sprite: Sprite | undefined;
  color: Vector4 = [1, 1, 1, 1];

  constructor() {
  }

  onRender(dt: number, entId: string): void {
    const ent = Engine.get()?.getScene().getEntity(entId);
    if (ent) {
      Engine.get()?.getRenderer()?.drawQuad(ent.position, ent.scale, [1, 1, 1, 1], undefined, undefined, this.sprite?.texture);
    }
  }
}