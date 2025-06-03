import Engine from "../core/engine.js";
export default class Entity {
    id;
    scene;
    constructor(id) {
        this.id = id;
        this.scene = Engine.get().getScene();
    }
    static createEntity = () => new Entity(Engine.get()?.getScene().createEntity());
    static getEntity = (id) => new Entity(id);
    static destroyEntity = (id) => Engine.get()?.getScene().destroyEntity(id);
    addComponent = (t, d) => this.scene.addComponent(this.id, t, d);
    getComponent = (t) => this.scene.getComponent(this.id, t);
    removeComponent = (t) => this.scene.removeComponent(this.id, t);
    hasComponent = (type) => this.scene.hasComponent(this.id, type);
    destroy = () => this.scene.destroyEntity(this.id);
}
