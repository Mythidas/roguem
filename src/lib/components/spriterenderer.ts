import Engine from "../core/engine.js";
import type { Vector4 } from "../math/vector.js";
import Sprite from "../renderer/sprite.js";
import Component from "../scene/component.js";
import Entity from "../scene/entity.js";
import Transform from "./transform.js";

export default class SpriteRenderer extends Component {
  readonly name: string = "SpriteRenderer";

  entityId: string = "";
  sprite: Sprite | undefined;
  color: Vector4 = [1, 1, 1, 1];
  zIndex: number = 0;
  flipX: boolean = false;
  flipY: boolean = false;
}