export default class Component {
  onUpdate?(dt: number, entityId: [number, number]): void;
  onRender?(enitytId: [number, number]): void;
}