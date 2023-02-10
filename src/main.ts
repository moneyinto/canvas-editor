import "@/style/index.css";
import { Editor } from "./editor";
import { Data } from "./editor/Data";
import { ICurrentFontConfig } from "./editor/type";

window.onload = () => {
    const container = document.querySelector<HTMLDivElement>("#editor")!;
    const data = new Data();
    const instance = new Editor(container, data);

    console.log("实例", instance);

    let isBold = false;
    let isItalic = false;
    let isUnderLine = false;
    const boldBtn = document.querySelector<HTMLDivElement>(".tool-btn-bold");
    const italicBtn = document.querySelector<HTMLDivElement>(".tool-btn-italic");
    const underLineBtn = document.querySelector<HTMLDivElement>(".tool-btn-underline");

    const fontChange = (config: ICurrentFontConfig) => {
        isBold = config.fontWeight === "bold";
        isItalic = config.fontStyle === "italic";
        isUnderLine = !!config.underline;
        setBoldBthStyle();
        setItalicBtnStyle();
        setUnderLineBtnStyle();
    };

    instance.listener.onSelectChange = fontChange;
    instance.listener.onCursorChange = fontChange;

    const setBoldBthStyle = () => {
        if (isBold) {
            boldBtn?.classList.add("active");
        } else {
            boldBtn?.classList.remove("active");
        }
    }

    const setItalicBtnStyle = () => {
        if (isItalic) {
            italicBtn?.classList.add("active");
        } else {
            italicBtn?.classList.remove("active");
        }
    }

    const setUnderLineBtnStyle = () => {
        if (isUnderLine) {
            underLineBtn?.classList.add("active");
        } else {
            underLineBtn?.classList.remove("active");
        }
    }

    window.setFontColor = (e) => {
        console.log((e.target as HTMLInputElement).value);
    };
    
    window.setAddFontSize = () => {
        instance.setFontSize("large");
    };
    
    window.setReduceFontSize = () => {
        instance.setFontSize("small");
    };
    
    window.setFontBold = () => {
        if (instance.isSelectContent) {
            isBold = !isBold;
            instance.setFontBold(isBold);
            setBoldBthStyle();
        }
    };
    
    window.setFontItalic = () => {
        if (instance.isSelectContent) {
            isItalic = !isItalic;
            instance.setFontItalic(isItalic);
            setItalicBtnStyle();
        }
    };
    
    window.setFontUnderLine = () => {
        if (instance.isSelectContent) {
            isUnderLine = !isUnderLine;
            instance.setFontUnderLine(isUnderLine);
            setUnderLineBtnStyle();
        }
    };
    
    window.setFontStrikeout = () => {
        console.log("中划线");
    };
}
