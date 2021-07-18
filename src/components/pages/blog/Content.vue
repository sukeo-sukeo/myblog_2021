<template>
  <section class="content" :class="{content_movile: isMovileView}">

    <at-times :blogData="blogData"></at-times>

    <h4>{{ blogData.title }}</h4>
    <blog-tags :blogData="blogData"></blog-tags>
    <vue-markdown class="markdown">
      {{ blogData.content }}
    </vue-markdown>
  </section>
</template>

<script>
import VueMarkdown from "vue-markdown";
import AtTimes from "../../atoms/AtTimes";
import BlogTags from "../../atoms/BlogTags";

export default {
  name: "ContentCard",
  components: {
    VueMarkdown,
    AtTimes,
    BlogTags
  },
  props: {
    blogData: [Object, Array],
    isMovileView: Boolean
  },
  methods: {
  
  },
  updated() {
  },
};
</script>

<style scoped>
.content {
  background: white;
  padding: 30px 50px;
  border-radius: 5px;
}
.content_movile {
  padding: 30px 10px;
}
.content >>> img {
  width: 100%;
}
.content > h4 {
  margin-top: 0;
  font-weight: bold;
}
.content > .divider {
  margin-bottom: 10px;
}
/* md→html パース後のブログ記事へのCSS */
.markdown >>> p {
  font-size: 16px;
}
.markdown >>> a {
  text-decoration: underline;
  color: #0000EE
}
.markdown >>> h1 {
  font-size: 24px;
  font-weight: bold;
}
.markdown >>> blockquote {
  color: gray;
}
.markdown >>> code:not(pre > code) {
  background-color: lightgray;
  padding: 2px 5px;
  border-radius: 5px;
}

</style>