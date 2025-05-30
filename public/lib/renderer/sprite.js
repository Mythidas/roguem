export default class Sprite {
    texture;
    coordinates;
    // TR       TL      BR      BL
    // [[1, 1], [0, 1], [1, 0], [0, 0]]
    constructor(texture, offset, size) {
        this.texture = texture;
        const textureSize = texture.getSize();
        const tr = [((offset[0] + 1) * size[0]) / textureSize[0], ((offset[1] + 1) * size[1]) / textureSize[1]];
        const tl = [((offset[0]) * size[0]) / textureSize[0], ((offset[1] + 1) * size[1]) / textureSize[1]];
        const br = [((offset[0] + 1) * size[0]) / textureSize[0], ((offset[1]) * size[1]) / textureSize[1]];
        const bl = [((offset[0]) * size[0]) / textureSize[0], ((offset[1]) * size[1]) / textureSize[1]];
        this.coordinates = [tr, tl, br, bl];
    }
}
