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
          @title-click="toggleContent(idx)"
          v-show="isOpenTitle[idx]"
        ></title-card>

        <transition name="fadein">
          <content-card
            :blogData="blog"
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
    blogs: Array,
    isOpenTitle: [],
    isOpenContent: [],
    isLoader: true,
    topReturnBtnActive: false,
    scroll: 0,
    isStopBeforeFooter: false,
  }),
  props: {
    c_Height: [Array, Object, Function],
  },
  methods: {
    async fetchBlog() {
      // local
      // const URL = "http://localhost:3030";
      
      // product
      // const URL = 'https://sukeo.live-on.net';

      console.log(process.env.VUE_APP_BASE_URL);
      const URL = process.env.VUE_APP_BASE_URL;
      const blogs = await axios.get(`${URL}/node`).then((res) => res.data);

      console.log(blogs);
      this.blogs = blogs;

      //コンテンツの開閉状態を初期化
      this.contentIsOpenInit();
    },
    toggleContent(idx) {
      if (this.isOpenContent[idx]) { 
        this.contentIsOpenInit();
        const titleDOM = this.$refs.title[idx].$el;
        const adjust_Y = 20;
        this.scrollAdjust(titleDOM, adjust_Y);
        return;
      }

      // header+navの高さへ移動
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
      const top = 500 // ボタンを表示させたい位置
      this.scroll = window.scrollY
      if (top <= this.scroll) {
        this.topReturnBtnActive = true
      } else {
        this.topReturnBtnActive = false
      }
    },
    scrollAdjust(dom, adjust = 0) {
      scrollTo(0, dom.offsetTop - adjust);
    }
  },
  created() {
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
      // console.log(amount);
      // console.log('見えてる高さ', window.innerHeight);
      // console.log('全体の高さ', document.body.clientHeight);
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