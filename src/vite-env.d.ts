/// <reference types="vite/client" />

declare interface Window {
    setFontColor: (event: InputEvent) => void;
    setAddFontSize: () => void;
    setReduceFontSize: () => void;
    setFontBold: () => void;
    setFontItalic: () => void;
    setFontUnderLine: () => void;
    setFontStrikeout: () => void;
}
