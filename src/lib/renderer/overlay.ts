export enum OverlayLocation {
  TOP_LEFT,
  TOP_RIGHT,
  BOTTOM_LEFT,
  BOTTOM_RIGHT,
  CENTER
}
const BASE_ELEMENT_PARENT = "flex flex-col gap-2 w-fit bg-slate-500/40 shadow rounded-md p-4";

export default class Overlay {
  private static overlayElement: HTMLDivElement | null;
  private static tlElement: HTMLDivElement | null = null;
  private static trElement: HTMLDivElement | null = null;
  private static blElement: HTMLDivElement | null = null;
  private static brElement: HTMLDivElement | null = null;
  private static crElement: HTMLDivElement | null = null;
  private static children: Record<OverlayLocation, { id: string, element: HTMLSpanElement }[]>;

  static {
    Overlay.overlayElement = document.querySelector("#overlay");
    if (Overlay.overlayElement) {
      Overlay.tlElement = Overlay.overlayElement.querySelector("#top-left");
      Overlay.trElement = Overlay.overlayElement.querySelector("#top-right");
      Overlay.blElement = Overlay.overlayElement.querySelector("#bottom-left");
      Overlay.brElement = Overlay.overlayElement.querySelector("#bottom-right");
      Overlay.crElement = Overlay.overlayElement.querySelector("#center");
    }

    Overlay.children = { 0: [], 1: [], 2: [], 3: [], 4: [] };
    Overlay.checkElements();
  }

  static createElement(location: OverlayLocation): string {
    const id = crypto.randomUUID();
    const element = document.createElement("span");
    Overlay.children[location].push({ id, element });

    switch (location) {
      case OverlayLocation.TOP_LEFT:
        Overlay.tlElement?.appendChild(element);
        break;
      case OverlayLocation.TOP_RIGHT:
        Overlay.trElement?.appendChild(element);
        break;
      case OverlayLocation.BOTTOM_LEFT:
        Overlay.blElement?.appendChild(element);
        break;
      case OverlayLocation.BOTTOM_RIGHT:
        Overlay.brElement?.appendChild(element);
        break;
      case OverlayLocation.CENTER:
        Overlay.crElement?.appendChild(element);
        break;
    }

    Overlay.checkElements();
    return id;
  }

  static writeText(id: string, text: string) {
    for (const [loc, children] of Object.entries(Overlay.children)) {
      for (const child of children) {
        if (child.id === id) {
          child.element.innerText = text;
          return;
        }
      }
    }
  }

  private static checkElements() {
    if (Overlay.tlElement) {
      if (Overlay.children[OverlayLocation.TOP_LEFT].length > 0)
        Overlay.tlElement.className = `absolute top-3 left-3 ${BASE_ELEMENT_PARENT}`;
      else Overlay.tlElement.className = "hidden";
    }
    if (Overlay.trElement) {
      if (Overlay.children[OverlayLocation.TOP_RIGHT].length > 0)
        Overlay.trElement.className = `absolute top-3 right-3 ${BASE_ELEMENT_PARENT}`;
      else Overlay.trElement.className = "hidden";
    }
    if (Overlay.blElement) {
      if (Overlay.children[OverlayLocation.BOTTOM_LEFT].length > 0)
        Overlay.blElement.className = `absolute bottom-3 left-3 ${BASE_ELEMENT_PARENT}`;
      else Overlay.blElement.className = "hidden";
    }
    if (Overlay.brElement) {
      if (Overlay.children[OverlayLocation.BOTTOM_RIGHT].length > 0)
        Overlay.brElement.className = `absolute bottom-3 right-3 ${BASE_ELEMENT_PARENT}`;
      else Overlay.brElement.className = "hidden";
    }
    if (Overlay.crElement) {
      if (Overlay.children[OverlayLocation.CENTER].length > 0)
        Overlay.crElement.className = `absolute top-1/2 left-1/2 ${BASE_ELEMENT_PARENT}`;
      else Overlay.crElement.className = "hidden";
    }
  }
}