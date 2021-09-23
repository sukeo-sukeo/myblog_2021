<template>
  <div>

    <transition name="fadeinout">
      <a class="sidebar_btn btn-flat"
      :class="sideIsOpen? 'sidebar_open' : 'sidebar_close'"
      @click="sideBarBtn"
      v-show="sideBarBtnIsShow"
      >
        <mt-icon :iconName="sideIsOpen? 'close' : 'menu'"></mt-icon>
      </a>
    </transition>

    <transition name="slide">
      <side-bar 
      v-if="sideIsOpen"
      :c_Height="c_Height"
      :isMovileView="isMovileView"
      :routeData="routeData"
      @menu-click="sideBarBtn"
      ></side-bar>
    </transition>

    <div :class="sideIsOpen? (!isMovileView ? 'sidebar_open' : '') : 'sidebar_close'">
      <header-bar ref="header"></header-bar>
      <nav-bar ref="navbar" 
      :routeData="routeData"
      ></nav-bar>

      <article :class="{container: !isMovileView}">
        <router-view 
        :baseURL="baseURL"
        :isMovileView="isMovileView"
        :topReturnBtnActive="topReturnBtnActive"
        :isStopBeforeFooter="isStopBeforeFooter"
        :routeData="routeData"
        :c_Height="c_Height"
        />

      </article>

      <footer-bar ref="footer"></footer-bar>
    </div>
    
  </div>
</template>

<script>
import router from './router/index';
import HeaderBar from './components/common/Header';
import NavBar from './components/common/NavBar';
import SideBar from './components/common/SideBar';
import FooterBar from './components/common/Footer';
import MtIcon from './components/atoms/MtIcon';

export default {
  name: "App",
  components: {
    HeaderBar,
    NavBar,
    SideBar,
    FooterBar,
    MtIcon,
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
    routeData: Array,
    baseURL: String,
    sideIsOpen: false,
    sideBarBtnIsShow: true
  }),
  methods: {
    sideBarBtn() {
      this.sideIsOpen = !this.sideIsOpen
    },
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
    },
    judgeBaseURL() {
      if (location.href.includes('localhost') ||
          location.href.includes('192')) {
        this.baseURL = "http://localhost:3030"
      } else {
        this.baseURL = "https://sukeo.live-on.net";
      }
    },
    loadTwitterWidets() {
       window.twttr = (((d, s, id) => {
        let js, fjs = d.getElementsByTagName(s)[0],
          t = window.twttr || {};
        if (d.getElementById(id)) return t;
        js = d.createElement(s);
        js.id = id;
        js.src = "https://platform.twitter.com/widgets.js";
        fjs.parentNode.insertBefore(js, fjs);

        t._e = [];
        t.ready = function(f) {
          t._e.push(f);
        };
        return t;
      })(document, "script", "twitter-wjs"));
    },
  },
  created() {
    // localか本番か判断
    this.judgeBaseURL();
    // ルートpathを取得
    this.routeData = this.$router.options.routes.slice(0, -1);
    // ツイッターウィジェットをロード
    this.loadTwitterWidets();
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

      if (!this.sideIsOpen) {
        this.sideBarBtnIsShow = false;
        setTimeout(() => this.sideBarBtnIsShow = true, 2000);
      }
    },
    // sideIsOpen: function(amount) {
    //   console.log(amount);
    // }
  }
};
</script>

<style scoped>
.sidebar_open {
  width: calc(100% - 220px);
  margin-left: 220px;
  transition: 0.1s;
}
.sidebar_close {
  width: 100%;
  margin-left: 0;
  /* transition: all 0.5s 0s ease; */
}
.sidebar_btn {
  position: fixed;
  color: wheat;
  margin-top: 20px;
  z-index: 1000;
  width: auto;
}
.sidebar_btn > span {
  font-size : 32px;
  text-shadow: 2px 2px 5px grey;
}

.container {
  width: 90%;
  margin-bottom: 50px;
}
</style>