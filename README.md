# @mfelibs/vue-plugin-exposure

一句话介绍项目摘要。

#### demo（demo 仍然走 unpkg 服务）

<a href="http://unpkg.smfe.sina.cn/@mfelibs/vue-plugin-exposure/dist/demo/index.html" target="blank">http://unpkg.smfe.sina.cn/@mfelibs/vue-plugin-exposure/dist/demo/index.html</a>

#### umd 路径（如果不提供 umd，请手动删除）

说明：自 spkg2.0 版本之后将支持多出口 js 上传 umd 到 mjs 服务中，请维护好如下 umd 路径，以及调用方法，供大家使用

## umd 调用方式：

```
<script src="mjs.sinaimg.cn/cnpm/@mfelibs/xxxx@1.0.0/main.all.js"></script>

```

## cmd 调用方式：

### 安装

```bash
yarn add @mfelibs/vue-plugin-exposure --save
```

通过 `imort` 导入

```javascript
import Exposure from '@mfelibs/vue-plugin-exposure';
```

### 使用

#### 初始化

调用 `Face` 构造函数，实例化组件对象:

```javascript
const config = {
  name: 'exposure',
  // 其他曝光相关配置，可参考 IntersectionObserver
  // 已做默认配置如下
  // threshold: [0],
  // root: null,
  // rootMargin: '0px 0px -50px 0px'
};

// 超级页体系
SPComponent.use(Exposure, config);

// or
Vue.use(Exposure, config);
```

#### name 插件名称  
default：'exposure'
`name: 'xxx'`， 插件名为 `v-xxx`

#### root 滑动根节点   
default: null
`root： null` 默认指定滑动根节点为 `document`

#### threshold 触发阈值  
defalut: [0]  

数组长度可以为1 或 2 或 4.
和css选择器规则一样 分别代表四个方向的交叉值
比如 threshold: [0] 表示无论从 上下左右哪个方向进入容器可视区内部 都会触发

需注意 数组内容为 0~1 之间的小数，代表交叉比例。
比如监听的dom 高度40px， 设置 threshold: [0.5]，则在漏出 20px 之后会触发事件。  

#### rootMargin 边框边距  
default: `'0px 0px -50px 0px'`
举例来说，比如我们就是想漏出44px（之所以设置这个值是因为APP上评论条刚好这么高而且盖在Webview上方）之后触发事件，但是节监听的dom高度不一致或不可预知，默认配置就是解决这个场景

