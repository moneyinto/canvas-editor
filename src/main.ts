import "@/style/index.css";
import { Editor } from "./editor";
import { Data } from "./editor/Data";

window.onload = () => {
    const container = document.querySelector<HTMLDivElement>("#editor")!;
    const data = new Data();
    const instance = new Editor(container, data);

    console.log("实例", instance);

    window.setFontColor = (e) => {
        console.log((e.target as HTMLInputElement).value);
    };
    
    window.setAddFontSize = () => {
        console.log("增大字体");
    };
    
    window.setReduceFontSize = () => {
        console.log("减小字体");
    };
    
    window.setFontBold = () => {
        console.log("加粗");
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
