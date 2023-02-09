import "@/style/index.css";
import { Editor } from "./editor";
import { Data } from "./editor/Data";

window.onload = () => {
    const container = document.querySelector<HTMLDivElement>("#editor")!;
    const data = new Data();
    const instance = new Editor(container, data);

    console.log("实例", instance);

    let isBold = false;
    const boldBtn = document.querySelector<HTMLDivElement>(".tool-btn-bold");

    instance.listener.onSelectChange = (config) => {
        isBold = config.bold;
        console.log(config, boldBtn);
        setBoldBthStyle();
    };

    const setBoldBthStyle = () => {
        if (isBold) {
            boldBtn?.classList.add("active");
        } else {
            boldBtn?.classList.remove("active");
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
        console.log("斜体");
    };
    
    window.setFontUnderLine = () => {
        console.log("下划线");
    };
    
    window.setFontStrikeout = () => {
        console.log("中划线");
    };
}
