<template>
  <div>
    <category-result
     v-if="searchType === 'category'"
     :blogs="blogs"
     @blogtitle-click="getIdxAndEmit"
     ></category-result>
    <tag-result v-if="searchType === 'tag'"></tag-result>
    <archive-result v-if="searchType === 'archive'"></archive-result>
  </div>
</template>

<script>
import CategoryResult from "./Category";
import TagResult from "./Tag";
import ArchiveResult from "./Archive";

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
    CategoryResult, TagResult, ArchiveResult
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