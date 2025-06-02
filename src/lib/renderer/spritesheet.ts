import type { Vector2 } from "../math/vector.js";
import Sprite from "./sprite.js";
import type Texture from "./texture.js";

export default class SpriteSheet {
  private sprites: Sprite[] = [];
  private index: number = 0;

  constructor(readonly texture: Texture, spriteSize: Vector2, count?: number, offset?: Vector2) {
    const textureSize = texture.getSize();
    const columns = Math.floor(textureSize[0]! / spriteSize[0]);
    const rows = Math.floor(textureSize[1]! / spriteSize[1]);
    const xStart = offset ? offset[0] : 0;
    const yStart = offset ? columns - 1 - offset[1] : columns - 1;

    for (let y = yStart; y >= 0; y--) {
      for (let x = xStart; x < rows; x++) {
        if (count && this.sprites.length >= count) {
          return;
        }
        this.sprites.push(new Sprite(texture, [x, y], spriteSize));
      }
    }
  }

  getNextSprite() {
    if (this.index >= this.sprites.length) {
      this.index = 1;
      return this.sprites[0];
    }

    this.index++;
    return this.sprites[this.index - 1];
  }

  reset() {
    this.index = 0;
  }
}