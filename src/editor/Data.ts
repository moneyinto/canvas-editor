import { IConfig, IFontData, ILineData } from "./type";

const initData: IFontData[] = [
    {
        value: "c",
        fontSize: 16,
        width: 8.751998901367188,
        height: 8.720000267028809,
        fontStyle: "normal",
        fontWeight: "400",
        fontFamily: "serif",
        fontColor: "#f60000",
        isChinese: false
    },
    {
        value: "a",
        fontSize: 16,
        width: 8.943984985351562,
        height: 8.720000267028809,
        fontStyle: "normal",
        fontWeight: "400",
        fontFamily: "serif",
        fontColor: "#f60000",
        isChinese: false
    },
    {
        value: "n",
        fontSize: 16,
        width: 8.943984985351562,
        height: 8.496000289916992,
        fontStyle: "normal",
        fontWeight: "400",
        fontFamily: "serif",
        fontColor: "#f60000",
        isChinese: false
    },
    {
        value: "a",
        fontSize: 16,
        width: 8.943984985351562,
        height: 8.720000267028809,
        fontStyle: "normal",
        fontWeight: "400",
        fontFamily: "serif",
        fontColor: "#f60000",
        isChinese: false
    },
    {
        value: "s",
        fontSize: 16,
        width: 8.079986572265625,
        height: 8.720000267028809,
        fontStyle: "normal",
        fontWeight: "400",
        fontFamily: "serif",
        fontColor: "#f60000",
        isChinese: false
    },
    {
        value: "富",
        fontSize: 16,
        width: 16,
        height: 15.26400089263916,
        fontStyle: "normal",
        fontWeight: "400",
        fontFamily: "serif",
        fontColor: "#444",
        isChinese: true
    },
    {
        value: "文",
        fontSize: 16,
        width: 16,
        height: 14.831999778747559,
        fontStyle: "normal",
        fontWeight: "400",
        fontFamily: "serif",
        fontColor: "#444",
        isChinese: true
    },
    {
        value: "本",
        fontSize: 16,
        width: 16,
        height: 15.37600040435791,
        fontStyle: "normal",
        fontWeight: "400",
        fontFamily: "serif",
        fontColor: "#444",
        isChinese: true
    },
    {
        value: "渲",
        fontSize: 16,
        width: 16,
        height: 14.592000007629395,
        fontStyle: "normal",
        fontWeight: "400",
        fontFamily: "serif",
        fontColor: "#444",
        isChinese: true
    },
    {
        value: "染",
        fontSize: 16,
        width: 16,
        height: 15.35999870300293,
        fontStyle: "normal",
        fontWeight: "400",
        fontFamily: "serif",
        fontColor: "#444",
        isChinese: true
    },
    {
        value: "c",
        fontSize: 16,
        width: 8.751998901367188,
        height: 8.720000267028809,
        fontStyle: "normal",
        fontWeight: "400",
        fontFamily: "serif",
        fontColor: "#f60000",
        isChinese: false
    },
    {
        value: "a",
        fontSize: 16,
        width: 8.943984985351562,
        height: 8.720000267028809,
        fontStyle: "normal",
        fontWeight: "400",
        fontFamily: "serif",
        fontColor: "#f60000",
        isChinese: false
    },
    {
        value: "n",
        fontSize: 16,
        width: 8.943984985351562,
        height: 8.496000289916992,
        fontStyle: "normal",
        fontWeight: "400",
        fontFamily: "serif",
        fontColor: "#f60000",
        isChinese: false
    },
    {
        value: "a",
        fontSize: 16,
        width: 8.943984985351562,
        height: 8.720000267028809,
        fontStyle: "normal",
        fontWeight: "400",
        fontFamily: "serif",
        fontColor: "#f60000",
        isChinese: false
    },
    {
        value: "s",
        fontSize: 16,
        width: 8.079986572265625,
        height: 8.720000267028809,
        fontStyle: "normal",
        fontWeight: "400",
        fontFamily: "serif",
        fontColor: "#f60000",
        isChinese: false
    },
    {
        value: "富",
        fontSize: 16,
        width: 16,
        height: 15.26400089263916,
        fontStyle: "normal",
        fontWeight: "400",
        fontFamily: "serif",
        fontColor: "#444",
        isChinese: true
    },
    {
        value: "文",
        fontSize: 16,
        width: 16,
        height: 14.831999778747559,
        fontStyle: "normal",
        fontWeight: "400",
        fontFamily: "serif",
        fontColor: "#444",
        isChinese: true
    },
    {
        value: "本",
        fontSize: 16,
        width: 16,
        height: 15.37600040435791,
        fontStyle: "normal",
        fontWeight: "400",
        fontFamily: "serif",
        fontColor: "#444",
        isChinese: true
    },
    {
        value: "渲",
        fontSize: 16,
        width: 16,
        height: 14.592000007629395,
        fontStyle: "normal",
        fontWeight: "400",
        fontFamily: "serif",
        fontColor: "#444",
        isChinese: true
    },
    {
        value: "染",
        fontSize: 16,
        width: 16,
        height: 15.35999870300293,
        fontStyle: "normal",
        fontWeight: "400",
        fontFamily: "serif",
        fontColor: "#444",
        isChinese: true
    },
    {
        value: "c",
        fontSize: 16,
        width: 8.751998901367188,
        height: 8.720000267028809,
        fontStyle: "normal",
        fontWeight: "400",
        fontFamily: "serif",
        fontColor: "#f60000",
        isChinese: false
    },
    {
        value: "a",
        fontSize: 16,
        width: 8.943984985351562,
        height: 8.720000267028809,
        fontStyle: "normal",
        fontWeight: "400",
        fontFamily: "serif",
        fontColor: "#f60000",
        isChinese: false
    },
    {
        value: "n",
        fontSize: 16,
        width: 8.943984985351562,
        height: 8.496000289916992,
        fontStyle: "normal",
        fontWeight: "400",
        fontFamily: "serif",
        fontColor: "#f60000",
        isChinese: false
    },
    {
        value: "a",
        fontSize: 16,
        width: 8.943984985351562,
        height: 8.720000267028809,
        fontStyle: "normal",
        fontWeight: "400",
        fontFamily: "serif",
        fontColor: "#f60000",
        isChinese: false
    },
    {
        value: "s",
        fontSize: 16,
        width: 8.079986572265625,
        height: 8.720000267028809,
        fontStyle: "normal",
        fontWeight: "400",
        fontFamily: "serif",
        fontColor: "#f60000",
        isChinese: false
    },
    {
        value: "富",
        fontSize: 16,
        width: 16,
        height: 15.26400089263916,
        fontStyle: "normal",
        fontWeight: "400",
        fontFamily: "serif",
        fontColor: "#444",
        isChinese: true
    },
    {
        value: "文",
        fontSize: 16,
        width: 16,
        height: 14.831999778747559,
        fontStyle: "normal",
        fontWeight: "400",
        fontFamily: "serif",
        fontColor: "#444",
        isChinese: true
    },
    {
        value: "本",
        fontSize: 16,
        width: 16,
        height: 15.37600040435791,
        fontStyle: "normal",
        fontWeight: "400",
        fontFamily: "serif",
        fontColor: "#444",
        isChinese: true
    },
    {
        value: "渲",
        fontSize: 16,
        width: 16,
        height: 14.592000007629395,
        fontStyle: "normal",
        fontWeight: "400",
        fontFamily: "serif",
        fontColor: "#444",
        isChinese: true
    },
    {
        value: "染",
        fontSize: 16,
        width: 16,
        height: 15.35999870300293,
        fontStyle: "normal",
        fontWeight: "400",
        fontFamily: "serif",
        fontColor: "#444",
        isChinese: true
    },
    {
        value: "\n",
        fontSize: 16,
        width: 0,
        height: 0,
        fontStyle: "normal",
        fontWeight: "400",
        fontFamily: "serif",
        fontColor: "#444",
        isChinese: false
    },
    {
        value: "c",
        fontSize: 16,
        width: 8.751998901367188,
        height: 8.720000267028809,
        fontStyle: "normal",
        fontWeight: "400",
        fontFamily: "serif",
        fontColor: "#f60000",
        isChinese: false
    },
    {
        value: "a",
        fontSize: 16,
        width: 8.943984985351562,
        height: 8.720000267028809,
        fontStyle: "normal",
        fontWeight: "400",
        fontFamily: "serif",
        fontColor: "#f60000",
        isChinese: false
    },
    {
        value: "n",
        fontSize: 16,
        width: 8.943984985351562,
        height: 8.496000289916992,
        fontStyle: "normal",
        fontWeight: "400",
        fontFamily: "serif",
        fontColor: "#f60000",
        isChinese: false
    },
    {
        value: "a",
        fontSize: 16,
        width: 8.943984985351562,
        height: 8.720000267028809,
        fontStyle: "normal",
        fontWeight: "400",
        fontFamily: "serif",
        fontColor: "#f60000",
        isChinese: false
    },
    {
        value: "s",
        fontSize: 16,
        width: 8.079986572265625,
        height: 8.720000267028809,
        fontStyle: "normal",
        fontWeight: "400",
        fontFamily: "serif",
        fontColor: "#f60000",
        isChinese: false
    },
    {
        value: "富",
        fontSize: 16,
        width: 16,
        height: 15.26400089263916,
        fontStyle: "normal",
        fontWeight: "400",
        fontFamily: "serif",
        fontColor: "#444",
        isChinese: true
    },
    {
        value: "文",
        fontSize: 16,
        width: 16,
        height: 14.831999778747559,
        fontStyle: "normal",
        fontWeight: "400",
        fontFamily: "serif",
        fontColor: "#444",
        isChinese: true
    },
    {
        value: "本",
        fontSize: 16,
        width: 16,
        height: 15.37600040435791,
        fontStyle: "normal",
        fontWeight: "400",
        fontFamily: "serif",
        fontColor: "#444",
        isChinese: true
    },
    {
        value: "渲",
        fontSize: 16,
        width: 16,
        height: 14.592000007629395,
        fontStyle: "normal",
        fontWeight: "400",
        fontFamily: "serif",
        fontColor: "#444",
        isChinese: true
    },
    {
        value: "染",
        fontSize: 16,
        width: 16,
        height: 15.35999870300293,
        fontStyle: "normal",
        fontWeight: "400",
        fontFamily: "serif",
        fontColor: "#444",
        isChinese: true
    }
];

