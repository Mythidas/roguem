import Engine from "../core/engine.js";
import * as mat4 from "../math/matrix4.js";
import type { Vector3, Vector4 } from "../math/vector.js";
import Component from "../scene/component.js";
import Entity from "../scene/entity.js";
import Transform from "./transform.js";

export default class Camera extends Component {
  readonly name: string = "Camera";

  entityId: string = "";
  nearClip: number = 0.1;
  farClip: number = 100;
  size: number = 5;
  clearColor: Vector4 = [1, 1, 1, 1];

  private projectionMatrix: mat4.Matrix4;
  private modelViewMatrix: mat4.Matrix4;
  private aspectRatio: number = 1;
  private width: number = 1280;
  private height: number = 720;

  constructor() {
    super();
    this.projectionMatrix = mat4.create();
    this.modelViewMatrix = mat4.create();
  }

  getProjection = () => this.projectionMatrix;
  getModelView = () => this.modelViewMatrix;

  onUpdate(dt: number, entityId: [number, number]): void {
    const transform = Entity.getEntity(entityId).getComponent<Transform>(Transform.name);
    if (!transform) return;

    this.modelViewMatrix = mat4.create();
    const position: Vector3 = [-transform.position[0], -transform.position[1], transform.position[2]]
    mat4.translate(this.modelViewMatrix, position);
  }

  resize(width: number, height: number) {
    if ((width <= 0 || height <= 0) ||
      (this.width === width && this.height === height)) return;

    this.width = width; this.height = height;
    this.aspectRatio = width / height;
    this.validate();
  }

  private validate() {
    this.projectionMatrix = mat4.create();
    mat4.orthographic(this.projectionMatrix, this.size, this.aspectRatio, this.nearClip, this.farClip);
  }
}