export interface IMouseClick {
    x: number;
    y: number;
    textX: number;
    textY: number;
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
    underline?: boolean;
    strikout?: boolean;
    align?: "left" | "center" | "right";
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
    underline?: boolean;
    strikout?: boolean;
}

export interface ILineData {
    height: number;
    width: number;
    texts: IFontData[];
}

export interface ICurrentFontConfig {
    fontWeight?: string;
    fontSize?: number;
    fontFamily?: string;
    fontColor?: string;
    fontStyle?: string;
    underline?: boolean;
    strikout?: boolean;
}

export type IOnSelectChange = (config: ICurrentFontConfig) => void;

export type IOnCursorChange = (config: ICurrentFontConfig) => void;
