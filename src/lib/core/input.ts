export default class Input {
  private static keys: Map<Keys, boolean> = new Map<Keys, boolean>();

  static {
    document.addEventListener('keydown', this.onKeyDown);
    document.addEventListener('keyup', this.onKeyUp);
  }

  static isKeyDown = (key: Keys) => Input.keys.get(key);
  static isKeyUp = (key: Keys) => !Input.keys.get(key);

  private static onKeyDown(ev: KeyboardEvent) {
    Input.keys.set(keyToKeysMap[ev.key]!, true);
  }

  private static onKeyUp(ev: KeyboardEvent) {
    Input.keys.set(keyToKeysMap[ev.key]!, false);
  }
}

export enum Keys {
  // Arrow keys
  UP = 38,
  DOWN = 40,
  LEFT = 37,
  RIGHT = 39,

  // Alphabet keys
  A = 65, B = 66, C = 67, D = 68, E = 69,
  F = 70, G = 71, H = 72, I = 73, J = 74,
  K = 75, L = 76, M = 77, N = 78, O = 79,
  P = 80, Q = 81, R = 82, S = 83, T = 84,
  U = 85, V = 86, W = 87, X = 88, Y = 89,
  Z = 90,

  // Number keys
  ZERO = 48, ONE = 49, TWO = 50, THREE = 51, FOUR = 52,
  FIVE = 53, SIX = 54, SEVEN = 55, EIGHT = 56, NINE = 57,

  // Function keys
  F1 = 112, F2 = 113, F3 = 114, F4 = 115, F5 = 116,
  F6 = 117, F7 = 118, F8 = 119, F9 = 120, F10 = 121,
  F11 = 122, F12 = 123,

  // Special keys
  SPACE = 32,
  ENTER = 13,
  SHIFT = 16,
  CTRL = 17,
  ALT = 18,
  ESC = 27,
  TAB = 9,
  BACKSPACE = 8,
  DELETE = 46,
  HOME = 36,
  END = 35,
  PAGE_UP = 33,
  PAGE_DOWN = 34
}

// Map JavaScript KeyboardEvent key codes to our Keys enum
const keyToKeysMap: Record<string, Keys> = {
  'ArrowUp': Keys.UP,
  'ArrowDown': Keys.DOWN,
  'ArrowLeft': Keys.LEFT,
  'ArrowRight': Keys.RIGHT,
  'a': Keys.A, 'A': Keys.A,
  'b': Keys.B, 'B': Keys.B,
  'c': Keys.C, 'C': Keys.C,
  'd': Keys.D, 'D': Keys.D,
  'e': Keys.E, 'E': Keys.E,
  'f': Keys.F, 'F': Keys.F,
  'g': Keys.G, 'G': Keys.G,
  'h': Keys.H, 'H': Keys.H,
  'i': Keys.I, 'I': Keys.I,
  'j': Keys.J, 'J': Keys.J,
  'k': Keys.K, 'K': Keys.K,
  'l': Keys.L, 'L': Keys.L,
  'm': Keys.M, 'M': Keys.M,
  'n': Keys.N, 'N': Keys.N,
  'o': Keys.O, 'O': Keys.O,
  'p': Keys.P, 'P': Keys.P,
  'q': Keys.Q, 'Q': Keys.Q,
  'r': Keys.R, 'R': Keys.R,
  's': Keys.S, 'S': Keys.S,
  't': Keys.T, 'T': Keys.T,
  'u': Keys.U, 'U': Keys.U,
  'v': Keys.V, 'V': Keys.V,
  'w': Keys.W, 'W': Keys.W,
  'x': Keys.X, 'X': Keys.X,
  'y': Keys.Y, 'Y': Keys.Y,
  'z': Keys.Z, 'Z': Keys.Z,
  '0': Keys.ZERO, '1': Keys.ONE, '2': Keys.TWO, '3': Keys.THREE, '4': Keys.FOUR,
  '5': Keys.FIVE, '6': Keys.SIX, '7': Keys.SEVEN, '8': Keys.EIGHT, '9': Keys.NINE,
  'F1': Keys.F1, 'F2': Keys.F2, 'F3': Keys.F3, 'F4': Keys.F4, 'F5': Keys.F5,
  'F6': Keys.F6, 'F7': Keys.F7, 'F8': Keys.F8, 'F9': Keys.F9, 'F10': Keys.F10,
  'F11': Keys.F11, 'F12': Keys.F12,
  ' ': Keys.SPACE, 'Space': Keys.SPACE,
  'Enter': Keys.ENTER,
  'Shift': Keys.SHIFT,
  'Control': Keys.CTRL,
  'Alt': Keys.ALT,
  'Escape': Keys.ESC,
  'Tab': Keys.TAB,
  'Backspace': Keys.BACKSPACE,
  'Delete': Keys.DELETE,
  'Home': Keys.HOME,
  'End': Keys.END,
  'PageUp': Keys.PAGE_UP,
  'PageDown': Keys.PAGE_DOWN
};