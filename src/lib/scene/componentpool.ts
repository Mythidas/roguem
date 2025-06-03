import type Component from "./component.js";

export default class ComponentPool {
  private store: Map<string, Map<number, Component>>;

  constructor() {
    this.store = new Map(); // Map<type, Map<EntityID, Component>>
  }

  add<T extends Component>(entityId: number, type: string, data: any) {
    if (!this.store.has(type)) {
      this.store.set(type, new Map());
    }
    this.store.get(type)!.set(entityId, data);
    return this.get(entityId, type)! as T;
  }

  get<T extends Component>(entityId: number, type: string) {
    return this.store.get(type)?.get(entityId) as T;
  }

  remove(entityId: number, type: string) {
    this.store.get(type)?.delete(entityId);
  }

  getType(type: string) {
    return this.store.get(type) || new Map();
  }

  getAll(entityId: number) {
    const comps = [];
    for (const [type, map] of this.store) {
      for (const [ent, comp] of map) {
        if (ent === entityId) {
          comps.push(comp);
        }
      }
    }

    return comps;
  }
}