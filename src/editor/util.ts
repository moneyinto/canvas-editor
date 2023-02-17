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

export const SYS_FONTS = [
    { label: "Arial", value: "Arial" },
    { label: "微软雅黑", value: "Microsoft YaHei" },
    { label: "宋体", value: "SimSun" },
    { label: "黑体", value: "SimHei" },
    { label: "楷体", value: "KaiTi" },
    { label: "新宋体", value: "NSimSun" },
    { label: "仿宋", value: "FangSong" },
    { label: "苹方", value: "PingFang SC" },
    { label: "华文黑体", value: "STHeiti" },
    { label: "华文楷体", value: "STKaiti" },
    { label: "华文宋体", value: "STSong" },
    { label: "华文仿宋", value: "STFangSong" },
    { label: "华文中宋", value: "STZhongSong" },
    { label: "华文琥珀", value: "STHupo" },
    { label: "华文新魏", value: "STXinwei" },
    { label: "华文隶书", value: "STLiti" },
    { label: "华文行楷", value: "STXingkai" },
    { label: "冬青黑体", value: "Hiragino Sans GB" },
    { label: "兰亭黑", value: "Lantinghei SC" },
    { label: "偏偏体", value: "Hanzipen SC" },
    { label: "手札体", value: "Hannotate SC" },
    { label: "宋体", value: "Songti SC" },
    { label: "娃娃体", value: "Wawati SC" },
    { label: "行楷", value: "Xingkai SC" },
    { label: "圆体", value: "Yuanti SC" },
    { label: "华文细黑", value: "STXihei" },
    { label: "幼圆", value: "YouYuan" },
    { label: "隶书", value: "LiSu" }
];

/**
 * 判断操作系统是否存在某字体
 * @param fontName 字体名
 */
export const isSupportFont = (fontName: string) => {
    if (typeof fontName !== "string") return false;

    const arial = "Arial";
    if (fontName.toLowerCase() === arial.toLowerCase()) return true;

    const size = 100;
    const width = 100;
    const height = 100;
    const str = "a";

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) return false;

    canvas.width = width;
    canvas.height = height;
    ctx.textAlign = "center";
    ctx.fillStyle = "black";
    ctx.textBaseline = "middle";

    const getDotArray = (_fontFamily: string) => {
        ctx.clearRect(0, 0, width, height);
        ctx.font = `${size}px ${_fontFamily}, ${arial}`;
        ctx.fillText(str, width / 2, height / 2);
        const imageData = ctx.getImageData(0, 0, width, height).data;
        return [].slice.call(imageData).filter((item) => item !== 0);
    };

    return getDotArray(arial).join("") !== getDotArray(fontName).join("");
};
