import type Component from "./component.js";
import ComponentPool from "./componentpool.js";

export type EntityID = [number, number];

export default class Scene {
  private entities: EntityID[] = [];
  private entities_d: EntityID[] = [];
  private componentPool: ComponentPool = new ComponentPool();
  private running: boolean = true;

  constructor(readonly name: string) {

  }

  createEntity(): EntityID {
    if (this.entities_d.length > 0) {
      const entityId: EntityID = [...this.entities_d[this.entities_d.length - 1]!];
      this.entities_d.splice(-1);
      return entityId;
    }

    const entityId: EntityID = [this.entities.length, 0];
    this.entities.push(entityId);
    return [...entityId];
  }

  destroyEntity(id: EntityID): void {
    if (!this.isValidID(id)) return;

    this.entities[id[0]] = [id[0], this.entities[id[0]]![1] + 1];
    this.entities_d.push(this.entities[id[0]]!);
  }

  addComponent<T extends Component>(id: EntityID, type: string, data: object) {
    if (!this.isValidID(id)) return;
    return this.componentPool.add<T>(id[0], type, data);
  }

  getComponent<T extends Component>(id: EntityID, type: string) {
    if (!this.isValidID(id)) return;
    return this.componentPool.get<T>(id[0], type);
  }

  removeComponent(id: EntityID, type: string) {
    if (!this.isValidID(id)) return;
    this.componentPool.remove(id[0], type);
  }

  hasComponent(id: EntityID, type: string) {
    if (!this.isValidID(id)) return false;
    return !!this.componentPool.get(id[0], type);
  }

  getView = (...types: string[]) => new ComponentView(this.componentPool, ...types);

  onUpdate(dt: number) {
    for (const ent of this.entities) {
      for (const comp of this.componentPool.getAll(ent[0])) {
        comp.onUpdate && comp.onUpdate(dt, ent);
      }
    }
  }

  onRender() {
    for (const ent of this.entities) {
      for (const comp of this.componentPool.getAll(ent[0])) {
        comp.onRender && comp.onRender(ent);
      }
    }
  }

  private isValidID(id: EntityID) {
    return this.entities[id[0]] && this.entities[id[0]]![1] === id[1];
  }
}

export class ComponentView {
  private readonly pool: ComponentPool;
  private types: string[];

  constructor(pool: ComponentPool, ...types: string[]) {
    this.pool = pool;
    this.types = types;
  }

  *entities() {
    if (this.types.length === 0) return;

    const [firstType, ...rest] = this.types;
    const baseMap = this.pool.getType(firstType!);

    for (const [entityId, firstData] of baseMap.entries()) {
      let valid = true;
      for (const type of rest) {
        if (!this.pool.get(entityId, type)) {
          valid = false;
          break;
        }
      }
      if (!valid) continue;

      // Build the full component tuple
      const components = this.types.map(type =>
        this.pool.get(entityId, type)
      );
      yield [entityId, ...components];
    }
  }
}