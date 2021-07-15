<template>
  <div id="blogContainer">
      
      <loader-circle class="loader" v-if="isLoader"></loader-circle>

      <transition name="fade">
        <div v-if="isLoader" class="mask"></div>
      </transition>

      <section v-for="(blog, idx) in blogs" :key="blog.uid">
      
        <title-card
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
   
  </div>
</template>

<script>
import axios from "axios";
import TitleCard from "./Title";
import ContentCard from "./Content";
import LoaderCircle from "../../atoms/LoaderCircle";
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
    LoaderCircle
  },
  data: () => ({
    blogs: Array,
    isOpenTitle: [],
    isOpenContent: [],
    isLoader: true
  }),
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

      this.contentIsOpenInit();
    },
    toggleContent(idx) {
      if (this.isOpenContent[idx]) {
        this.contentIsOpenInit();
        return;
      }

      scrollTo(0, 300);

      this.isOpenContent.splice(idx, 1, !this.isOpenContent[idx]);
      this.isOpenTitle = this.isOpenContent;
    },
    contentIsOpenInit() {
      this.isOpenContent = Array(this.blogs.length).fill(false);
      this.isOpenTitle = Array(this.blogs.length).fill(true);
    }
  },
  created() {
    this.fetchBlog();
  },
  mounted() {
   
  },
  updated() {
    Prism.highlightAll();
    this.isLoader = false
  },
};
</script>

<style scoped>
.fade-leave-active {
  transition: opacity 1.5s;
}
.fade-leave-to {
  opacity: 0;
}
.fadein-enter-active {
  transition: opacity .5s;
}
.fadein-enter {
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