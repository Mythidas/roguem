export default class Texture {
  private data!: ImageBitmap | undefined;

  constructor(private path: string) { }

  public async load(): Promise<ImageBitmap> {
    try {
      if (this.data) {
        return this.data;
      }

      const img = await this.loadImage(this.path);
      this.data = await createImageBitmap(img, {
        imageOrientation: "flipY",
      });

      return Promise.resolve(this.data);
    } catch (err) {
      console.log(err);
      return Promise.reject();
    }
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
