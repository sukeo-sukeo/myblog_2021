<template>
  <div id="blogContainer">
     
      <loader-circle class="loader" v-if="isLoader"></loader-circle>

      <transition name="fade">
        <div v-if="isLoader" class="mask"></div>
      </transition>

      <section v-for="(blog, idx) in blogs" :key="blog.uid">

        <bread-crumbs v-show="isOpenContent[idx]"
        @title-click="toggleContent(idx)"
        @category-click="getCategoryBlog"
        :isMovileView="isMovileView"
        :breads="createBreadData(blog)"></bread-crumbs>
  
        <title-card
          ref="title"
          :blogData="blog"
          :isMovileView="isMovileView"
          @title-click="toggleContent(idx)"
          v-show="showTitle"
        ></title-card>

        <transition name="fadein">
          <content-card
           ref="content"
           :blogData="blog"
           :isMovileView="isMovileView"
           v-show="isOpenContent[idx]"
          ></content-card>
        </transition>
  
        
      </section>
      
      <transition name="fadeinout">
        <any-btn
        @title-click="toggleContent(idx)"
        :btnIcon="`first_page`"
        :btnSize="`btn-small`"
        :event="`backView`"
        :positionX="90" 
        :positionY="93" 
        :btnColor="`grey lighten-1`" :c_Height="c_Height" :isStop="isStopBeforeFooter" 
        v-if="isOpenContent[idx]"
        v-show="topReturnBtnActive"></any-btn>
      </transition>

      <transition name="fadeinout">
        <any-btn 
        :btnIcon="`arrow_upward`"
        :event="`returnTop`"
        :positionX="5" 
        :positionY="5" 
        :btnColor="`red`" :c_Height="c_Height" :isStop="isStopBeforeFooter" v-show="topReturnBtnActive"></any-btn>
      </transition>

  </div>
</template>

<script>
import TitleCard from "./Title";
import ContentCard from "./Content";
import BreadCrumbs from "../../common/BreadCrumbs";
import LoaderCircle from "../../atoms/LoaderCircle";
import AnyBtn from "../../atoms/AnyBtn";
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
    AnyBtn,
    BreadCrumbs
  },
  data: () => ({
    blogs: Array,
    blogsOrigin: Array, 
    // isOpenTitle: [],
    isOpenContent: [],
    showTitle: true,
    isLoader: true,
    totalTitleHeight: 0,
    idx: Number,
  }),
  props: {
    c_Height: [Array, Object, Function],
    isMovileView: Boolean,
    topReturnBtnActive: Boolean,
    isStopBeforeFooter: Boolean,
    routeData: Array,
    baseURL: String,
  },
  methods: {
    async fetchBlog() {
      const blogs = await this.$axios.get(`${this.baseURL}/node`).then((res) => res.data);

      // console.log(blogs);
      this.blogs = blogs;
      this.blogsOrigin = blogs;

      //コンテンツの開閉状態を初期化
      this.contentIsOpenInit();
    },
    getCategoryBlog(bread = "") {
      const category = bread;
      // 引数なし = 全件表示
      if (category === "") {
        this.blogs = this.blogsOrigin;
      } else {
        // 引数あり = 引数(カテゴリ)のみ表示
        this.blogs = this.blogs.filter(blog => blog.category === category);
      }
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
      this.idx = idx;
      // topからタイトル要素までのheightを保存
      if (!this.isOpenContent[idx]) {
        const titleDOM = this.$refs.title;
        this.totalTitleHeight = this.culcTotalHight(titleDOM, idx)
      }

      // コンテンツを閉じる処理
      if (this.isOpenContent[idx]) {
        this.closeContent();
        return;
      }

      // ヘッダーの下へ移動
      const headerHeight = this.c_Height.header
      scrollTo(0, headerHeight);

      // クリックされたコンテンツを開く
      const open = true
      this.isOpenContent.splice(idx, 1, open);
      this.showTitle = false;
      // this.isOpenTitle = this.isOpenContent;
    },
    contentIsOpenInit() {
      const fillFlase = Array(this.blogs.length).fill(false);
      // const fillTrue = Array(this.blogs.length).fill(true);

      this.isOpenContent = fillFlase;
      this.showTitle = true;
      // this.isOpenTitle = fillTrue
    },
    closeContent() {
      // 戻った時の位置の調整
      this.adjustScroll();
      this.contentIsOpenInit();
    },
    adjustScroll() {
      const adjust_Y = 150;
      scrollTo({
        top: this.totalTitleHeight + adjust_Y,
        behavior: 'smooth'
      })
    },
    createBreadData(blog) {
      return {
        root: 'HOME',
        sub: this.routeData[0].name.toUpperCase(),
        category: blog.category,
        title: blog.title.length >= 30? blog.title.slice(0,30) + "..." : blog.title
      }
    },
    getCommnets() {
      const contentRef = this.$refs.content;
      const mdContents = contentRef.map(ref => ref.$el.lastChild);
      const comments = mdContents.map(mdContent => {
        const nodes = mdContent.childNodes; 
        return [...nodes].filter(node => node.nodeType === 8);
      });
      
      // 以下コメントをトリガーとした追加機能の記述場所

      // fiexdコメントの場所にdiv要素を挿入
      this.replaceFixedCommentToDiv(comments);
    },
    replaceFixedCommentToDiv(commentsList) {
      const fixedCommentsList = commentsList.map(comments => comments.filter(comment => comment.data.trim() === "fixed"));
      
      fixedCommentsList.forEach(fixedComments => {
        fixedComments.forEach((fixedComment, idx) => {
          const div = document.createElement('div');
          div.classList.add(`fixed`, `fixed_${idx}`);
          fixedComment.replaceWith(div);
        })
      })
    }
  },
  created() {
    this.fetchBlog();
  },
  mounted() {
    this.$eventHub.$on("blogtag-click", this.getCategoryBlog);
    // 'HOME', this.routeData[0].name.toUpperCase(), blog.category , blog.title]
    // mounted直後ではHTMLCollectionがうまくとれなかったので少し遅延させる
    // updatedで複数回呼ばれていたの気になったので
    setTimeout(() => this.getCommnets(), 500);
  },
  updated() {
    Prism.highlightAll();
    this.isLoader = false;
  },
  watch: {
  }
};
</script>

<style scoped>


</style>