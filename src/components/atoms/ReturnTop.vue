<template>
  <button :style="{bottom: positionY, right: positionX}" class="btn-floating btn-large waves-effect waves-light" :class="btnColor" @click="returnTop">
    <i class="material-icons">arrow_upward</i>
  </button>
</template>

<script>
export default {
  name: 'ReturnTop',
  props: {
    positionX: String,
    positionY: String,
    btnColor: String
  },
  methods: {
    returnTop() {
      window.scrollTo({
        top: 300,
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