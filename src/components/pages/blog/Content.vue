<template>
  <section class="content" :class="{content_movile: isMovileView}">

    <at-times :blogData="blogData"></at-times>

    <h4>{{ blogData.title | cut_gdid }}</h4>
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
  mounted() {
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
  line-height: 1.8;
}
.content_movile {
  padding: 30px 10px;
  padding-bottom: 100px;
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
/* .markdown >>> p {
  font-size: 18px;
} */
.markdown >>> a {
  text-decoration: underline;
  color: #0000EE
}
.markdown >>> li {
  list-style: inside;
  /* font-size: 18px; */
}
.markdown >>> h1 {
  margin-top: 100px;
  font-size: 36px;
  font-weight: bold;
  filter: drop-shadow(2px 4px 6px wheat);
}
.markdown >>> h2 {
  font-size: 24px;
  font-weight: bold;
}
.markdown >>> h3 {
  font-size: 20px;
  font-weight: bold;
}
.markdown >>> strong {
  font-weight: bold;
  font-size: 18px;
}
.markdown >>> blockquote {
  color: rgb(167, 161, 161);
}
.markdown >>> code:not(pre > code) {
  background-color: lightgray;
  padding: 2px 5px;
  border-radius: 5px;
}

</style>