import type { Vector2, Vector3 } from "../math/vector.js";
import Component from "../scene/component.js";

export default class Transform extends Component {
  position: Vector3 = [0, 0, 0];
  rotation: Vector3 = [0, 0, 0];
  scale: Vector2 = [1, 1];
}