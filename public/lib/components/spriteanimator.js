export default class SpriteAnimator {
    name = "SpriteAnimator";
    entityId = "";
    spriteSheet;
    framesPerSecond = 24;
    spriteRenderer;
    countdown = 1 / this.framesPerSecond;
    onUpdate(dt) {
        this.countdown -= dt;
        if (this.countdown <= 0 && this.spriteSheet) {
            this.countdown = 1 / this.framesPerSecond;
            if (this.spriteRenderer)
                this.spriteRenderer.sprite = this.spriteSheet?.getNextSprite();
        }
    }
}
