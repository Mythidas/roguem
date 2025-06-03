import ComponentPool from "./componentpool.js";
export default class Scene {
    name;
    entities = [];
    entities_d = [];
    componentPool = new ComponentPool();
    running = true;
    constructor(name) {
        this.name = name;
    }
    createEntity() {
        if (this.entities_d.length > 0) {
            const entityId = [...this.entities_d[this.entities_d.length - 1]];
            this.entities_d.splice(-1);
            return entityId;
        }
        const entityId = [this.entities.length, 0];
        this.entities.push(entityId);
        return [...entityId];
    }
    destroyEntity(id) {
        if (!this.isValidID(id))
            return;
        this.entities[id[0]] = [id[0], this.entities[id[0]][1] + 1];
        this.entities_d.push(this.entities[id[0]]);
    }
    addComponent(id, type, data) {
        if (!this.isValidID(id))
            return;
        return this.componentPool.add(id[0], type, data);
    }
    getComponent(id, type) {
        if (!this.isValidID(id))
            return;
        return this.componentPool.get(id[0], type);
    }
    removeComponent(id, type) {
        if (!this.isValidID(id))
            return;
        this.componentPool.remove(id[0], type);
    }
    hasComponent(id, type) {
        if (!this.isValidID(id))
            return false;
        return !!this.componentPool.get(id[0], type);
    }
    getView = (...types) => new ComponentView(this.componentPool, ...types);
    onUpdate(dt) {
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
    isValidID(id) {
        return this.entities[id[0]] && this.entities[id[0]][1] === id[1];
    }
}
export class ComponentView {
    pool;
    types;
    constructor(pool, ...types) {
        this.pool = pool;
        this.types = types;
    }
    *entities() {
        if (this.types.length === 0)
            return;
        const [firstType, ...rest] = this.types;
        const baseMap = this.pool.getType(firstType);
        for (const [entityId, firstData] of baseMap.entries()) {
            let valid = true;
            for (const type of rest) {
                if (!this.pool.get(entityId, type)) {
                    valid = false;
                    break;
                }
            }
            if (!valid)
                continue;
            // Build the full component tuple
            const components = this.types.map(type => this.pool.get(entityId, type));
            yield [entityId, ...components];
        }
    }
}
