<template>
  <div class="">
    <header-bar ref="header"></header-bar>
    <nav-bar ref="navbar" :routeData="routeData"></nav-bar>

    <article :class="{container: !isMovileView}">
      <router-view 
      :isMovileView="isMovileView"
      :topReturnBtnActive="topReturnBtnActive"
      :isStopBeforeFooter="isStopBeforeFooter"
      :routeData="routeData"
      :c_Height="c_Height" />
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
    c_Height: Object,
    resize: 0,
    scroll: 0,
    topBtnShowHeight: 700,
    topReturnBtnActive: false,
    isStopBeforeFooter: false,
    movileViewMinWidth: 600,
    isMovileView: false,
    routeData: Array
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
    scrollWindow() {
      this.scroll = window.scrollY
    },
    judgeShowTopBtn(amount) {
      if (this.topBtnShowHeight <= amount) {
        this.topReturnBtnActive = true
      } else {
        this.topReturnBtnActive = false
      }  
    },
    judgeStopTopBtn(amount) {
      if (amount + window.innerHeight + this.c_Height.footer > document.body.clientHeight) {
        this.isStopBeforeFooter = true;
      } else {
        this.isStopBeforeFooter = false;
      }
    },
    judgeIsMovile(amount) {
      if (amount <= this.movileViewMinWidth) {
        this.isMovileView = true
      } else {
        this.isMovileView = false
      }
    }
  },
  created() {
    // ルートpathを取得
    this.routeData = this.$router.options.routes.slice(0, -1)
  },
  mounted() {
    // ブラウザバック時の処理
    window.addEventListener('popstate', this.browserBack);

    // モバイルビューの表示条件
    this.resize = window.innerWidth;
    window.addEventListener('resize', this.mediaQuery)

    // btnの表示条件など
    window.addEventListener('scroll', this.scrollWindow)

    // 各コンポーネントのheightを取得
    const refs = this.getCompornents(this.$refs)
    this.c_Height = this.getClientsHeight(refs);
  },
  updated() {
  },
  watch: {
    resize: function(amount) {
      this.judgeIsMovile(amount);
    },
    scroll: function(amount) {
      this.judgeShowTopBtn(amount);
      this.judgeStopTopBtn(amount);
    },
  }
};
</script>

<style scoped>
.container {
  width: 90%;
  margin-bottom: 50px;
}
</style>