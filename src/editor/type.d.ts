export interface IMouseClick {
    x: number;
    y: number;
}

export interface IConfig {
    x: number;
    y: number;
    fontSize: number;
    fontWeight: string;
    fontFamily: string;
    fontColor: string;
    fontStyle: string;
    wordSpace: number;
    lineHeight: number;
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