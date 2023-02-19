import { IConfig, IFontData, ILineData } from "./type";
import { deepClone, isChinese, readClipboard } from "./util";

const initData: IFontData[] = [
    {
        value: "c",
        fontSize: 16,
        width: 8.751998901367188,
        height: 8.720000267028809,
        fontStyle: "normal",
        fontWeight: "normal",
        fontFamily: "楷体",
        fontColor: "#f60000",
        isChinese: false,
        underline: true
    },
    {
        value: "a",
        fontSize: 16,
        width: 8.943984985351562,
        height: 8.720000267028809,
        fontStyle: "normal",
        fontWeight: "normal",
        fontFamily: "楷体",
        fontColor: "#f60000",
        isChinese: false,
        underline: true
    },
    {
        value: "n",
        fontSize: 16,
        width: 8.943984985351562,
        height: 8.496000289916992,
        fontStyle: "normal",
        fontWeight: "normal",
        fontFamily: "楷体",
        fontColor: "#f60000",
        isChinese: false,
        underline: true
    },
    {
        value: "a",
        fontSize: 56,
        width: 31.303985595703125,
        height: 30.520000457763672,
        fontStyle: "normal",
        fontWeight: "normal",
        fontFamily: "楷体",
        fontColor: "#f60000",
        isChinese: false,
        underline: true
    },
    {
        value: "s",
        fontSize: 56,
        width: 28.279998779296875,
        height: 30.520000457763672,
        fontStyle: "normal",
        fontWeight: "normal",
        fontFamily: "楷体",
        fontColor: "#f60000",
        isChinese: false,
        underline: true
    },
    {
        value: "富",
        fontSize: 56,
        width: 56,
        height: 51.85600280761719,
        fontStyle: "normal",
        fontWeight: "normal",
        fontFamily: "楷体",
        fontColor: "#444",
        isChinese: true,
        underline: true
    },
    {
        value: "文",
        fontSize: 56,
        width: 56,
        height: 51.96800231933594,
        fontStyle: "normal",
        fontWeight: "normal",
        fontFamily: "楷体",
        fontColor: "#444",
        isChinese: true,
        underline: true
    },
    {
        value: "本",
        fontSize: 56,
        width: 56,
        height: 51.183998107910156,
        fontStyle: "normal",
        fontWeight: "normal",
        fontFamily: "楷体",
        fontColor: "#444",
        isChinese: true,
        underline: true
    },
    {
        value: "渲",
        fontSize: 56,
        width: 56,
        height: 51.407997131347656,
        fontStyle: "normal",
        fontWeight: "normal",
        fontFamily: "楷体",
        fontColor: "#444",
        isChinese: true,
        underline: true
    },
    {
        value: "染",
        fontSize: 56,
        width: 56,
        height: 51.183998107910156,
        fontStyle: "normal",
        fontWeight: "normal",
        fontFamily: "楷体",
        fontColor: "#444",
        isChinese: true,
        underline: true
    },
    {
        value: "c",
        fontSize: 56,
        width: 30.631988525390625,
        height: 30.520000457763672,
        fontStyle: "normal",
        fontWeight: "normal",
        fontFamily: "楷体",
        fontColor: "#f60000",
        isChinese: false,
        underline: true
    },
    {
        value: "a",
        fontSize: 56,
        width: 31.303985595703125,
        height: 30.520000457763672,
        fontStyle: "normal",
        fontWeight: "normal",
        fontFamily: "楷体",
        fontColor: "#f60000",
        isChinese: false,
        underline: true
    },
    {
        value: "n",
        fontSize: 56,
        width: 31.303985595703125,
        height: 29.736000061035156,
        fontStyle: "normal",
        fontWeight: "normal",
        fontFamily: "楷体",
        fontColor: "#f60000",
        isChinese: false,
        underline: true
    },
    {
        value: "a",
        fontSize: 56,
        width: 31.303985595703125,
        height: 30.520000457763672,
        fontStyle: "normal",
        fontWeight: "normal",
        fontFamily: "楷体",
        fontColor: "#f60000",
        isChinese: false,
        underline: true
    },
    {
        value: "s",
        fontSize: 56,
        width: 28.279998779296875,
        height: 30.520000457763672,
        fontStyle: "normal",
        fontWeight: "normal",
        fontFamily: "楷体",
        fontColor: "#f60000",
        isChinese: false,
        underline: true
    },
    {
        value: "富",
        fontSize: 62,
        width: 62,
        height: 57.41200256347656,
        fontStyle: "normal",
        fontWeight: "normal",
        fontFamily: "楷体",
        fontColor: "#444",
        isChinese: true,
        underline: true
    },
    {
        value: "文",
        fontSize: 62,
        width: 62,
        height: 57.53600311279297,
        fontStyle: "normal",
        fontWeight: "normal",
        fontFamily: "楷体",
        fontColor: "#444",
        isChinese: true,
        underline: true
    },
    {
        value: "本",
        fontSize: 16,
        width: 16,
        height: 15.37600040435791,
        fontStyle: "normal",
        fontWeight: "normal",
        fontFamily: "楷体",
        fontColor: "#444",
        isChinese: true,
        underline: true
    },
    {
        value: "渲",
        fontSize: 16,
        width: 16,
        height: 14.592000007629395,
        fontStyle: "normal",
        fontWeight: "normal",
        fontFamily: "楷体",
        fontColor: "#444",
        isChinese: true,
        underline: true
    },
    {
        value: "染",
        fontSize: 16,
        width: 16,
        height: 15.35999870300293,
        fontStyle: "normal",
        fontWeight: "normal",
        fontFamily: "楷体",
        fontColor: "#444",
        isChinese: true,
        underline: true
    },
    {
        value: "c",
        fontSize: 16,
        width: 8.751998901367188,
        height: 8.720000267028809,
        fontStyle: "normal",
        fontWeight: "normal",
        fontFamily: "楷体",
        fontColor: "#f60000",
        isChinese: false,
        underline: true
    },
    {
        value: "a",
        fontSize: 16,
        width: 8.943984985351562,
        height: 8.720000267028809,
        fontStyle: "normal",
        fontWeight: "normal",
        fontFamily: "楷体",
        fontColor: "#f60000",
        isChinese: false,
        underline: true
    },
    {
        value: "n",
        fontSize: 16,
        width: 8.943984985351562,
        height: 8.496000289916992,
        fontStyle: "normal",
        fontWeight: "normal",
        fontFamily: "楷体",
        fontColor: "#f60000",
        isChinese: false,
        underline: true
    },
    {
        value: "a",
        fontSize: 16,
        width: 8.943984985351562,
        height: 8.720000267028809,
        fontStyle: "normal",
        fontWeight: "normal",
        fontFamily: "楷体",
        fontColor: "#f60000",
        isChinese: false,
        underline: true
    },
    {
        value: "s",
        fontSize: 16,
        width: 8.079986572265625,
        height: 8.720000267028809,
        fontStyle: "normal",
        fontWeight: "normal",
        fontFamily: "楷体",
        fontColor: "#f60000",
        isChinese: false,
        underline: true
    },
    {
        value: "富",
        fontSize: 16,
        width: 16,
        height: 15.26400089263916,
        fontStyle: "normal",
        fontWeight: "normal",
        fontFamily: "楷体",
        fontColor: "#444",
        isChinese: true,
        underline: true
    },
    {
        value: "文",
        fontSize: 16,
        width: 16,
        height: 14.831999778747559,
        fontStyle: "normal",
        fontWeight: "normal",
        fontFamily: "楷体",
        fontColor: "#444",
        isChinese: true,
        underline: true
    },
    {
        value: "本",
        fontSize: 16,
        width: 16,
        height: 15.37600040435791,
        fontStyle: "normal",
        fontWeight: "normal",
        fontFamily: "楷体",
        fontColor: "#444",
        isChinese: true,
        underline: true
    },
    {
        value: "渲",
        fontSize: 16,
        width: 16,
        height: 14.592000007629395,
        fontStyle: "normal",
        fontWeight: "normal",
        fontFamily: "楷体",
        fontColor: "#444",
        isChinese: true,
        underline: true
    },
    {
        value: "染",
        fontSize: 16,
        width: 16,
        height: 15.35999870300293,
        fontStyle: "normal",
        fontWeight: "normal",
        fontFamily: "楷体",
        fontColor: "#444",
        isChinese: true,
        underline: true
    },
    {
        value: "\n",
        fontSize: 16,
        width: 0,
        height: 0,
        fontStyle: "normal",
        fontWeight: "normal",
        fontFamily: "楷体",
        fontColor: "#444",
        isChinese: false,
        underline: true
    },
    {
        value: "c",
        fontSize: 16,
        width: 8.751998901367188,
        height: 8.720000267028809,
        fontStyle: "normal",
        fontWeight: "normal",
        fontFamily: "楷体",
        fontColor: "#f60000",
        isChinese: false
    },
    {
        value: "a",
        fontSize: 16,
        width: 8.943984985351562,
        height: 8.720000267028809,
        fontStyle: "normal",
        fontWeight: "normal",
        fontFamily: "楷体",
        fontColor: "#f60000",
        isChinese: false
    },
    {
        value: "n",
        fontSize: 16,
        width: 8.943984985351562,
        height: 8.496000289916992,
        fontStyle: "normal",
        fontWeight: "normal",
        fontFamily: "楷体",
        fontColor: "#f60000",
        isChinese: false
    },
    {
        value: "a",
        fontSize: 16,
        width: 8.943984985351562,
        height: 8.720000267028809,
        fontStyle: "normal",
        fontWeight: "normal",
        fontFamily: "楷体",
        fontColor: "#f60000",
        isChinese: false
    },
    {
        value: "s",
        fontSize: 16,
        width: 8.079986572265625,
        height: 8.720000267028809,
        fontStyle: "normal",
        fontWeight: "normal",
        fontFamily: "楷体",
        fontColor: "#f60000",
        isChinese: false
    },
    {
        value: "富",
        fontSize: 16,
        width: 16,
        height: 15.26400089263916,
        fontStyle: "normal",
        fontWeight: "normal",
        fontFamily: "楷体",
        fontColor: "#444",
        isChinese: true
    },
    {
        value: "文",
        fontSize: 16,
        width: 16,
        height: 14.831999778747559,
        fontStyle: "normal",
        fontWeight: "normal",
        fontFamily: "楷体",
        fontColor: "#444",
        isChinese: true
    },
    {
        value: "本",
        fontSize: 16,
        width: 16,
        height: 15.37600040435791,
        fontStyle: "normal",
        fontWeight: "normal",
        fontFamily: "楷体",
        fontColor: "#444",
        isChinese: true
    },
    {
        value: "渲",
        fontSize: 16,
        width: 16,
        height: 14.592000007629395,
        fontStyle: "normal",
        fontWeight: "normal",
        fontFamily: "楷体",
        fontColor: "#444",
        isChinese: true,
        strikout: true
    },
    {
        value: "染",
        fontSize: 16,
        width: 16,
        height: 15.35999870300293,
        fontStyle: "normal",
        fontWeight: "normal",
        fontFamily: "楷体",
        fontColor: "#444",
        isChinese: true,
        strikout: true
    },
    {
        value: "\n",
        fontSize: 16,
        width: 0,
        height: 0,
        fontStyle: "normal",
        fontWeight: "normal",
        fontFamily: "楷体",
        fontColor: "#444",
        isChinese: false
    }
];

