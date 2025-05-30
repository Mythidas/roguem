export default interface Component {
  readonly name: string;
  onUpdate?(dt: number, entId: string): void;
  onRender?(dt: number, entId: string): void;
}