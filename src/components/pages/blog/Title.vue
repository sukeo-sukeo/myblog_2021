<template>
  
  <div class="card hoverable row" :class="{horizontal: !isMovileView}">
    
    <div class="card-image col s12 m4">
      <img class="responsive-img" :src="`data:image/png;base64,${blogData.thumImg}`">
      <span v-show="judgeNewContent()" class="new badge pulse red new_badge"></span>
      <span class="badge grey white-text  category_badge"
      @click="$emit('category-click',blogData.category)"
      >
        {{ blogData.category }}
      </span>
    </div>

    <div class="card-staced col s12 m8">
      <h5 class="blog_title"
       @click="$emit('title-click')"
       >{{ blogData.title | cut_gdid }}</h5>
      <at-times :blogData="blogData"></at-times>

      <div class="divider"></div>
      
      <blog-tags class="blog_tags" :blogData="blogData"
      @tag-click="$listeners['tag-click']"
      ></blog-tags>
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
    isMovileView: Boolean
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
.card-image img {
  height: 200px;
  margin: 0 auto;
  object-fit: contain;
}
.card-image::after {
  position: absolute;
  content: '';
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  box-shadow: inset 0 0 15px 15px white;
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
.category_badge {
  position: absolute;
  top: 0;
  left: 10px;
  z-index: 10;
  margin: 5px;
}
.category_badge:hover, .blog_title:hover {
  text-decoration: underline;
}

.material-icons {
  vertical-align: bottom;
}

</style>