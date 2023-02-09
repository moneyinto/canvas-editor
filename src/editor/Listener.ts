import { IOnSelectChange } from "./type";

export default class Listener {
    public onSelectChange: IOnSelectChange | null;
    constructor() {
        this.onSelectChange = null;
    }
}