export class Data {
    private _content: IFontData[];
    private _renderContent: ILineData[];
    private _config: IConfig;
    constructor() {
        this._content = initData;
        this._config = {
            fontSize: 16,
            fontWeight: "400",
            fontFamily: "serif",
            fontColor: "#444",
            fontStyle: "normal",
            wordSpace: 1,
            lineHeight: 1.2,
            pageMargin: 10,
            pageWidth: 200
        };

        this._renderContent = [];
    }

    getContent() {
        return this._content;
    }

    getRenderContent() {
        const width = this._config.pageWidth - this._config.pageMargin * 2;
        const renderContent: ILineData[] = [];
        let lineData: ILineData = {
            height: 0,
            texts: []
        };
        let countWidth = 0;
        this._content.forEach(text => {
            if (text.value === "\n") {
                if (lineData.height === 0) lineData.height = text.fontSize;
                renderContent.push(lineData);
                lineData = {
                    height: 0,
                    texts: [text]
                };
                countWidth = 0;
            } else if (countWidth + text.width < width) {
                // 一行数据可以摆得下
                lineData.texts.push(text);
                if (lineData.height < text.fontSize) lineData.height = text.fontSize;
                countWidth = countWidth + text.width + this._config.wordSpace;
            } else {
                renderContent.push(lineData);
                lineData = {
                    height: 0,
                    texts: [text]
                };
                countWidth = text.width + this._config.wordSpace;
            }
        });

        if (lineData.texts.length > 0) renderContent.push(lineData);

        this._renderContent = renderContent;

        return renderContent;
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
}
