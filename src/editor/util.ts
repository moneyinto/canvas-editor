const zhCNPattern = new RegExp("[\u4E00-\u9FA5]+");
const enPattern = new RegExp("[A-Za-z]+");
const numberPattern = new RegExp("[0-9]+");
const enSpecialPattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?]");
const zhCNSpecialPattern = new RegExp(
    "[《》~！@#￥……&*（）——|{}【】‘；：”“'。，、？]"
);

export const isChinese = (text: string) => {
    return zhCNPattern.test(text) || zhCNSpecialPattern.test(text);
};

export const isEnglish = (text: string) => {
    return enPattern.test(text) || enSpecialPattern.test(text);
};

export const isNumber = (text: string) => {
    return numberPattern.test(text);
};

export const deepClone = (obj: any) => {
    if (!obj) return obj;
    return JSON.parse(JSON.stringify(obj));
};
