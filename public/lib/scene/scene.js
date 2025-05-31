import Entity from "./entity.js";
export default class Scene {
    name;
    entities = [];
    running = true;
    constructor(name) {
        this.name = name;
    }
    createEntity() {
        return this.entities[this.entities.push(new Entity()) - 1];
    }
    getEntity(id) {
        return this.entities.find((e) => e.id === id);
    }
    destroyEntity(id) {
        this.entities.filter((e) => e.id !== id);
    }
    onUpdate(dt) {
        if (!this.running)
            return;
        for (const ent of this.entities) {
            for (const [key, component] of Object.entries(ent.getComponents())) {
                if (component.onUpdate)
                    component.onUpdate(dt);
            }
        }
    }
    onRender() {
        for (const ent of this.entities) {
            for (const [key, component] of Object.entries(ent.getComponents())) {
                if (component.onRender)
                    component.onRender();
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
