### Canvas 文本编辑

<p align="center">
    <img src="./public/word.png" />
</p>

<p align="center">
    <a href="https://github.com/moneyinto/canvas-editor/stargazers" target="_black">
        <img src="https://img.shields.io/github/stars/moneyinto/canvas-editor?logo=github" alt="stars" />
    </a>
    <a href="https://www.github.com/moneyinto/canvas-editor/network/members" target="_black">
        <img src="https://img.shields.io/github/forks/moneyinto/canvas-editor?logo=github" alt="forks" />
    </a>
    <a href="https://www.typescriptlang.org" target="_black">
        <img src="https://img.shields.io/badge/language-TypeScript-blue.svg" alt="language">
    </a>
    <a href="https://github.com/moneyinto/canvas-editor/issues" target="_black">
        <img src="https://img.shields.io/github/issues-closed/moneyinto/canvas-editor.svg" alt="issue">
    </a>
</p>

##### 研究canvas 文本编辑 为了实现[canvas-ppt](https://github.com/moneyinto/canvas-ppt)插入文本

### 功能
- [x] 字体设置
- [x] 字体大小设置
- [x] 字体颜色设置
- [x] 字体粗体设置
- [x] 字体斜体设置
- [x] 字体下划线设置
- [x] 字体删除线设置
- [x] 文本选中
- [x] 光标移动
- [x] 文本输入
- [x] 回车换行
- [x] 文本单个删除
- [x] 删除选中文本
- [x] 复制、剪切、粘贴文本
- [x] 粘贴外来文本（不带格式）
- [ ] 粘贴外来文本（带格式）
- [x] 文本左对齐、居中、右对齐

### 思考解决的问题
- ```ctx.textBaseline = "bottom"```对齐下，英文与中文没有对齐，存在错位，且英文在不同的字体大小下也存在错误，目前采用根据字体大小且是英文进行了位置的补偿，但感觉还会存在偏差，需要后期研究思考如何处理解决该问题
