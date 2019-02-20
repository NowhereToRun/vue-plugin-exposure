import 'intersection-observer';

let io; // 所有指令可以使用同一个io

const defaultIOConfig = {
  threshold: [0],
  root: null,
  rootMargin: "0px 0px -50px 0px"
};

class ExpSet {
  constructor() {
    this.prefix = (+new Date()).toString(36);
    this.seed = 0;
    this.set = {};
  }
  uuid() {
    return `exposureset_${this.prefix}_${this.seed++}`;
  }
  add(cb) {
    let uuid = this.uuid();
    this.set[uuid] = cb;
    return uuid;
  }
  has(uuid) {
    return !!this.set[uuid];
  }
  get(uuid) {
    return this.set[uuid];
  }
  delete(uuid) {
    delete this.set[uuid];
  }
}
const expSet = new ExpSet();

export default {
  install: function(Vue, defaultOptions = {}) {
    const { config = {}, name: pluginName = 'exposure' } = defaultOptions;

    const observerConfig = { ...defaultIOConfig, ...config };

    console.log(`[exposure plugin] ${pluginName} config`, observerConfig);

    if (!io) {
      io = new IntersectionObserver((entries) => {
        for (let i = 0, len = entries.length; i < len; i++) {
          let entry = entries[i];
          if (entry.isIntersecting) {
            console.log(entry);
            let cbId = entry.target.dataset.cbid;
            if (expSet.has(cbId)) {
              try {
                expSet.get(cbId)();
              } catch (e) {
                console.log('执行cb出错', entry, e);
              }
            }

            expSet.delete(cbId);
            io.unobserve(entry.target);
          }
        }
      }, observerConfig);
    }

    const directionName = pluginName.replace(/^v-/, '');

    Vue.directive(directionName, {
      bind(el, binding, vnode, oldVnode) {
        if (typeof binding.value === 'function') {
          let cbId = expSet.add(binding.value);
          el.dataset.cbid = cbId;
        }
        io.observe(el);
      },
      unbind(el, binding, vnode, oldVnode) {
        expSet.delete(el.dataset.cbid);
        io.unobserve(el);
      }
    });
  }
};
