<template>
  <div class="card hoverable horizontal row" @click="$emit('title-click')">

    <div class="card-image col s4">
      <img class="responsive-img" :src="`data:image/png;base64,${blogData.thumImg}`">
      <span v-show="judgeNewContent()" class="new badge pulse red new_badge"></span>
    </div>

    <div class="card-staced col s8">

      <h5>{{ blogData.title }}</h5>
      <at-times :blogData="blogData"></at-times>

      <div class="divider"></div>
      
      <blog-tags class="blog_tags" :blogData="blogData"></blog-tags>

    </div>

  </div>
</template>

<script>
import AtTimes from "../../atoms/AtTimes";
import BlogTags from "../../atoms/BlogTags";

export default {
  name: "TitleCard",
  components: {
    AtTimes,
    BlogTags
  },
  data: () => ({
    newDays: 3
  }),
  props: {
    blogData: [Object, Array],
  },
  computed: {
  },
  methods: {
    judgeNewContent() {
      // 作成日からの経過時間がnewDays未満の記事に"new"をつける処理
      const nowTime = new Date().getTime();
      const createdTime = new Date(this.blogData.createdAt).getTime();
      const judgeTime = (1000 * 60 * 60 * 24) * this.newDays;
      if ((nowTime - createdTime) < judgeTime) {
        return true
      } else {
        return false
      }
    }
  },
  created() {
    
  },
  mounted() {
  },
  updated() {
    
  },
};
</script>

<style scoped>
.card {
  /* height: 200px; */
  padding: 2%;
  cursor: pointer;
  border-radius: 5px;
}
.card-image {
  width: 300px;
  min-width: 200px;
  position: relative;
}
.card-staced {
  /* height: 100px; */
  padding-left: 2%;
}
.card-staced > h5 {
  min-height: 75px;
}
.blog_tags {
  margin-top: 10px;
}
.new_badge {
  position: absolute;
  top: 0;
  right: 10px;
  z-index: 10;
  margin: 5px;
}

.material-icons {
  vertical-align: bottom;
}
/* .at_times > small:first-child {
  flex: 1;
}
.at_times > small:nth-child(2) {
  text-align: end;
} */
</style>