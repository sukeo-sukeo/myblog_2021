<template>
  <header class="valign-wrapper">
    <h2 @click="goToHome">スケオブログ</h2>
  </header>
</template>

<script>
export default {
  name: 'HeaderBar',
  methods: {
    goToHome() {
      // console.log(this.$router)
      this.$router.push('/')
      location.reload();
    }
  }
}
</script>

<style scoped>
header {
  height: 300px;
  background-image: url("../../assets/bg.jpg");
  background-size: cover;
  cursor: pointer;
}
h2 {
  margin: 0 auto;
  font-family: Georgia, 'Times New Roman', Times, serif;
}
</style>