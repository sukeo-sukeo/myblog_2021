<template>
  <div>
    <input type="text" :placeholder="judegeType"
    v-model="keyWord"
    >
    {{ keyWord }}
  </div>
</template>

<script>
export default {
  name: "SearchBox",
  data: () => ({
    keyWord: ""
  }),
  props: {
    searchType: String,
    blogs: [Object, Array]
  },
  computed: {
    judegeType() {
      let placeholder = String
      if (this.searchType === "archive") {
        placeholder = "日付で検索(YYYY/MM/DD)"
      }
      if (this.searchType === "category") {
        placeholder = "カテゴリで検索"
      }
      if (this.searchType === "tag") {
        placeholder = "タグで検索"
      }
      return placeholder || "検索"
    }
  },
  mounted() {
    console.log(this.blogs);
  }
}
</script>

<style scoped>

</style>