# vue-plugin-exposure  
vue插件 曝光组件 使用intersection-observer  


#### demo  

<a href="https://nowheretorun.github.io/vue-plugin-exposure/dist/demo/" target="blank">Github Page Demo</a>


## cmd 调用方式：

### 安装

```bash
yarn add vue-plugin-exposure --save
```

通过 `imort` 导入

```javascript
import Exposure from 'vue-plugin-exposure';
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

// or
Vue.use(Exposure, config);
```

#### 组件中使用    
注意，通过指令 例如`v-exposure="doExpose"` 传到插件中的是一个函数，会在曝光时调用，所以不要再模板上传参。  
vue中的数据可以直接在对应函数的`this`中拿到，如下例(TS的例子，使用插件的方法不会变)  

xxx.vue  
```
<template>
  <section class="online_row" v-exposure="doExpose">
    <span class="online_call_btn">立即抢答</span>
  </section>
</template>
<script lang="ts">
import { Component, Emit, Inject, Model, Prop, Provide, Vue, Watch } from 'vue-property-decorator';

@Component({})
export default class LiveAnswer extends Vue {
  @Prop(Object)
  private cardData!: any;

  private COMP_NAME = 'LiveAnswer';

  mounted() {}

  destroyed() {}

  // methods
  private doExpose() {
    this.$emit('do-expose', { data: this.cardData, from: this.COMP_NAME });
  }
}
</script>

```


如果一定要在模板上传参，请封装一个高阶函数，如下：  
```
<template>
  <section class="online_row" @click="doClick('raceAnswer', $event)" v-exposure="doExpose('test1')">
    <span class="online_call_btn">立即抢答</span>
  </section>
</template>
<script lang="ts">
import { Component, Emit, Inject, Model, Prop, Provide, Vue, Watch } from 'vue-property-decorator';

@Component({})
export default class LiveAnswer extends Vue {
  @Prop(Object)
  private cardData!: any;

  private COMP_NAME = 'LiveAnswer';

  mounted() {}

  destroyed() {}

  // methods
  private doClick(type, event) {
    event.stopPropagation();
    this.$emit('do-click', { event, type, data: this.cardData, from: this.COMP_NAME });
  }

  private doExpose(domParams) {
    return () => {
      console.log(domParams, this);
      this.$emit('do-expose', { data: this.cardData, from: this.COMP_NAME });
    };
  }
}
</script>
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

