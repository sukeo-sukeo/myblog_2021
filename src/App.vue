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

// ブラウザバック発火時の処理
window.addEventListener('popstate', () => {
  router.push('/').catch(() => location.reload())
})

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
    
  },
  created() {
  },
  mounted() {
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

<style>
</style>