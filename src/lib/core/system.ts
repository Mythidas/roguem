export default class System {
  onUpdate?(dt: number): void;
  onFixedUpdate?(dt: number): void;
  onRender?(): void;
}