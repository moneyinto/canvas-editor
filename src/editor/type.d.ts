export interface IMouseClick {
    x: number;
    y: number;
}

export interface IConfig {
    fontSize: number;
    fontWeight: string;
    fontFamily: string;
    fontColor: string;
    fontStyle: string;
    wordSpace: number;
    lineHeight: number;
    pageMargin: number;
    pageWidth: number;
}

export interface IFontData {
    value: string;
    fontSize: number;
    width: number;
    height: number;
    fontStyle: string;
    fontWeight: string;
    fontFamily: string;
    fontColor: string;
    isChinese: boolean;
}

export interface ILineData {
    height: number;
    texts: IFontData[];
}