const baseConfig = {
    fontSize: 16,
    fontWeight: "normal",
    fontFamily: "楷体",
    fontColor: "#444",
    fontStyle: "normal",
    wordSpace: 1,
    lineHeight: 2,
    lineHeightLeave: 4,
    pageMargin: 10,
    pageWidth: 200,
    align: "left"
};

export class Data {
    private _content: IFontData[];
    private _renderContent: ILineData[];
    private _config: IConfig;
    private _copyContent: IFontData[];
    private _ctx: CanvasRenderingContext2D;
    constructor(ctx: CanvasRenderingContext2D) {
        this._ctx = ctx;
        this._content = initData;
        this._config = deepClone(baseConfig);

        this._renderContent = [];

        this._copyContent = [];
    }

    resetConfig() {
        this._config = deepClone(baseConfig);
    }

    updateConfig(props: Partial<IConfig>) {
        this._config = {
            ...this._config,
            ...props
        };
    }

    getContent() {
        return this._content;
    }

    getRenderContent() {
        const width = this._config.pageWidth - this._config.pageMargin * 2;
        const renderContent: ILineData[] = [];
        let lineData: ILineData = {
            height: 0,
            width: 0,
            texts: []
        };
        let countWidth = 0;
        this._content.forEach((text) => {
            if (lineData.height === 0) lineData.height = text.fontSize;
            if (text.value === "\n") {
                lineData.texts.push(text);
                renderContent.push(lineData);
                lineData = {
                    height: 0,
                    width: 0,
                    texts: []
                };
                countWidth = 0;
            } else if (countWidth + text.width < width) {
                // 一行数据可以摆得下
                lineData.texts.push(text);
                if (lineData.height < text.fontSize) lineData.height = text.fontSize;
                countWidth = countWidth + text.width + this._config.wordSpace;
                lineData.width = countWidth;
            } else {
                renderContent.push(lineData);
                lineData = {
                    height: 0,
                    width: 0,
                    texts: [text]
                };
                countWidth = text.width + this._config.wordSpace;
            }
        });

        // if (lineData.texts.length > 0) renderContent.push(lineData);

        this._renderContent = renderContent;
        return renderContent;
    }

