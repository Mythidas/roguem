export var OverlayLocation;
(function (OverlayLocation) {
    OverlayLocation[OverlayLocation["TOP_LEFT"] = 0] = "TOP_LEFT";
    OverlayLocation[OverlayLocation["TOP_RIGHT"] = 1] = "TOP_RIGHT";
    OverlayLocation[OverlayLocation["BOTTOM_LEFT"] = 2] = "BOTTOM_LEFT";
    OverlayLocation[OverlayLocation["BOTTOM_RIGHT"] = 3] = "BOTTOM_RIGHT";
    OverlayLocation[OverlayLocation["CENTER"] = 4] = "CENTER";
})(OverlayLocation || (OverlayLocation = {}));
const BASE_ELEMENT_PARENT = "flex flex-col gap-2 w-fit bg-slate-500/40 shadow rounded-md p-4";
export default class Overlay {
    static overlayElement;
    static tlElement = null;
    static trElement = null;
    static blElement = null;
    static brElement = null;
    static crElement = null;
    static children;
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
    static createElement(location) {
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
    static writeText(id, text) {
        for (const [loc, children] of Object.entries(Overlay.children)) {
            for (const child of children) {
                if (child.id === id) {
                    child.element.innerText = text;
                    return;
                }
            }
        }
    }
    static checkElements() {
        if (Overlay.tlElement) {
            if (Overlay.children[OverlayLocation.TOP_LEFT].length > 0)
                Overlay.tlElement.className = `absolute top-3 left-3 ${BASE_ELEMENT_PARENT}`;
            else
                Overlay.tlElement.className = "hidden";
        }
        if (Overlay.trElement) {
            if (Overlay.children[OverlayLocation.TOP_RIGHT].length > 0)
                Overlay.trElement.className = `absolute top-3 right-3 ${BASE_ELEMENT_PARENT}`;
            else
                Overlay.trElement.className = "hidden";
        }
        if (Overlay.blElement) {
            if (Overlay.children[OverlayLocation.BOTTOM_LEFT].length > 0)
                Overlay.blElement.className = `absolute bottom-3 left-3 ${BASE_ELEMENT_PARENT}`;
            else
                Overlay.blElement.className = "hidden";
        }
        if (Overlay.brElement) {
            if (Overlay.children[OverlayLocation.BOTTOM_RIGHT].length > 0)
                Overlay.brElement.className = `absolute bottom-3 right-3 ${BASE_ELEMENT_PARENT}`;
            else
                Overlay.brElement.className = "hidden";
        }
        if (Overlay.crElement) {
            if (Overlay.children[OverlayLocation.CENTER].length > 0)
                Overlay.crElement.className = `absolute top-1/2 left-1/2 ${BASE_ELEMENT_PARENT}`;
            else
                Overlay.crElement.className = "hidden";
        }
    }
}
