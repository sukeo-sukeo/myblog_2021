<template>
  <header class="valign-wrapper">
    <div class="row">
      <h1 class="site_title col s12 valign-wrapper" @click="goToHome">
        <i class="material-icons">
          laptop_mac
        </i>
        スケオブログ
        <i class="material-icons">
          code_off
        </i>
      </h1>
      <h5 class="sub_title col s12">Beer Wine Books & Programing</h5>
      <!-- <h5 class="site_title sub_title col s12">実務未経験エンジニアによる<br class="hide-on-med-and-up"/>実務未経験エンジニアのためのブログ</h5> -->
    </div>
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
.site_title {
  font-size: 40px;
  letter-spacing: 3px;
  justify-content: center;
  font-family: 'Train One', cursive;
  text-shadow: 2px 2px 1px white, 3px 3px 8px wheat;
  margin-bottom: 0;
}
.sub_title {
  /* font-size: 20px; */
  font-family: 'Train One', cursive;
  padding: 0 20px;
  text-align: center;
  text-shadow: 2px 2px 1px wheat, 3px 3px 8px wheat;
  margin-bottom: 0;
}
.material-icons {
  font-size: 42px;
}

</style>