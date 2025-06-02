import Entity from "./entity.js"

export default class Scene {
  private entities: Entity[] = [];
  private running: boolean = true;

  constructor(readonly name: string) {
  }

  createEntity(): Entity {
    return this.entities[this.entities.push(new Entity()) - 1]!;
  }

  getEntity(id: string) {
    return this.entities.find((e) => e.id === id);
  }

  getEntities = () => this.entities;

  destroyEntity(id: string) {
    this.entities.filter((e) => e.id !== id);
  }

  onUpdate(dt: number) {
    if (!this.running) return;

    for (const ent of this.entities) {
      for (const [key, component] of Object.entries(ent.getComponents())) {
        if (component.onUpdate) component.onUpdate(dt);
      }
    }
  }

  onRender() {
    for (const ent of this.entities) {
      for (const [key, component] of Object.entries(ent.getComponents())) {
        if (component.onRender) component.onRender();
      }
    }
  }

  pause() {
    this.running = false;
  }

  play() {
    this.running = true;
  }
}