import Engine from "../core/engine.js";
export default class SpriteRenderer {
    name = "SpriteRenderer";
    entityId = "";
    sprite;
    color = [1, 1, 1, 1];
    zIndex = 0;
    flipX = false;
    flipY = false;
    onRender() {
        const ent = Engine.get()?.getScene().getEntity(this.entityId);
        if (ent) {
            Engine.get()?.getRenderer()?.drawQuad(ent.position, [ent.scale[0] * (this.flipX ? -1 : 1), ent.scale[1] * (this.flipY ? -1 : 1)], [1, 1, 1, 1], this.zIndex, this.sprite?.coordinates, undefined, this.sprite?.texture);
        }
    }
}
