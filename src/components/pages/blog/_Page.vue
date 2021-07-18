<template>
  <div id="blogContainer">
     
      <loader-circle class="loader" v-if="isLoader"></loader-circle>

      <transition name="fade">
        <div v-if="isLoader" class="mask"></div>
      </transition>

      <section v-for="(blog, idx) in blogs" :key="blog.uid">
              
        <title-card
          ref="title"
          :blogData="blog"
          :isMovileView="isMovileView"
          @title-click="toggleContent(idx)"
          v-show="isOpenTitle[idx]"
        ></title-card>

        <transition name="fadein">
          <content-card
            :blogData="blog"
            :isMovileView="isMovileView"
            v-show="isOpenContent[idx]"
          ></content-card>
        </transition>
    
      </section>

      <transition name="fadeinout">
        <return-top :positionX="5" :positionY="5" :btnColor="`red`" :c_Height="c_Height" :isStop="isStopBeforeFooter" v-show="topReturnBtnActive"></return-top>
      </transition>

  </div>
</template>

<script>
import axios from "axios";
import TitleCard from "./Title";
import ContentCard from "./Content";
import LoaderCircle from "../../atoms/LoaderCircle";
import ReturnTop from "../../atoms/ReturnTop";
import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-markdown";
import "prismjs/themes/prism-okaidia.css";
// import "prismjs/themes/prism-twilight.css";

export default {
  name: "BlogPage",
  components: {
    TitleCard,
    ContentCard,
    LoaderCircle,
    ReturnTop
  },
  data: () => ({
    baseURL: String,
    blogs: Array,
    isOpenTitle: [],
    isOpenContent: [],
    isLoader: true,
    topReturnBtnActive: false,
    scroll: 0,
    isStopBeforeFooter: false,
    totalTitleHeight: 0
  }),
  props: {
    c_Height: [Array, Object, Function],
    isMovileView: Boolean
  },
  methods: {
    async fetchBlog() {
      const blogs = await axios.get(`${this.baseURL}/node`).then((res) => res.data);

      // console.log(blogs);
      this.blogs = blogs;

      //コンテンツの開閉状態を初期化
      this.contentIsOpenInit();
    },
    culcTotalHight(refs, limit) {
      let totalHeight = 0;
      for (let i = 0; i <= limit; i++) {
        totalHeight += refs[i].$el.clientHeight;
      }
      return totalHeight;
    },
    toggleContent(idx) {
      
      // タイトル一覧画面(コンテンツが閉じているとき)でクリックしたタイトル要素までのheightを保存
      if (!this.isOpenContent[idx]) {
        const titleDOM = this.$refs.title;
        this.totalTitleHeight = this.culcTotalHight(titleDOM, idx)
      }

      // コンテンツを閉じる処理 
      // タイトル一覧へ戻った時の位置の調整
      if (this.isOpenContent[idx]) { 
        this.contentIsOpenInit();
        this.adjustScroll();
        return;
      }

      // ブラウザのトップへ移動
      const headerHeight = this.c_Height.header
      scrollTo(0, headerHeight);

      // クリックされたコンテンツを開く
      const open = true
      this.isOpenContent.splice(idx, 1, open);
      this.isOpenTitle = this.isOpenContent;
    },
    contentIsOpenInit() {
      const fillFlase = Array(this.blogs.length).fill(false);
      const fillTrue = Array(this.blogs.length).fill(true);

      this.isOpenContent = fillFlase;
      this.isOpenTitle = fillTrue
    },
    scrollWindow() {
      const top = 500 // retrunTopボタンを表示させたい位置
      this.scroll = window.scrollY
      if (top <= this.scroll) {
        this.topReturnBtnActive = true
      } else {
        this.topReturnBtnActive = false
      }
    },
    adjustScroll() {
      const adjust_Y = 100;
      scrollTo({
        top: this.totalTitleHeight + adjust_Y,
        behavior: 'smooth'
      })
    },
    judgeBaseURL() {
      if (location.href.includes('localhost') ||
          location.href.includes('192')) {
        this.baseURL = "http://localhost:3030"
      } else {
        this.baseURL = "https://sukeo.live-on.net";
      }
    }
  },
  created() {
    this.judgeBaseURL();
    this.fetchBlog();
  },
  mounted() {
    // returnTopBtnの表示条件に使用
    window.addEventListener('scroll', this.scrollWindow)
  },
  updated() {
    Prism.highlightAll();
    this.isLoader = false
  },
  watch: {
    scroll: function(amount) {
      if (amount + window.innerHeight + this.c_Height.footer > document.body.clientHeight) {
        this.isStopBeforeFooter = true;
      } else {
        this.isStopBeforeFooter = false;
      }
    }
  }
};
</script>

<style scoped>
/* fadeoutのみ */
.fade-leave-active {
  transition: opacity 1.5s;
}
.fade-leave-to {
  opacity: 0;
}

/* fadeinのみ */
.fadein-enter-active {
  transition: opacity .5s;
}
.fadein-enter {
  opacity: 0;
}

/* fadeinしてfadeout */
.fadeinout-enter-active, .fadeinout-leave-active {
  transition: opacity 1s;
}
.fadeinout-enter, .fadeinout-leave-to {
  opacity: 0;
}


.loader {
  position: absolute;
  z-index: 1000;
  /* margin: 0 auto; */
  left: 45%;
}
.mask {    
  position: absolute;
  z-index: 100;
  top: 300px;
  left: 0;
  width: 100vw;
  height: 2000px;
  background: white;
}
</style>