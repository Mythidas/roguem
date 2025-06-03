import Engine from "../core/engine.js";
import type { Vector4 } from "../math/vector.js";
import type Sprite from "../renderer/sprite.js";
import type Component from "../scene/component.js";

export default class SpriteRenderer implements Component {
  readonly name: string = "SpriteRenderer";

  entityId: string = "";
  sprite: Sprite | undefined;
  color: Vector4 = [1, 1, 1, 1];
  zIndex: number = 0;
  flipX: boolean = false;
  flipY: boolean = false;

  onRender(): void {
    const ent = Engine.get()?.getScene().getEntity(this.entityId);
    if (ent) {
      Engine.get()?.getRenderer()?.drawQuad(
        ent.position,
        [ent.scale[0] * (this.flipX ? -1 : 1), ent.scale[1] * (this.flipY ? -1 : 1)],
        [1, 1, 1, 1],
        this.zIndex,
        this.sprite?.coordinates,
        undefined,
        this.sprite?.texture
      );
    }
  }
}