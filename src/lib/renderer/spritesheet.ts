import type { Vector2 } from "../math/vector.js";
import Sprite from "./sprite.js";
import type Texture from "./texture.js";

export default class SpriteSheet {
  private sprites: Sprite[] = [];
  private index: number = 0;

  constructor(readonly texture: Texture, spriteSize: Vector2) {
    const textureSize = texture.getSize();
    const columns = Math.floor(textureSize[0]! / spriteSize[0]);
    const rows = Math.floor(textureSize[1]! / spriteSize[1]);

    for (let y = columns - 1; y >= 0; y--) {
      for (let x = 0; x < rows; x++) {
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
}