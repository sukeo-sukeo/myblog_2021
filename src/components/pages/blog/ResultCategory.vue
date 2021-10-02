<template>
  <div class="content">
    <!-- <search-box
    :searchType="searchType"
    :blogs="blogs"
    ></search-box> -->
    <ul>
      <li @click="moveto" :class="`archive_post_${key.trim()}`" v-for="(count, key) in categorys" :key="key">
        <a class="archive archive_category">{{key}}</a>
      </li>
    </ul>
    <div>
      <ul ref="movetoContainer"
      :class="`archive_post_${key.trim()}`"
      class="z-depth-2 archive_head"
      v-for="(count, key) in categorys" :key="key">
        <li class="archive archive_title" @click="$emit('category-click', key)">
          <a><h5>{{key}}({{count}})</h5></a>
        </li>
        <template v-for="blog in blogs">
          <li :key="blog.uid" 
        class="archive archive_post"
        v-if="blog.category === key">
            <a @click="$emit('title-click', getIdx(blog.uid)); $emit('title-click2')">
              {{blog.title | cut_gdid | add_pref}}
            </a>
          </li>
        </template>
      </ul>
    </div>
    
  </div>
</template>

<script>
// import SearchBox from "./SearchBox";

export default {
  name: "ResultCategory",
  // components: {SearchBox},
  data: () => ({
    categorys: Object
  }),
  props: {
    blogs: [Array, Object],
    searchType: String
  },
  methods: {
    createCountData() {
      const categorys = this.blogs.map(blog => blog.category);
      const count = categorys.reduce((prev, current) => {
        prev[current] = (prev[current] || 0) + 1;
        return prev;
      }, {});

      this.categorys = count;
    },
    getIdx(uid) {
      const idx = this.blogs.map(blog => blog.uid).indexOf(uid);
      return idx
    },
    moveto(e) {
      const moveto = e.target.parentNode.className;
      const refs = this.$refs.movetoContainer;
      const [targetContainer] = refs.filter(ref => {
        const classNameArry = ref.className.split(" ");
        return classNameArry.slice(-1)[0] === moveto
      })
      scrollTo({
        top: targetContainer.offsetTop,
        behavior: 'smooth'
      });
    }
  },
  mounted() {
    this.createCountData();
  }
}
</script>

<style scoped>
.archive {
  cursor: pointer;
}
.archive:hover {
  text-decoration: underline;
}
.archive_category {
  color: #0000EE;
}
.archive_post {
  margin: 20px 0 10px 30px;
}
.archive_head {
  margin: 20px 0px;
  padding: 15px;
  border-radius: 5px;
}
</style>