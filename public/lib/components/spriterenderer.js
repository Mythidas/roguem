import Engine from "../core/engine.js";
export default class SpriteRenderer {
    name = "SpriteRenderer";
    entityId = "";
    sprite;
    color = [1, 1, 1, 1];
    zIndex = 0;
    onRender() {
        const ent = Engine.get()?.getScene().getEntity(this.entityId);
        if (ent) {
            Engine.get()?.getRenderer()?.drawQuad(ent.position, ent.scale, [1, 1, 1, 1], this.zIndex, this.sprite?.coordinates, undefined, this.sprite?.texture);
        }
    }
}
