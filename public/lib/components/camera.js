import Engine from "../core/engine.js";
import * as mat4 from "../math/matrix4.js";
import Component from "../scene/component.js";
import Entity from "../scene/entity.js";
import Transform from "./transform.js";
export default class Camera extends Component {
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
        super();
        this.projectionMatrix = mat4.create();
        this.modelViewMatrix = mat4.create();
    }
    getProjection = () => this.projectionMatrix;
    getModelView = () => this.modelViewMatrix;
    onUpdate(dt, entityId) {
        const transform = Entity.getEntity(entityId).getComponent(Transform.name);
        if (!transform)
            return;
        this.modelViewMatrix = mat4.create();
        const position = [-transform.position[0], -transform.position[1], transform.position[2]];
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
