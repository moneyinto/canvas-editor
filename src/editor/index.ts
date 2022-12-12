import { Cursor } from "./Cursor";
import { Data } from "./Data";
import { KEY_BOARD } from "./keyboard";
import { Textarea } from "./Textarea";
import { IFontData, IMouseClick } from "./type";
import { isChinese } from "./util";

export class Editor {
    private _container: HTMLDivElement;
    private _canvas: HTMLCanvasElement;
    private _ctx: CanvasRenderingContext2D;
    private _textarea: HTMLTextAreaElement;

    private _data: Data;
    private _cursor: Cursor;

    private _click: IMouseClick | null;
    constructor(container: HTMLDivElement, data: Data) {
        this._container = container;

        this._click = null;

        const { canvas, ctx } = this._createCanvas();
        this._canvas = canvas;
        this._ctx = ctx;

        this._data = data;
        this._data.setPageWidth(this._canvas.width);

        const textarea = new Textarea(this._container);
        this._textarea = textarea.getTextareaElement();

        this._cursor = new Cursor(this._container, this._data);

        this._bindEvents();

        this._renderRichText();
    }

    _createCanvas() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const canvas = document.createElement("canvas");
        canvas.style.background = "#fff";
        const dpr = window.devicePixelRatio;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        const ctx = canvas.getContext("2d")!;
        ctx.scale(dpr, dpr);
        this._container.append(canvas);

        return { canvas, ctx };
    }

    _resize() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        this._canvas.width = width;
        this._canvas.height = height;
    }

    _unbindEvents() {}

    _bindEvents() {
        window.addEventListener("resize", this._resize.bind(this));

        this._canvas.addEventListener("mousedown", this._onMouseDown.bind(this));
        this._canvas.addEventListener("mouseup", this._onMouseUp.bind(this));

        this._textarea.addEventListener("change", (input) => {
            console.log("==== change", input);
        });

        this._textarea.addEventListener("focus", (input) => {
            console.log("==== focus", input);
        });

        this._textarea.addEventListener("input", e => this._onInput(e as InputEvent));
        this._textarea.addEventListener("compositionstart", e => this._onCompStart(e as CompositionEvent));
        this._textarea.addEventListener("compositionend", e => this._onCompEnd(e as CompositionEvent));
        this._textarea.addEventListener("keydown", e => this._onKeydown(e as KeyboardEvent));
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
        this._textarea.focus();
        // 暂时默认到最后
        this._cursor.setCursorPosition(x, y);
        this._cursor.updateCursor();
        this._cursor.showCursor();
    }

    _blur() {
        this._textarea.blur();
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
                const position = this._cursor.getDataPosition();
                this._cursor.setDataPosition(position - 1);
                this._cursor.setCursorPositionByData();
                this._cursor.updateCursor();
                break;
            }
            case KEY_BOARD.RIGHT: {
                const position = this._cursor.getDataPosition();
                this._cursor.setDataPosition(position + 1);
                this._cursor.setCursorPositionByData();
                this._cursor.updateCursor();
                break;
            }
            case KEY_BOARD.TOP: {
                const position = this._cursor.getDataPosition();
                const renderPosition = this._cursor.getRenderDataPosition();
                if (renderPosition[0] > 0) {
                    const renderContent = this._data.getStashRenderContent();

                    const currentLineData = renderContent[renderPosition[0]].texts;
                    let currentLeft = 0;
                    for (const [index, data] of currentLineData.entries()) {
                        if (index < renderPosition[1]) {
                            currentLeft += data.width;
                        }
                    }

                    const upLineData = renderContent[renderPosition[0] - 1].texts;
                    let upLineX = -1;
                    let upLeft = 0;
                    for (const data of upLineData) {
                        if (upLeft < currentLeft) {
                            upLineX++;
                            upLeft += data.width
                        } else {
                            break;
                        }
                    }

                    this._cursor.setDataPosition(position - (renderPosition[1] + upLineData.length - 1 - upLineX));
                    this._cursor.setCursorPositionByData();
                    this._cursor.updateCursor();
                }
                break;
            }
            case KEY_BOARD.BOTTOM: {
                const position = this._cursor.getDataPosition();
                const renderPosition = this._cursor.getRenderDataPosition();
                const renderContent = this._data.getStashRenderContent();
                if (renderPosition[0] < renderContent.length - 1) {
                    const currentLineData = renderContent[renderPosition[0]].texts;
                    let currentLeft = 0;
                    for (const [index, data] of currentLineData.entries()) {
                        if (index < renderPosition[1]) {
                            currentLeft += data.width;
                        }
                    }

                    const downLineData = renderContent[renderPosition[0] + 1].texts;
                    let downLineX = -1;
                    let downLeft = 0;
                    for (const data of downLineData) {
                        if (downLeft < currentLeft) {
                            downLineX++;
                            downLeft += data.width
                        } else {
                            break;
                        }
                    }

                    this._cursor.setDataPosition(position + (currentLineData.length - renderPosition[1] + downLineX));
                    this._cursor.setCursorPositionByData();
                    this._cursor.updateCursor();
                }
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
        // 当存在中英文混合时 删除正好某行空一个英文字符的空格，删除后正好有个英文字符将会填充到上一行，光标应该处理该行倒数第二个字符
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
        text.width = width;
        text.height = height;

        const currentDataPosition = this._cursor.getDataPosition();

        this._data.addContent(text, currentDataPosition + 1);

        this._cursor.setDataPosition(currentDataPosition + 1);
        this._cursor.setCursorPositionByData();
        this._cursor.updateCursor();

        // ！！！！考虑当光标在最后位置的时候可以不清空canvas直接在对应的位置赋值渲染文本
        this._renderRichText();

        // 清除textarea中的值
        this._textarea.value = "";
    }

    _getFontSize(text: IFontData) {
        this._ctx.font = `${text.fontStyle} ${text.fontWeight} ${text.fontSize}px ${text.fontFamily}`;
        const metrics = this._ctx.measureText(text.value);
        console.log(metrics);
        const width = metrics.width;
        const height = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
        return { width, height };
    }

    _clear() {
        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
    }

    _renderRichText() {
        this._clear();
        const lineTexts = this._data.getRenderContent();
        const config = this._data.getConfg();
        let x = config.pageMargin;
        let y = config.pageMargin;

        lineTexts.forEach(lineData => {
            lineData.texts.forEach(text => {
                this._fillText(text, x, y);
                x = x + text.width + config.wordSpace;
            });
            x = config.pageMargin;
            y = y + lineData.height * config.lineHeight;
        });
    }

    _fillText(text: IFontData, x: number, y: number) {
        this._ctx.textBaseline = "top";
        const config = this._data.getConfg();
        this._ctx.font = `${text.fontStyle} ${text.fontWeight} ${text.fontSize}px ${text.fontFamily}`;
        const offsetY = (config.lineHeight - 1) * text.fontSize / 2;
        this._ctx.fillText(text.value, x, y + offsetY, text.fontSize);
    }
}
