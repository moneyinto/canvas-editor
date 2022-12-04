import "@/style/index.css";
import { Editor } from "./editor";
import { Data } from "./editor/data";

window.onload = () => {
    const container = document.querySelector<HTMLDivElement>("#editor")!;
    const data = new Data();
    const instance = new Editor(container, data);

    console.log("实例", instance);
}
