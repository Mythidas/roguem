import type { Vector2, Vector4 } from "../math/vector.js";
import type Texture from "./texture.js";

export default class Sprite {
  readonly coordinates: [Vector2, Vector2, Vector2, Vector2];
  // TR       TL      BR      BL
  // [[1, 1], [0, 1], [1, 0], [0, 0]]

  constructor(readonly texture: Texture, offset: Vector2, size: Vector2) {
    const textureSize = texture.getSize();
    const tr: Vector2 = [((offset[0] + 1) * size[0]) / textureSize[0]!, ((offset[1] + 1) * size[1]) / textureSize[1]!];
    const tl: Vector2 = [((offset[0]) * size[0]) / textureSize[0]!, ((offset[1] + 1) * size[1]) / textureSize[1]!];
    const br: Vector2 = [((offset[0] + 1) * size[0]) / textureSize[0]!, ((offset[1]) * size[1]) / textureSize[1]!];
    const bl: Vector2 = [((offset[0]) * size[0]) / textureSize[0]!, ((offset[1]) * size[1]) / textureSize[1]!];
    this.coordinates = [tr, tl, br, bl];
  }
}