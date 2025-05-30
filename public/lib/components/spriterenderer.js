import Engine from "../core/engine.js";
class SpriteRenderer {
    name = "SpriteRenderer";
    sprite;
    color = [1, 1, 1, 1];
    constructor() {
    }
    onRender(dt, entId) {
        const ent = Engine.get()?.getScene().getEntity(entId);
        if (ent) {
            Engine.get()?.getRenderer()?.drawQuad(ent.position, ent.scale, [1, 1, 1, 1], undefined, undefined, this.sprite?.texture);
        }
    }
}
