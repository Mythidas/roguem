export default interface Component {
  readonly name: string;
  entityId: string;

  onUpdate?(dt: number): void;
  onRender?(): void;
}