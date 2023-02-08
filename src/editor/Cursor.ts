import { Data } from "./Data";
import { IFontData, ILineData } from "./type";

const COMPENSTATE_LEN = 4;

export class Cursor {
    private _container: HTMLDivElement;
    private _cursor: HTMLDivElement | null;

    private _data: Data;

    // 坐标位置
    private _height: number;
    private _top: number;
    private _left: number;

    // 渲染数据索引位置
    private _renderDataPosition: [number, number];

    // 原数据索引位置 -1 为最前面 之后值为数据索引值 及光标在该索引数据后面
    private _dataPosition: number;
    constructor(container: HTMLDivElement, data: Data) {
        this._container = container;
        this._cursor = null;

        this._data = data;

        const config = this._data.getConfg();

        this._height = config.lineHeight * config.fontSize + COMPENSTATE_LEN;
        this._top = config.pageMargin - COMPENSTATE_LEN / 2 + 1;
        this._left = config.pageMargin - config.wordSpace / 2 - 0.5; // 0.5为光标宽度补偿值

        this._dataPosition = -1;
        this._renderDataPosition = [-1, 0];

        this._createCursor();
        this.updateCursor();
    }

    private _createCursor() {
        const cursor = document.createElement("div");
        cursor.style.width = "1px";
        cursor.style.position = "absolute";
        cursor.style.background = "black";
        cursor.style.display = "none";
        cursor.style.userSelect = "none";
        cursor.classList.add("editor-cursor");

        this._cursor = cursor;
        this._container.append(cursor);
    }

    hideCursor() {
        this._cursor!.style.display = "none";
    }

    showCursor() {
        this._cursor!.style.display = "block";  
    }

    updateCursor() {
        if (!this._cursor) return;
        this._cursor.style.left = `${this._left}px`;
        this._cursor.style.top = `${this._top}px`;
        this._cursor.style.height = `${this._height}px`;
    }

    getCursorPosition(x: number, y: number, renderContent: ILineData[]) {
        // 先计算属于哪一行
        const { top, textY } = this._getTextYCursorPosition(renderContent, y);

        // 计算在某行的位置
        const lineData = renderContent[textY].texts;
        const { left, textX } = this._getTextXCursorPosition(lineData, x);

        return { left, textX, top, textY };
    }

    setCursorPosition(x: number, y: number) {
        const renderContent = this._data.getRenderContent();

        const { left, textX, top, textY } = this.getCursorPosition(x, y, renderContent);
        this._top = top;
        this._left = left;

        let allDataIndex = 0;
        renderContent.forEach((lineData, index) => {
            if (index < textY) allDataIndex += lineData.texts.length;
        });

        this.setDataPosition(allDataIndex + textX);
    }

    setCursorPositionByData() {
        const { top, left } = this._getLineCursorPositionByData();
        this._left = left;
        this._top = top;
    }

    private _getLineCursorPositionByData() {
        const config = this._data.getConfg();
        let top = config.pageMargin - COMPENSTATE_LEN / 2 + 1;
        let left = config.pageMargin - config.wordSpace / 2 - 0.5;
        const renderContent = this._data.getRenderContent();

        if (renderContent.length > 0) {
            for (const [lineY, line] of renderContent.entries()) {
                if (this._renderDataPosition[0] === lineY) {
                    break;
                } else {
                    top = top + line.height * config.lineHeight
                }
            }

            for (const [lineX, data] of renderContent[this._renderDataPosition[0]].texts.entries()) {
                if (this._renderDataPosition[1] < lineX) {
                    break;
                } else {
                    left = left + data.width + config.wordSpace;
                }
            }
        }

        return { top, left };
    }

    private _getTextYCursorPosition(renderContent: ILineData[], y: number) {
        const config = this._data.getConfg();
        let top = config.pageMargin - COMPENSTATE_LEN / 2 + 1;
        let textY = 0;
        const len = renderContent.length;
        for(const [index, line] of renderContent.entries()) {
            this.setCursorHeight(line.height);
            if (y < top + line.height * config.lineHeight) {
                break;
            } else {
                if (index + 1 < len) {
                    textY++;
                    top = top + line.height * config.lineHeight;
                }
            }
        }
        return { top, textY };
    }

    private _getTextXCursorPosition(lineData: IFontData[], x: number) {
        const config = this._data.getConfg();
        let left = config.pageMargin - config.wordSpace / 2 - 0.5;
        let textX = -1;
        for(const data of lineData) {
            if (x < left + data.width / 2) {
                break;
            } else {
                textX++;
                left = left + data.width + config.wordSpace;
            }
        }
        return { left, textX };
    }

    setCursorHeight(height: number) {
        const config = this._data.getConfg();
        this._height = height * config.lineHeight + COMPENSTATE_LEN;
    }

    setRenderDataPosition() {
        if (this._dataPosition === -1) {
            this._renderDataPosition = [0, -1];
        } else {
            const renderContent = this._data.getRenderContent();
            let x = 0;
            for (const [line, lineData] of renderContent.entries()) {
                console.log(this._dataPosition, x + lineData.texts.length);
                if (this._dataPosition < x + lineData.texts.length - 1) {
                    this._renderDataPosition = [line, this._dataPosition - x];
                    break;
                } else {
                    x = x + lineData.texts.length;
                }
            }
        }
    }

    getRenderDataPosition() {
        return this._renderDataPosition;
    }

    setDataPosition(position: number) {
        if (position < -1 || position >= this._data.getLength() - 1) return;
        this._dataPosition = position;

        this.setRenderDataPosition();
    }

    getDataPosition() {
        return this._dataPosition;
    }
}