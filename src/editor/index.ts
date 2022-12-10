import { Cursor } from "./cursor";
import { Data } from "./data";
import { KEY_BOARD } from "./keyboard";
import { IFontData, IMouseClick } from "./type";
import { isChinese } from "./util";

export class Editor {
    private _container: HTMLDivElement;
    private _canvas: HTMLCanvasElement | null;
    private _ctx: CanvasRenderingContext2D | null;
    private _textarea: HTMLTextAreaElement | null;

    private _data: Data;
    private _cursor: Cursor;

    private _click: IMouseClick | null;
    constructor(container: HTMLDivElement, data: Data) {
        this._container = container;
        this._ctx = null;
        this._canvas = null;
        this._textarea = null;

        this._data = data;

        this._click = null;

        this._createCanvas();
        this._createTextarea();

        this._cursor = new Cursor(this._container, this._data);

        this._bindEvents();

        this._renderRichText();
    }

    _createCanvas() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const canvas = document.createElement("canvas");
        const dpr = window.devicePixelRatio;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        this._canvas = canvas;
        this._ctx = canvas.getContext("2d");
        this._ctx?.scale(dpr, dpr);
        this._container.append(canvas);
    }

    _createTextarea() {
        const textarea = document.createElement("textarea");
        textarea.style.position = "absolute";
        textarea.style.zIndex = "-100";
        textarea.style.right = "100px";
        // textarea.style.left = "-10000px";
        // textarea.style.background = "transparent";
        // textarea.style.border = "none";
        // textarea.style.resize = "none";
        // textarea.style.outline = "none";
        // textarea.style.color = "transparent";
        this._textarea = textarea;
        this._container.append(textarea);
    }

    _resize() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        this._canvas!.width = width;
        this._canvas!.height = height;
    }

    _unbindEvents() {}

    _bindEvents() {
        window.addEventListener("resize", this._resize.bind(this));

        this._canvas?.addEventListener("mousedown", this._onMouseDown.bind(this));
        this._canvas?.addEventListener("mouseup", this._onMouseUp.bind(this));

        this._textarea?.addEventListener("change", (input) => {
            console.log("==== change", input);
        });

        this._textarea?.addEventListener("focus", (input) => {
            console.log("==== focus", input);
        });

        this._textarea?.addEventListener("input", e => this._onInput(e as InputEvent));
        this._textarea?.addEventListener("compositionstart", e => this._onCompStart(e as CompositionEvent));
        this._textarea?.addEventListener("compositionend", e => this._onCompEnd(e as CompositionEvent));
        this._textarea?.addEventListener("keydown", e => this._onKeydown(e as KeyboardEvent));
    }

    _onMouseDown(e: MouseEvent) {
        this._click = {
            x: e.clientX,
            y: e.clientY
        };
    }

    _onMouseUp(e: MouseEvent) {
        e.preventDefault();

        if (this._click) {
            this._focus(this._click.x, this._click.y);
        }

        this._click = null;
    }

    _focus(x: number, y: number) {
        this._textarea?.focus();
        // 暂时默认到最后
        this._cursor.setCursorPosition(x, y);
        this._cursor.updateCursor();
        this._cursor.showCursor();
    }

    _blur() {
        this._textarea?.blur();
        this._cursor.hideCursor();
    }

    _onInput(e: InputEvent) {
        if (e.inputType === "insertText" && e.data) {
            // 非输入中文
            console.log("== 文字", e.data);
            this._inputText(e.data);
        }
    }

    _onCompStart(e: CompositionEvent) {
        console.log("=== 开始输入中文", e);
    }

    _onCompEnd(e: CompositionEvent) {
        console.log("=== 结束输入中文", e.data);
        if (e.data) {
            const valueArr = e.data.split("");
            valueArr.forEach((value) => {
                this._inputText(value);
            });
        }
    }

    _onKeydown(e: KeyboardEvent) {
        console.log(e.key);
        switch(e.key) {
            case KEY_BOARD.LEFT: {
                break;
            }
            case KEY_BOARD.RIGHT: {
                break;
            }
            case KEY_BOARD.TOP: {
                break;
            }
            case KEY_BOARD.BOTTOM: {
                break;
            }
            case KEY_BOARD.ENTER: {
                break;
            }
            case KEY_BOARD.BACKSPACE: {
                this._deleteText();
                break;
            }
        }
    }

    _deleteText(direction: 0 | 1 = 0) {
        // direction 删除方向  0 向前删除 1 向后删除
        const position = this._cursor.getDataPosition();
        const result = this._data.deleteContent(position + direction);
        if (result) {
            if (direction === 0) {
                this._cursor.setDataPosition(this._cursor.getDataPosition() - 1);
                this._cursor.setCursorPositionByData();
                this._cursor.updateCursor();
            };
            this._renderRichText();
        }
    }

    _inputText(value: string) {
        const config = this._data.getConfg();
        const text: IFontData = {
            value,
            fontSize: config.fontSize,
            fontFamily: config.fontFamily,
            fontWeight: config.fontWeight,
            fontColor: config.fontColor,
            fontStyle: config.fontStyle,
            width: config.fontSize,
            height: config.fontSize,
            isChinese: isChinese(value)
        };
        
        const { width, height } = this._getFontSize(text);
        console.log(width, height);
        text.width = width;
        text.height = height;

        const currentDataPosition = this._cursor.getDataPosition();

        this._data.addContent(text, currentDataPosition + 1);

        this._cursor.setDataPosition(currentDataPosition + 1);
        this._cursor.setCursorPositionByData();
        this._cursor.updateCursor();

        // ！！！！直接重新渲染文本 后期可以考虑当光标在最后位置的时候可以不清空canvas直接在对应的位置赋值
        this._renderRichText();
        // this._renderText(text, config.x + , config.y)

        // 清除textarea中的值
        this._textarea!.value = "";
    }

    _getFontSize(text: IFontData) {
        this._ctx!.font = `${text.fontStyle} ${text.fontWeight} ${text.fontSize}px ${text.fontFamily}`;
        const metrics = this._ctx!.measureText(text.value);
        console.log(metrics);
        const width = metrics.width;
        const height = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
        return { width, height };
    }

    _clear() {
        this._ctx?.clearRect(0, 0, this._canvas!.width, this._canvas!.height);
    }

    _renderRichText() {
        this._clear();
        const texts = this._data.getContent();
        const config = this._data.getConfg();
        // ！！！后面考虑这里要注意计算换行 需要有个变量来进行记录用于计算
        let x = config.pageMargin;
        let y = config.pageMargin;
        texts.forEach((text) => {
            this._fillText(text, x, y);
            // const metrics = this._ctx!.measureText(text.value);
            // const width = metrics.width;
            // const height = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
            // console.log(width, height, text.width)
            // 计算下一个字符的开始位置
            x = x + text.width + config.wordSpace;
            // 换行了会计算y的值
            // y = y + 0;
        });
    }

    _fillText(text: IFontData, x: number, y: number) {
        this._ctx!.textBaseline = "top";
        const config = this._data.getConfg();
        this._ctx!.font = `${text.fontStyle} ${text.fontWeight} ${text.fontSize}px ${text.fontFamily}`;
        const offsetY = text.isChinese ? (config.lineHeight - text.height) / 2 : 0;
        this._ctx?.fillText(text.value, x, y + offsetY, text.fontSize);
    }
}
