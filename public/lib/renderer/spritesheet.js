import Sprite from "./sprite.js";
export default class SpriteSheet {
    texture;
    sprites = [];
    index = 0;
    constructor(texture, spriteSize, count, offset) {
        this.texture = texture;
        const textureSize = texture.getSize();
        const columns = Math.floor(textureSize[0] / spriteSize[0]);
        const rows = Math.floor(textureSize[1] / spriteSize[1]);
        for (let y = columns - 1; y >= 0; y--) {
            for (let x = 0; x < rows; x++) {
                console.log(this.sprites.length);
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
}
