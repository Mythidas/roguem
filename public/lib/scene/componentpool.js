export default class ComponentPool {
    store;
    constructor() {
        this.store = new Map(); // Map<type, Map<EntityID, Component>>
    }
    add(entityId, type, data) {
        if (!this.store.has(type)) {
            this.store.set(type, new Map());
        }
        this.store.get(type).set(entityId, data);
        return this.get(entityId, type);
    }
    get(entityId, type) {
        return this.store.get(type)?.get(entityId);
    }
    remove(entityId, type) {
        this.store.get(type)?.delete(entityId);
    }
    getType(type) {
        return this.store.get(type) || new Map();
    }
    getAll(entityId) {
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
