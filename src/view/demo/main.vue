<template>
  <section>
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
    <div class="target" v-expose="doExpose">5</div>
    <div>6</div>
    <div>7</div>
    <div>8</div>
    <div>9</div>
    <div>10</div>
  </section>
</template>
<script>
export default {
  data() {
    return {};
  },
  created() {
    console.log('created');
  },
  methods: {
    doExpose() {
      console.log('Expose!');
    }
  }
};
</script>
<style scoped>
div {
  height: 200px;
  border: 1px solid rgb(251, 255, 0);
}

.target {
  background: yellowgreen;
}
</style>
