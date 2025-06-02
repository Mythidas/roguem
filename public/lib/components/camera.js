import Engine from "../core/engine.js";
import * as mat4 from "../math/matrix4.js";
export default class Camera {
    name = "Camera";
    entityId = "";
    nearClip = 0.1;
    farClip = 100;
    size = 5;
    clearColor = [1, 1, 1, 1];
    projectionMatrix;
    modelViewMatrix;
    aspectRatio = 1;
    width = 1280;
    height = 720;
    constructor() {
        this.projectionMatrix = mat4.create();
        this.modelViewMatrix = mat4.create();
    }
    getProjection = () => this.projectionMatrix;
    getModelView = () => this.modelViewMatrix;
    onUpdate(dt) {
        const entity = Engine.get()?.getScene().getEntity(this.entityId);
        if (!entity)
            return;
        this.modelViewMatrix = mat4.create();
        const position = [-entity.position[0], -entity.position[1], entity.position[2]];
        mat4.translate(this.modelViewMatrix, position);
    }
    resize(width, height) {
        if ((width <= 0 || height <= 0) ||
            (this.width === width && this.height === height))
            return;
        this.width = width;
        this.height = height;
        this.aspectRatio = width / height;
        this.validate();
    }
    validate() {
        this.projectionMatrix = mat4.create();
        mat4.orthographic(this.projectionMatrix, this.size, this.aspectRatio, this.nearClip, this.farClip);
    }
}
