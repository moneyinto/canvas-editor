import { IConfig, IFontData } from "./type";

const initData: IFontData[] = [
    {
        value: "测",
        fontSize: 16,
        width: 16,
        height: 13.734375,
        fontStyle: "normal",
        fontWeight: "400",
        fontFamily: "kai",
        fontColor: "#444",
        isChinese: true
    },
    {
        value: "试",
        fontSize: 16,
        width: 16,
        height: 13.734375,
        fontStyle: "normal",
        fontWeight: "400",
        fontFamily: "kai",
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
    }
];

export class Data {
    private _content: IFontData[];
    private _config: IConfig;
    constructor() {
        this._content = initData;
        this._config = {
            x: 10,
            y: 10,
            fontSize: 16,
            fontWeight: "400",
            fontFamily: "kai",
            fontColor: "#444",
            fontStyle: "normal",
            wordSpace: 1,
            lineHeight: 16
        };
    }

    public getContent() {
        return this._content;
    }

    public getLength() {
        return this._content.length;
    }

    public getConfg() {
        return this._config;
    }

    public addContent(text: IFontData) {
        this._content.push(text);
    }
}
