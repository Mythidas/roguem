import Engine from "../core/engine.js";
import Sprite from "../renderer/sprite.js";
import Component from "../scene/component.js";
import Entity from "../scene/entity.js";
import Transform from "./transform.js";
export default class SpriteRenderer extends Component {
    name = "SpriteRenderer";
    entityId = "";
    sprite;
    color = [1, 1, 1, 1];
    zIndex = 0;
    flipX = false;
    flipY = false;
}