    getRenderSelect(
        x: number,
        y: number,
        lineData: ILineData,
        index: number,
        selectArea: [number, number, number, number]
    ) {
        if (index >= selectArea[1] && index <= selectArea[3]) {
            let startX = 0;
            let endX = 0;
            if (selectArea[1] === selectArea[3]) {
                // 仅选中该行
                startX = selectArea[0];
                endX = selectArea[2];
            } else if (selectArea[1] === index) {
                // 选中的第一行
                startX = selectArea[0];
                endX = lineData.texts.length;
            } else if (index < selectArea[3]) {
                // 选中中间的行
                startX = 0;
                endX = lineData.texts.length;
            } else if (index === selectArea[3]) {
                // 选中的最后一行
                startX = 0;
                endX = selectArea[2];
            }

            if (startX === endX) return undefined;

            // 存在选中区域
            if (startX > 0) {
                x += lineData.texts
                    .slice(0, startX)
                    .map((text) => text.width)
                    .reduce((acr, cur) => {
                        return acr + cur + this._config.wordSpace;
                    });
            }

            const width = lineData.texts
                .slice(startX, endX)
                .map((text) => text.width)
                .reduce((acr, cur) => {
                    return acr + cur + this._config.wordSpace;
                });

            const offsetX = this.getAlignOffsetX(lineData);
            return {
                x: x + offsetX,
                y,
                width: width + this._config.wordSpace,
                height: lineData.height * this._config.lineHeight
            };
        }
        return undefined;
    }

