export class Textarea {
    private _textarea: HTMLTextAreaElement;
    private _container: HTMLDivElement;
    constructor(container: HTMLDivElement) {
        this._container = container;
        this._textarea = this._createTextarea();
    }

    private _createTextarea() {
        const textarea = document.createElement("textarea");
        textarea.style.position = "absolute";
        textarea.style.zIndex = "-100";
        textarea.style.right = "100px";
        // textarea.style.left = "-10000px";
        textarea.style.background = "transparent";
        textarea.style.border = "none";
        textarea.style.resize = "none";
        textarea.style.outline = "none";
        textarea.style.color = "transparent";
        this._container.append(textarea);
        return textarea;
    }

    getTextareaElement() {
        return this._textarea;
    }
}