import 'intersection-observer';

let io; // 所有指令可以使用同一个io

export default {
  install: function(Vue, defaultOptions = {}) {
    const pluginOpt = Object.assign(
      {
        name: 'exposure'
      },
      defaultOptions
    );

    if (!io) {
      io = new IntersectionObserver(
        (entries) => {
          for (let i = 0, len = entries.length; i < len; i++) {
            let entry = entries[i];
            if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
              // 需要播放的跟当前播放的是同一个，就继续
              console.log(entry);
            }
          }
        },
        {
          threshold: 0.5,
          rootMargin: '10% 0% -50% 0%' // 从下方滚动上来的要至少到可视区域一半才能播放
        }
      );
    }

    const directionName = pluginOpt.name.replace(/^v-/, '');

    Vue.directive(directionName, {
      bind(el, binding, vnode, oldVnode) {
        console.log('[exposure] bind', el, binding, vnode, oldVnode);
        io.observe(el)
      },
      unbind(el, binding, vnode, oldVnode) {
        console.log('[exposure] unbind', el, binding, vnode, oldVnode);
        io.unobserve(el)
      }
    });
  }
};
