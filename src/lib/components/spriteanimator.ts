import type SpriteSheet from "../renderer/spritesheet.js";
import Component from "../scene/component.js";
import type SpriteRenderer from "./spriterenderer.js";

export default class SpriteAnimator extends Component {
  readonly name: string = "SpriteAnimator";

  entityId: string = "";
  spriteSheet: SpriteSheet | undefined;
  framesPerSecond: number = 24;
  spriteRenderer: SpriteRenderer | undefined;

  private countdown = 0;
  private variables: Record<string, boolean> = {};
  private rules: { deps: Record<string, boolean>, spriteSheet: SpriteSheet }[] = [];

  onUpdate(dt: number, entityId: [number, number]): void {
    this.countdown -= dt;
    if (this.countdown <= 0 && this.spriteSheet) {
      this.countdown = 1 / this.framesPerSecond;

      if (this.spriteRenderer)
        this.spriteRenderer.sprite = this.spriteSheet?.getNextSprite();
    }

    this.checkRules();
  }

  setRule(deps: Record<string, boolean>, spriteSheet: SpriteSheet) {
    this.rules.push({ deps, spriteSheet });
  }

  setVar(name: string, defaultValue: boolean) {
    this.variables[name] = defaultValue;
  }

  getVar(name: string) {
    return this.variables[name] || false;
  }

  private checkRules() {
    for (const rule of this.rules) {
      let triggered = true;
      for (const [name, value] of Object.entries(rule.deps)) {
        if (this.variables[name] !== undefined && (this.variables[name] !== value)) {
          triggered = false;
          break;
        }
      }

      if (triggered && this.spriteSheet !== rule.spriteSheet) {
        rule.spriteSheet.reset();
        this.spriteSheet = rule.spriteSheet;
        this.countdown = 0;
        break;
      }
    }
  }
}