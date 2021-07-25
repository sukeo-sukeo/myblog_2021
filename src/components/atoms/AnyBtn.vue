<template>
  <button :style="isStop? btnStyle.fixed : btnStyle.nomal" :class="[btnClass, btnColor, {[btnSize]: !isStop}]" @click="btnEvent">
    <template v-if="event === 'followBtn'">
      <span v-html="btnIcon"></span>
    </template>
    <template v-else>
      <i class="material-icons">{{ btnIcon }}</i>
    </template>
  </button>
</template>

<script>
export default {
  name: 'AnyBtn',
  data: () => ({
    btnClass:  "btn-floating btn-large waves-effect waves-light",
  }),
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
    if (this.event === "followBtn") {
      this.btnClass = "";
    }
  }
}
</script>

<style scoped>
button {
  position: fixed;
  z-index: 10000;
}
</style>