import Camera from "./lib/components/camera.js";
import PlayerController from "./lib/components/playercontroller.js";
import SpriteAnimator from "./lib/components/spriteanimator.js";
import SpriteRenderer from "./lib/components/spriterenderer.js";
import Transform from "./lib/components/transform.js";
import Engine from "./lib/core/engine.js";
import type { Vector2 } from "./lib/math/vector.js";
import Overlay, { OverlayLocation } from "./lib/renderer/overlay.js";
import SpriteSheet from "./lib/renderer/spritesheet.js";
import Texture from "./lib/renderer/texture.js";
import type Component from "./lib/scene/component.js";
import Entity from "./lib/scene/entity.js";
import SpriteSystem from "./lib/systems/SpriteSystem.js";

main();

function main() {
  const engine = new Engine();

  class FPSComponent implements Component {
    readonly name: string = "FPSComponent";

    entityId: string = "";
    element: string;

    constructor() {
      this.element = Overlay.createElement(OverlayLocation.BOTTOM_RIGHT);
    }

    onUpdate(dt: number): void {
      Overlay.writeText(this.element, `FPS: ${Math.floor(1 / dt)}`);
    }
  }

  engine.start();
  engine.addSystem(new SpriteSystem);

  const scene = engine.getScene();
  const ent1 = Entity.createEntity();
  ent1.addComponent<Transform>(Transform.name, new Transform);
  const controller = ent1.addComponent<PlayerController>(PlayerController.name, new PlayerController());
  const sprite = ent1.addComponent<SpriteRenderer>(SpriteRenderer.name, new SpriteRenderer());
  controller.spriteRenderer = sprite;
  sprite.zIndex = 1;
  const animator = ent1.addComponent<SpriteAnimator>(SpriteAnimator.name, new SpriteAnimator());
  controller.spriteAnimator = animator;
  animator.spriteRenderer = sprite;
  animator.framesPerSecond = 8;
  const texture = new Texture("assets/knight.png");
  texture.load().then((data) => {
    const spriteSize: Vector2 = [32, 32];
    const idleAnimation = new SpriteSheet(texture, spriteSize, 4);
    const runAnimation = new SpriteSheet(texture, spriteSize, 16, [0, 2]);

    animator.spriteSheet = idleAnimation;
    animator.setVar("walking", false);
    animator.setRule({ "walking": false }, idleAnimation);
    animator.setRule({ "walking": true }, runAnimation);
  });

  const ent3 = Entity.createEntity();
  const camera = ent3.addComponent<Camera>(Camera.name, new Camera());
  const transform3 = ent3.addComponent<Transform>(Transform.name, new Transform());
  transform3.position[2] = -5;
  camera.clearColor = [0.6, 0.4, 0.3, 1.0]
  camera.size = 5;

  const ent2 = Entity.createEntity();
  ent2.addComponent<SpriteRenderer>(SpriteRenderer.name, new SpriteRenderer());
  ent2.addComponent<FPSComponent>(FPSComponent.name, new SpriteRenderer());
  ent2.addComponent<Transform>(Transform.name, new Transform);
}