    getAlignOffsetX(line: ILineData) {
        const align = this._config.align || "left";
        return {
            left: 0,
            center: (this._config.pageWidth - this._config.pageMargin * 2 - line.width) / 2,
            right: this._config.pageWidth - this._config.pageMargin * 2 - line.width
        }[align];
    }

    getStashRenderContent() {
        return this._renderContent;
    }

    setPageWidth(pageWidth: number) {
        this._config.pageWidth = pageWidth;
    }

    getLength() {
        return this._content.length;
    }

    getConfg() {
        return this._config;
    }

    addContent(text: IFontData, position: number) {
        this._content.splice(position, 0, text);
    }

    deleteContent(position: number) {
        if (position >= this._content.length || position === -1) return false;
        this._content.splice(position, 1);
        return true;
    }

    getSelectArea(selectArea: [number, number, number, number]) {
        const renderContent = this.getRenderContent();
        let startX = 0;
        let endX = 0;
        let startOk = false;
        let endOk = false;
        renderContent.forEach((lineData, index) => {
            if (selectArea[1] === index) {
                // 起始位置属于当前行
                startX += selectArea[0];
                startOk = true;
            } else if (!startOk) {
                startX += lineData.texts.length;
            }

            if (selectArea[3] === index) {
                // 结束位置属于当前行
                endX += selectArea[2];
                endOk = true;
            } else if (!endOk) {
                endX += lineData.texts.length;
            }
        });

        return {
            startX,
            endX
        };
    }

    getFontSize(text: IFontData) {
        this._ctx.font = `${text.fontStyle} ${text.fontWeight} ${text.fontSize}px ${text.fontFamily}`;
        const metrics = this._ctx.measureText(text.value);
        const width = metrics.width;
        const height = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
        return { width, height };
    }

    deleteSelectContent(selectArea: [number, number, number, number]) {
        const { startX, endX } = this.getSelectArea(selectArea);
        this._content.splice(startX, endX - startX);
        return startX;
    }

    copySelectContent(selectArea: [number, number, number, number]) {
        const { startX, endX } = this.getSelectArea(selectArea);
        this._copyContent = this._content.slice(startX, endX);
        return this._copyContent;
    }

    async pasteContent(selectArea: [number, number, number, number] | null, position: number) {
        if (this._copyContent.length ===  0) {
            const content = await readClipboard();
            if (content) {
                // 剪切板内容转换存入copyContent
                // 这里考虑是否带格式，先处理不带格式的
                const config = this.getConfg();
                const baseText: IFontData = {
                    value: "",
                    fontSize: config.fontSize,
                    fontFamily: config.fontFamily,
                    fontWeight: config.fontWeight,
                    fontColor: config.fontColor,
                    fontStyle: config.fontStyle,
                    width: config.fontSize,
                    height: config.fontSize,
                    underline: !!config.underline,
                    strikout: !!config.strikout,
                    isChinese: false
                };;
                content.split("").forEach(text => {
                    baseText.value = text;
                    const { width, height } = this.getFontSize(baseText);
                    baseText.width = width;
                    baseText.height = height;
                    baseText.isChinese = isChinese(text);
                    this._copyContent.push(deepClone(baseText));
                });
            } else {
                return false;
            }
        }
        let cursorPosition = 0;
        if (selectArea) {
            // 选中区域存在替换选中区域
            const index = this.deleteSelectContent(selectArea);
            this._content.splice(index, 0, ...this._copyContent);
            cursorPosition = index + this._copyContent.length;
        } else {
            // 光标位置粘贴
            this._content.splice(position + 1, 0, ...this._copyContent);
            cursorPosition = position + 1 + this._copyContent.length;
        }

        this._copyContent = [];
        return cursorPosition;
    }
}
