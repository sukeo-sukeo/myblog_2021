<template>
  <section class="content" :class="{content_movile: isMovileView}">

    <at-times :blogData="blogData"></at-times>

    <h4>{{ blogData.title | cut_gdid }}</h4>
    <blog-tags 
    :blogData="blogData"
    @tag-click="$listeners['tag-click']"
    ></blog-tags>
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

.content >>> p:first-child > img {
  width: 100%;
  margin: 0;
}

.content >>> img {
  width: 80%;
  margin: 50px 0 50px 10%;
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
.markdown >>> hr {
  height: 5px;
  background-image: linear-gradient(to right, transparent, wheat, transparent);
  border: none;
}
.markdown >>> a {
  text-decoration: underline;
  color: #0000EE
}
.markdown >>> ul > li {
  list-style: inside;
}
/* .markdown >>> ul > li::marker {
  margin-right: 0 !important;
} */
.markdown >>> h1 {
  margin-top: 70px;
  font-size: 36px;
  font-weight: bold;
  filter: drop-shadow(2px 4px 6px wheat);
  width: fit-content;
  border-left: 8px solid wheat;
  border-bottom: 3px solid wheat;
  width: auto;
  padding-left: 10px;
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
.markdown >>> tr > td:first-child {
  width: 100px;
  background-color: wheat;
  text-align: center;
  font-weight: bold;
}
.markdown >>> tr > td:not(td:first-child) {
  padding-left: 20px;
}

</style>