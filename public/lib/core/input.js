export default class Input {
    static keys = new Map();
    static {
        document.addEventListener('keydown', this.onKeyDown);
        document.addEventListener('keyup', this.onKeyUp);
    }
    static isKeyDown = (key) => Input.keys.get(key);
    static isKeyUp = (key) => !Input.keys.get(key);
    static onKeyDown(ev) {
        Input.keys.set(keyToKeysMap[ev.key], true);
    }
    static onKeyUp(ev) {
        Input.keys.set(keyToKeysMap[ev.key], false);
    }
}
export var Keys;
(function (Keys) {
    // Arrow keys
    Keys[Keys["UP"] = 38] = "UP";
    Keys[Keys["DOWN"] = 40] = "DOWN";
    Keys[Keys["LEFT"] = 37] = "LEFT";
    Keys[Keys["RIGHT"] = 39] = "RIGHT";
    // Alphabet keys
    Keys[Keys["A"] = 65] = "A";
    Keys[Keys["B"] = 66] = "B";
    Keys[Keys["C"] = 67] = "C";
    Keys[Keys["D"] = 68] = "D";
    Keys[Keys["E"] = 69] = "E";
    Keys[Keys["F"] = 70] = "F";
    Keys[Keys["G"] = 71] = "G";
    Keys[Keys["H"] = 72] = "H";
    Keys[Keys["I"] = 73] = "I";
    Keys[Keys["J"] = 74] = "J";
    Keys[Keys["K"] = 75] = "K";
    Keys[Keys["L"] = 76] = "L";
    Keys[Keys["M"] = 77] = "M";
    Keys[Keys["N"] = 78] = "N";
    Keys[Keys["O"] = 79] = "O";
    Keys[Keys["P"] = 80] = "P";
    Keys[Keys["Q"] = 81] = "Q";
    Keys[Keys["R"] = 82] = "R";
    Keys[Keys["S"] = 83] = "S";
    Keys[Keys["T"] = 84] = "T";
    Keys[Keys["U"] = 85] = "U";
    Keys[Keys["V"] = 86] = "V";
    Keys[Keys["W"] = 87] = "W";
    Keys[Keys["X"] = 88] = "X";
    Keys[Keys["Y"] = 89] = "Y";
    Keys[Keys["Z"] = 90] = "Z";
    // Number keys
    Keys[Keys["ZERO"] = 48] = "ZERO";
    Keys[Keys["ONE"] = 49] = "ONE";
    Keys[Keys["TWO"] = 50] = "TWO";
    Keys[Keys["THREE"] = 51] = "THREE";
    Keys[Keys["FOUR"] = 52] = "FOUR";
    Keys[Keys["FIVE"] = 53] = "FIVE";
    Keys[Keys["SIX"] = 54] = "SIX";
    Keys[Keys["SEVEN"] = 55] = "SEVEN";
    Keys[Keys["EIGHT"] = 56] = "EIGHT";
    Keys[Keys["NINE"] = 57] = "NINE";
    // Function keys
    Keys[Keys["F1"] = 112] = "F1";
    Keys[Keys["F2"] = 113] = "F2";
    Keys[Keys["F3"] = 114] = "F3";
    Keys[Keys["F4"] = 115] = "F4";
    Keys[Keys["F5"] = 116] = "F5";
    Keys[Keys["F6"] = 117] = "F6";
    Keys[Keys["F7"] = 118] = "F7";
    Keys[Keys["F8"] = 119] = "F8";
    Keys[Keys["F9"] = 120] = "F9";
    Keys[Keys["F10"] = 121] = "F10";
    Keys[Keys["F11"] = 122] = "F11";
    Keys[Keys["F12"] = 123] = "F12";
    // Special keys
    Keys[Keys["SPACE"] = 32] = "SPACE";
    Keys[Keys["ENTER"] = 13] = "ENTER";
    Keys[Keys["SHIFT"] = 16] = "SHIFT";
    Keys[Keys["CTRL"] = 17] = "CTRL";
    Keys[Keys["ALT"] = 18] = "ALT";
    Keys[Keys["ESC"] = 27] = "ESC";
    Keys[Keys["TAB"] = 9] = "TAB";
    Keys[Keys["BACKSPACE"] = 8] = "BACKSPACE";
    Keys[Keys["DELETE"] = 46] = "DELETE";
    Keys[Keys["HOME"] = 36] = "HOME";
    Keys[Keys["END"] = 35] = "END";
    Keys[Keys["PAGE_UP"] = 33] = "PAGE_UP";
    Keys[Keys["PAGE_DOWN"] = 34] = "PAGE_DOWN";
})(Keys || (Keys = {}));
// Map JavaScript KeyboardEvent key codes to our Keys enum
const keyToKeysMap = {
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
