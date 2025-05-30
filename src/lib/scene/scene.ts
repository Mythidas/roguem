import Entity from "./entity.js"

export default class Scene {
  private entities: Entity[] = [];
  private running: boolean = true;

  constructor(readonly name: string) {
  }

  public createEntity(): Entity {
    return this.entities[this.entities.push(new Entity()) - 1]!;
  }

  public getEntity(id: string) {
    return this.entities.find((e) => e.id === id);
  }

  public destroyEntity(id: string) {
    this.entities.filter((e) => e.id !== id);
  }

  public onUpdate(dt: number) {
    if (!this.running) return;

    for (const ent of this.entities) {
      for (const [key, component] of Object.entries(ent.getComponents())) {
        if (component.onUpdate) component.onUpdate(dt, ent.id);
      }
    }
  }

  public onRender(dt: number) {
    for (const ent of this.entities) {
      for (const [key, component] of Object.entries(ent.getComponents())) {
        if (component.onRender) component.onRender(dt, ent.id);
      }
    }
  }

  public pause() {
    this.running = false;
  }

  public play() {
    this.running = true;
  }
}