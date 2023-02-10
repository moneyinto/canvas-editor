### Canvas 文本编辑

##### 研究canvas 文本编辑 为了实现[canvas-ppt](https://github.com/moneyinto/canvas-ppt)插入文本

### 思考解决的问题
- ```ctx.textBaseline = "bottom"```对齐下，英文与中文没有对齐，存在错位，且英文在不同的字体大小下也存在错误，目前采用根据字体大小且是英文进行了位置的补偿，但感觉还会存在偏差，需要后期研究思考如何处理解决该问题
