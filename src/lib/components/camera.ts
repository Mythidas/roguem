import Engine from "../core/engine.js";
import * as mat4 from "../math/matrix4.js";
import type { Vector3, Vector4 } from "../math/vector.js";
import type Component from "../scene/component.js";

export default class Camera implements Component {
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
    this.projectionMatrix = mat4.create();
    this.modelViewMatrix = mat4.create();
  }

  getProjection = () => this.projectionMatrix;
  getModelView = () => this.modelViewMatrix;

  onUpdate(dt: number): void {
    const entity = Engine.get()?.getScene().getEntity(this.entityId);
    if (!entity) return;

    this.modelViewMatrix = mat4.create();
    const position: Vector3 = [-entity.position[0], -entity.position[1], entity.position[2]]
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