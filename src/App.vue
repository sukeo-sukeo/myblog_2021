<template>
  <div class="">
    <header-bar ref="header"></header-bar>
    <nav-bar ref="navbar"></nav-bar>

    <article class="container">
      <router-view :c_Height="componentsHeight" />
    </article>

    <footer-bar ref="footer"></footer-bar>
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
    componentsHeight: Object
  }),
  methods: {
    browserBack() {
      router.push('/').catch(() => location.reload())
    },
    getClientsHeight(refs) {
      let clientHeightObj = {};
      for (const ref of refs) {
        const key = Object.entries(ref)[0][0];
        const dom = Object.entries(ref)[0][1];
        clientHeightObj[key] = dom.clientHeight
        // clientsHeight.push({[key]: dom.clientHeight})
      }
      return clientHeightObj;
    },
    getCompornents(refs) {
      let doms = [];
      for (const key in refs) {
        doms.push({[key]: refs[key].$el})
      }
      return doms;
    }
  },
  created() {
  },
  mounted() {
    // ブラウザバック発火時の処理
    window.addEventListener('popstate', this.browserBack);

    // 各コンポーネントのheightを取得
    const refs = this.getCompornents(this.$refs)
    // const refsHeight = JSON.stringify(this.getClientsHeight(refs));
    this.componentsHeight = this.getClientsHeight(refs);
    // console.log(refsHeight);
    // this.componentsHeight = refsHeight;
    console.log(this.componentsHeight);
    
    // console.log(JSON.stringify(this.componentsHeight));
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