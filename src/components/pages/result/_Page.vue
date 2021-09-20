<template>
  <div>
    <result-category
     v-if="searchType === 'category'"
     :blogs="blogs"
     @blogtitle-click="getIdxAndEmit"
     ></result-category>
    <result-tag v-if="searchType === 'tag'"></result-tag>
    <result-archive v-if="searchType === 'archive'"></result-archive>
  </div>
</template>

<script>
import ResultCategory from "./ResultCategory";
import ResultTag from "./ResultTag";
import ResultArchive from "./ResultArchive";

export default {
  name: "ResultPage",
  data: () => ({
    blogs: Array,
    blogsOrigin: Array,
  }),
  props: {
    searchType: [String, Function],
    isMovileView: Boolean
  },
  components: {
    ResultCategory, ResultTag,ResultArchive
  },
  methods: {
    receiveBlogData(data) {
      console.log(data);
      this.blogs = data
      this.blogsOrigin = data
    },
    getIdxAndEmit(uid, category) {
      const idx = this.blogs.map(blog => blog.uid).indexOf(uid)
      this.$eventHub.$emit("oneBlog-get", idx, "result");
      // console.log(category);
      this.$eventHub.$emit("category-push", category, "result");
      // console.log(category);
      this.$emit("on-search-tofalse");
    }
  },
  mounted() {
    // blog/_Page.vueでfetchしたブログデータを受信
    this.$eventHub.$on("fetch-blog", this.receiveBlogData)
    // console.log(this.searchType);
  }
}
</script>

<style scoped>

</style>