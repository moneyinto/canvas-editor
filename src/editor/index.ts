import { Cursor } from "./Cursor";
import { Data } from "./Data";
import { KEY_BOARD } from "./keyboard";
import Listener from "./Listener";
import { Textarea } from "./Textarea";
import { ICurrentFontConfig, IFontData, IMouseClick } from "./type";
import { isChinese } from "./util";

export class Editor {
    public listener: Listener;

    private _container: HTMLDivElement;
    private _canvas: HTMLCanvasElement;
    private _ctx: CanvasRenderingContext2D;
    private _textarea: HTMLTextAreaElement;

    private _data: Data;
    private _cursor: Cursor;
    // [开始字坐标，开始行坐标，结束字坐标，结束行坐标]
    private _selectArea: [number, number, number, number] | null;

    private _click: IMouseClick | null;
    constructor(container: HTMLDivElement, data: Data) {
        this.listener = new Listener();
        this._container = container;

        this._selectArea = null;

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

    get config() {
        return this._data.getConfg();
    }

    get isSelectContent() {
        return this._selectArea && (this._selectArea[0] !== this._selectArea[2] || this._selectArea[1] !== this._selectArea[3]);
    }

    private _forSelectTexts(callback: (text: IFontData) => void) {
        if (this._selectArea) {
            const renderContent = this._data.getRenderContent();
            const [ startX, startY, endX, endY ] = this._selectArea;
            renderContent.forEach((lineData, line) => {
                if (line >= startY && line <= endY) {
                    lineData.texts.forEach((text, index) => {
                        if (startX <= index && index < endX) {
                            callback && callback(text);
                        }
                    });
                }
            });
            this._renderRichText();
        }
    }

    public setFontSize(type: "large" | "small") {
        this._forSelectTexts((text) => {
            if (type === "large") {
                text.fontSize += 2;
            } else {
                text.fontSize -= 2;
            }
            const { width, height } = this._getFontSize(text);
            text.width = width;
            text.height = height;
        });
    }

    public setFontBold(bold: boolean) {
        this._forSelectTexts((text) => {
            text.fontWeight = bold ? "bold" : "normal";
            const { width, height } = this._getFontSize(text);
            text.width = width;
            text.height = height;
        });
    }

    private _createCanvas() {
        const width = this._container.clientWidth;
        const height = this._container.clientHeight;
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

    private _resize() {
        const width = this._container.clientWidth;
        const height = this._container.clientHeight;
        this._canvas.width = width;
        this._canvas.height = height;
    }

    private _unbindEvents() {}

    private _bindEvents() {
        window.addEventListener("resize", this._resize.bind(this));

        this._canvas.addEventListener("mousedown", this._onMouseDown.bind(this));
        this._canvas.addEventListener("mousemove", this._onMouseMove.bind(this));
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

    private _onMouseDown(e: MouseEvent) {
        const renderContent = this._data.getRenderContent();
        const { textX, textY } = this._cursor.getCursorPosition(e.offsetX, e.offsetY, renderContent);

        this._click = {
            x: e.offsetX,
            y: e.offsetY,
            textX: textX + 1,
            textY
        };

        this._cursor.hideCursor();
        this._selectArea = null;
        this._renderRichText();
    }

    private _onMouseMove(e: MouseEvent) {
        e.preventDefault();
        if (this._click) {
            const renderContent = this._data.getRenderContent();
            const { textX, textY } = this._cursor.getCursorPosition(e.offsetX, e.offsetY, renderContent);
            let startX = this._click.textX;
            let startY = this._click.textY;
            let endX = textX+ 1;
            let endY = textY;
            if (endY < startY) {
                endX = this._click.textX;
                endY = this._click.textY;
                startX = textX + 1;
                startY = textY;
            } else if (endY === startY && startX > endX) {
                endX = this._click.textX;
                startX = textX + 1;
            }

            this._selectArea = [startX, startY, endX, endY];

            this._renderRichText();
        }
    }

    private _onMouseUp(e: MouseEvent) {
        e.preventDefault();
        if (this.isSelectContent) {
            // 选中元素
            this._dealCurrentSelectStyle();
        } else {
            // 未选中
            this._focus(e.offsetX, e.offsetY);
            this._selectArea = null;
        }
        this._click = null;
    }

    private _dealCurrentSelectStyle() {
        const fontConfig = this.config;
        const currentFontConfig: ICurrentFontConfig = {
            bold: true,
            fontSize: fontConfig.fontSize,
            fontColor: fontConfig.fontColor,
            fontFamily: fontConfig.fontFamily,
            fontStyle: fontConfig.fontStyle
        };

        // 此处处理获取选中文本公共样式部分
        this._forSelectTexts((text) => {
            if (text.fontWeight === "normal") {
                // 存在一个不是加粗的，当前样式展示就是不加粗的
                currentFontConfig.bold = false;
            }

            if (currentFontConfig.fontSize && text.fontSize !== currentFontConfig.fontSize) {
                delete currentFontConfig.fontSize;
            }

            if (currentFontConfig.fontColor && text.fontColor !== currentFontConfig.fontColor) {
                delete currentFontConfig.fontColor;
            }

            if (currentFontConfig.fontFamily && text.fontFamily !== currentFontConfig.fontFamily) {
                delete currentFontConfig.fontFamily;
            }

            if (currentFontConfig.fontStyle && text.fontStyle !== currentFontConfig.fontStyle) {
                delete currentFontConfig.fontStyle;
            }
        });

        this.listener.onSelectChange && this.listener.onSelectChange(currentFontConfig);
    }

    private _focus(x: number, y: number) {
        // 暂时默认到最后
        this._cursor.setCursorPosition(x, y);
        this._cursor.updateCursor();
        this._cursor.showCursor();
        setTimeout(() => {
            this._textarea.focus();
        }, 100);
    }

    private _blur(e: Event) {
        e.preventDefault();
        this._textarea.blur();
        this._cursor.hideCursor();
    }

    private _onInput(e: InputEvent) {
        if (e.inputType === "insertText" && e.data) {
            // 非输入中文
            console.log("== 文字", e.data);
            this._inputText(e.data);
        }
    }

    private _onCompStart(e: CompositionEvent) {
        console.log("=== 开始输入中文", e);
    }

    private _onCompEnd(e: CompositionEvent) {
        console.log("=== 结束输入中文", e.data);
        if (e.data) {
            const valueArr = e.data.split("");
            valueArr.forEach((value) => {
                this._inputText(value);
            });
        }
    }

    private _onKeydown(e: KeyboardEvent) {
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
                        if (downLeft <= currentLeft) {
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
                const config = this._data.getConfg();
                const text: IFontData = {
                    value: "\n",
                    fontSize: config.fontSize,
                    fontFamily: config.fontFamily,
                    fontWeight: config.fontWeight,
                    fontColor: config.fontColor,
                    fontStyle: config.fontStyle,
                    width: 0,
                    height: 0,
                    isChinese: false
                };
                const currentDataPosition = this._cursor.getDataPosition();
                this._data.addContent(text, currentDataPosition + 1);

                this._cursor.setDataPosition(currentDataPosition + 1);
                this._cursor.setCursorPositionByData();
                this._cursor.updateCursor();

                this._renderRichText();
                break;
            }
            case KEY_BOARD.BACKSPACE: {
                this._deleteText();
                break;
            }
        }
    }

    private _deleteText(direction: 0 | 1 = 0) {
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

    private _inputText(value: string) {
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

    private _getFontSize(text: IFontData) {
        this._ctx.font = `${text.fontStyle} ${text.fontWeight} ${text.fontSize}px ${text.fontFamily}`;
        const metrics = this._ctx.measureText(text.value);
        console.log(metrics);
        const width = metrics.width;
        const height = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
        return { width, height };
    }

    private _clear() {
        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
    }

    private _renderRange({ x, y, width, height }: any) {
        this._ctx.save();
        this._ctx.globalAlpha = 0.6;
        this._ctx.fillStyle = "#AECBFA";
        this._ctx.fillRect(x, y, width, height);
        this._ctx.restore();
    }

    private _renderRichText() {
        this._clear();
        const lineTexts = this._data.getRenderContent();
        const config = this._data.getConfg();
        let x = config.pageMargin;
        let y = config.pageMargin;

        lineTexts.forEach((lineData, index) => {
            if (this._selectArea) {
                const rangeRecord = this._data.getRenderSelect(x, y, lineData, index, this._selectArea);
                if (rangeRecord) this._renderRange(rangeRecord);
            }

            lineData.texts.forEach(text => {
                // 排除换行情况
                if (text.value !== "\n") {
                    this._fillText(text, x, y, lineData.height);
                    x = x + text.width + config.wordSpace;
                }
            });
            x = config.pageMargin;
            y = y + lineData.height * config.lineHeight;
        });
    }

    private _fillText(text: IFontData, x: number, y: number, maxHeight: number) {
        this._ctx.textBaseline = "top";
        const config = this._data.getConfg();
        this._ctx.font = `${text.fontStyle} ${text.fontWeight} ${text.fontSize}px ${text.fontFamily}`;
        const offsetY = (maxHeight * config.lineHeight - text.fontSize) / 2;
        this._ctx.fillText(text.value, x, y + offsetY, text.fontSize);
    }
}
