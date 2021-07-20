<template>
  <button :style="isStop? btnStyle.fixed : btnStyle.nomal" class="btn-floating btn-large waves-effect waves-light" :class="[btnColor, {[btnSize]: !isStop}]" @click="btnEvent">
    <i class="material-icons">{{ btnIcon }}</i>
  </button>
</template>

<script>
export default {
  name: 'AnyBtn',
  props: {
    btnIcon: String,
    btnSize: String,
    event: String,
    positionX: Number,
    positionY: Number,
    btnColor: String,
    c_Height: [Object, Array, Function],
    isStop: Boolean
  },
  computed: {
    btnStyle() {
      const adjust = 100;
      const btnStyle = {
        nomal: {bottom: this.positionY + '%', right: this.positionX + '%'},
        fixed: {bottom: this.c_Height.footer + adjust + 'px', right: this.positionX + '&'}
      }
      return btnStyle
    }
  },
  methods: {
    btnEvent() {
      if (this.event === "returnTop") {
        const headerHeight = this.c_Height.header;
        window.scrollTo({
          top: headerHeight,
          behavior: 'smooth'
        })
        return;
      }

      if (this.event === "backView") {
        this.$emit('title-click');
        return;
      }


    },
  },
  mounted() {
    console.log(this.isStop);
  }
}
</script>

<style scoped>
button {
  position: fixed;
  z-index: 10000;
}
</style>