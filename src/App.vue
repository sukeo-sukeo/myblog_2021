<template>
  <div class="">
    <header-bar></header-bar>
    <nav-bar></nav-bar>

    <article class="container">
      <router-view/>
    </article>

    <footer-bar></footer-bar>
  </div>
</template>

<script>
import router from './router/index';
import HeaderBar from './components/common/Header';
import NavBar from './components/common/NavBar';
import FooterBar from './components/common/Footer';
// import BlogPage from './components/pages/blog/_Page';

export default {
  name: "App",
  components: {
    // BlogPage,
    HeaderBar,
    NavBar,
    FooterBar
  },
  data: () => ({
    
  }),
  methods: {
    browserBack() {
      router.push('/').catch(() => location.reload())
    }
  },
  created() {
  },
  mounted() {
    // ブラウザバック発火時の処理
    window.addEventListener('popstate', this.browserBack);
  },
  updated() {
  },
  watch: {
    // '$route': (to, from) => {
    //   console.log('遷移前のページ:', from);
    //   console.log('遷移後のページ:', to);
    //   // console.log(this.$route.path);
    //   // router.push('/').catch(() => location.reload())
    // }
  }
};
</script>

<style scoped>
.container {
  width: 90%;
  margin-bottom: 50px;
}
</style>