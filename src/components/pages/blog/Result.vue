<template>
  <div>
    <!-- <h6>{{searchType}}検索</h6> -->
    <result-category
     v-if="searchType === 'category'"
     :blogs="blogs"
     @category-click="$listeners['category-click']"
     @title-click="$listeners['title-click']"
     @title-click2="$listeners['search-tofalse']"
     ></result-category>

    <result-tag
     v-if="searchType === 'tag'"
     :blogs="blogs"
     @tag-click="$listeners['tag-click']"
     @title-click="$listeners['title-click']"
     @title-click2="$listeners['search-tofalse']"
     ></result-tag>
    
    <result-archive v-if="searchType === 'archive'"
    :blogs="blogs"
    @ctime-click="$listeners['ctime-click']"
    @title-click="$listeners['title-click']"
    @title-click2="$listeners['search-tofalse']"
    ></result-archive>

  </div>
</template>

<script>
import ResultCategory from "./ResultCategory";
import ResultTag from "./ResultTag";
import ResultArchive from "./ResultArchive";

export default {
  name: "ResultPage",
  data: () => ({
  }),
  props: {
    searchType: [String, Function],
    isMovileView: Boolean,
    blogs: [Array, Object, Function],
    blogsOrigin: [Array, Object, Function],
  },
  components: {
    ResultCategory, ResultTag, ResultArchive
  },
  methods: {
  },
  mounted() {
    // this.$emit("title-click", idx);
    //   this.$emit("on-search-tofalse");
    // console.log(this.searchType);
  }
}
</script>

<style scoped>
result-category, .content {
  background: white;
  padding: 30px 50px;
  border-radius: 5px;
  line-height: 1.8;
}
</style>