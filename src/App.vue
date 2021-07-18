<template>
  <div class="">
    <header-bar ref="header"></header-bar>
    <nav-bar ref="navbar"></nav-bar>

    <article :class="{container: !isMovileView}">
      <router-view 
      :isMovileView="isMovileView"
      :c_Height="componentsHeight" />
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
    componentsHeight: Object,
    resize: 0,
    isMovileView: false 
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
      }
      return clientHeightObj;
    },
    getCompornents(refs) {
      let doms = [];
      for (const key in refs) {
        doms.push({[key]: refs[key].$el})
      }
      return doms;
    },
    mediaQuery() {
      this.resize = window.innerWidth;
    },
  },
  created() {
  },
  mounted() {
    // ブラウザバック発火時の処理
    window.addEventListener('popstate', this.browserBack);

    // モバイルビューの表示条件に使用
    this.resize = window.innerWidth;
    console.log(this.resize);
    window.addEventListener('resize', this.mediaQuery)

    // 各コンポーネントのheightを取得
    const refs = this.getCompornents(this.$refs)
    this.componentsHeight = this.getClientsHeight(refs);
  
  },
  updated() {
  },
  watch: {
    resize: function(amount) {
      if (amount <= 600) {
        this.isMovileView = true
      } else {
        this.isMovileView = false
      }
    }
  }
};
</script>

<style scoped>
.container {
  width: 90%;
  margin-bottom: 50px;
}
</style>