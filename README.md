# @mfelibs/vue-plugin-exposure

一句话介绍项目摘要。


#### demo（demo仍然走unpkg服务）
<a href="http://unpkg.smfe.sina.cn/@mfelibs/vue-plugin-exposure/dist/demo/index.html" target="blank">http://unpkg.smfe.sina.cn/@mfelibs/vue-plugin-exposure/dist/demo/index.html</a>

#### umd 路径（如果不提供umd，请手动删除）
说明：自spkg2.0版本之后将支持多出口js 上传umd到mjs服务中，请维护好如下umd路径，以及调用方法，供大家使用

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
import Exposure from '@mfelibs/vue-plugin-exposure'
```
### 使用

#### 初始化
调用 `Face` 构造函数，实例化组件对象:
```javascript
const config = {
  name: 'exposure',
  // 其他曝光相关配置，有需求再加
}

// 超级页体系
SPComponent.use(Exposure, config);

// or
Vue.use(Exposure, config);
```