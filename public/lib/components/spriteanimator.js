import Component from "../scene/component.js";
export default class SpriteAnimator extends Component {
    name = "SpriteAnimator";
    entityId = "";
    spriteSheet;
    framesPerSecond = 24;
    spriteRenderer;
    countdown = 0;
    variables = {};
    rules = [];
    onUpdate(dt, entityId) {
        this.countdown -= dt;
        if (this.countdown <= 0 && this.spriteSheet) {
            this.countdown = 1 / this.framesPerSecond;
            if (this.spriteRenderer)
                this.spriteRenderer.sprite = this.spriteSheet?.getNextSprite();
        }
        this.checkRules();
    }
    setRule(deps, spriteSheet) {
        this.rules.push({ deps, spriteSheet });
    }
    setVar(name, defaultValue) {
        this.variables[name] = defaultValue;
    }
    getVar(name) {
        return this.variables[name] || false;
    }
    checkRules() {
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
