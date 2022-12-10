import { Data } from "./data";
import { IFontData } from "./type";

const COMPENSTATE_LEN = 4;

export class Cursor {
    private _container: HTMLDivElement;
    private _cursor: HTMLDivElement | null;

    private _data: Data;

    // 坐标位置
    private _height: number;
    private _top: number;
    private _left: number;

    // 原数据索引位置 -1 为最前面 之后值为数据索引值 及光标在该索引数据后面
    private _dataPosition: number;
    constructor(container: HTMLDivElement, data: Data) {
        this._container = container;
        this._cursor = null;

        this._data = data;

        const config = this._data.getConfg();

        this._height = config.lineHeight + COMPENSTATE_LEN;
        this._top = config.pageMargin - COMPENSTATE_LEN / 2 + 1;
        this._left = config.pageMargin - config.wordSpace / 2 - 0.5; // 0.5为光标宽度补偿值

        this._dataPosition = -1;

        this._createCursor();
        this.updateCursor();
    }

    private _createCursor() {
        const cursor = document.createElement("div");
        cursor.style.width = "1px";
        cursor.style.position = "absolute";
        cursor.style.background = "black";
        cursor.style.display = "none";
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

    setCursorPosition(x: number, y: number) {
        // 先计算属于哪一行
        // this._top = y;

        // 计算在某行的位置
        const lineData = this._data.getContent();
        const { left, lineX } = this._getLineCursorPosition(lineData, x);
        this._left = left;

        this.setDataPosition(lineX)
    }

    setCursorPositionByData() {
        this._left = this._getLineCursorPositionByData();
    }

    private _getLineCursorPositionByData() {
        const config = this._data.getConfg();
        const lineData = this._data.getContent();
        let left = config.pageMargin - config.wordSpace / 2 - 0.5;
        lineData.forEach((data, index) => {
            if (this._dataPosition < index) {
                return;
            } else {
                left = left + data.width + config.wordSpace;
            }
        });
        return left;
    }

    private _getLineCursorPosition(lineData: IFontData[], x: number) {
        const config = this._data.getConfg();
        let left = config.pageMargin - config.wordSpace / 2 - 0.5;
        let lineX = -1;
        lineData.forEach(data => {
            if (x < left + data.width / 2) {
                return;
            } else {
                lineX++;
                left = left + data.width + config.wordSpace;
            }
        });
        return { left, lineX };
    }

    setCursorHeight(fontHeight: number) {
        this._height = fontHeight;
    }

    setDataPosition(position: number) {
        console.log(position);
        this._dataPosition = position;
    }

    getDataPosition() {
        return this._dataPosition;
    }
}