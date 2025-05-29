export default class Texture {
    path;
    data;
    constructor(path) {
        this.path = path;
    }
    async load() {
        try {
            if (this.data) {
                return this.data;
            }
            const img = await this.loadImage(this.path);
            this.data = await createImageBitmap(img, {
                imageOrientation: "flipY",
            });
            return Promise.resolve(this.data);
        }
        catch (err) {
            console.log(err);
            return Promise.reject();
        }
    }
    loadImage(path) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = path;
            img.onload = () => resolve(img);
            img.onerror = reject;
        });
    }
}
