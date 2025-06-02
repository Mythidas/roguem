import type { Vector2 } from "../math/vector.js";

export default class Texture {
  pixelsPerUnit = 100;

  private data!: ImageBitmap | undefined;

  constructor(private path: string) {
    this.load();
  }

  getSize = () => [this.data?.width || -1, this.data?.height || -1];
  isLoaded = () => !!this.data;

  public async load(): Promise<ImageBitmap> {
    try {
      if (this.data) {
        return this.data;
      }

      const img = await this.loadImage(this.path);
      this.data = await createImageBitmap(img, {
        imageOrientation: "flipY",
      });

      return this.data;
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  }

  public scaleCoords(size: number, coords: [Vector2, Vector2, Vector2, Vector2]) {
    if (!this.data) return coords;
    const ratio = [this.data?.width / size, this.data?.height / size];
    coords[0] = [coords[0][0] * ratio[0]!, coords[0][1] * ratio[1]!];
    coords[1] = [coords[1][0] * ratio[0]!, coords[1][1] * ratio[1]!];
    coords[2] = [coords[2][0] * ratio[0]!, coords[2][1] * ratio[1]!];
    coords[3] = [coords[3][0] * ratio[0]!, coords[3][1] * ratio[1]!];
  }

  private loadImage(path: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = path;
      img.onload = () => resolve(img);
      img.onerror = reject;
    });
  }
}
