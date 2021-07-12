<template>
  <div id="blogContainer">
      
      <section v-for="(blog, idx) in blogs" :key="blog.uid">
      
      <title-card
        :blogData="blog"
        @title-click="toggleContent(idx)"
        v-show="isOpenTitle[idx]"
      ></title-card>

      <content-card
        :blogData="blog"
        v-show="isOpenContent[idx]"
      ></content-card>
    
      </section>
   
  </div>
</template>

<script>
import axios from "axios";
import TitleCard from "./Title";
import ContentCard from "./Content";
import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-markdown";
// import "prismjs/themes/prism.css";
import "prismjs/themes/prism-twilight.css";

export default {
  name: "BlogPage",
  components: {
    TitleCard,
    ContentCard,
  },
  data: () => ({
    blogs: Array,
    isOpenTitle: [],
    isOpenContent: [],
    isOpenCarousel: false
  }),
  methods: {
    async fetchBlog() {
      const URL = "http://localhost:3030";
      // const URL = 'https://sukeo.live-on.net';
      const blogs = await axios.get(`${URL}/node`).then((res) => res.data);

      console.log(blogs);
      this.blogs = blogs;

      this.contentIsOpenInit();
    },
    toggleContent(idx) {
      if (this.isOpenContent[idx]) {
        this.contentIsOpenInit();
        this.isOpenCarousel = false;
        return;
      } 
      this.isOpenContent.splice(idx, 1, !this.isOpenContent[idx]);
      this.isOpenTitle = this.isOpenContent;
      this.isOpenCarousel = true;
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
  },
};
</script>

<style>
</style>