<template>
  <button :style="isStop? btnStyle.fixed : btnStyle.nomal" class="btn-floating btn-large waves-effect waves-light" :class="btnColor" @click="returnTop">
    <i class="material-icons">arrow_upward</i>
  </button>
</template>

<script>
export default {
  name: 'ReturnTop',
  props: {
    positionX: Number,
    positionY: Number,
    btnColor: String,
    c_Height: [Object, Array, Function],
    isStop: Boolean
  },
  // data() {
  //   return {
  //     btnStyle: this.getStyle()[0],
  //     stopBeforeFooterStyle: this.getStyle()[1]
  //   }
  // },
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
    returnTop() {
      const headerHeight = this.c_Height.header;
      window.scrollTo({
        top: headerHeight,
        behavior: 'smooth'
      })
    },
  }
}
</script>

<style scoped>
button {
  position: fixed;
  z-index: 10000;
}
</style>