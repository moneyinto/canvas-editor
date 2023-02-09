import { IOnSelectChange, IOnCursorChange } from "./type";

export default class Listener {
    public onSelectChange: IOnSelectChange | null;
    public onCursorChange: IOnCursorChange | null;
    constructor() {
        this.onSelectChange = null;
        this.onCursorChange = null;
    }
}
