export default class Entity {
    id;
    position = [0, 0, 0];
    rotation = [0, 0, 0];
    scale = [1, 1];
    components = {};
    constructor() {
        this.id = crypto.randomUUID();
    }
    hasComponent(name) {
        return !!this.components[name];
    }
    getComponent(name) {
        return this.components[name];
    }
    addComponent(component) {
        this.components[component.name] = component;
    }
    removeComponent(name) {
        if (this.components[name]) {
            delete this.components[name];
        }
    }
    getComponents = () => this.components;
}
