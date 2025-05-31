import type SpriteSheet from "../renderer/spritesheet.js";
import type Component from "../scene/component.js";
import type SpriteRenderer from "./spriterenderer.js";

export default class SpriteAnimator implements Component {
  readonly name: string = "SpriteAnimator";

  entityId: string = "";
  spriteSheet: SpriteSheet | undefined;
  framesPerSecond: number = 24;
  spriteRenderer: SpriteRenderer | undefined;

  private countdown = 1 / this.framesPerSecond;

  onUpdate(dt: number): void {
    this.countdown -= dt;
    if (this.countdown <= 0 && this.spriteSheet) {
      this.countdown = 1 / this.framesPerSecond;

      if (this.spriteRenderer)
        this.spriteRenderer.sprite = this.spriteSheet?.getNextSprite();
    }
  }
}