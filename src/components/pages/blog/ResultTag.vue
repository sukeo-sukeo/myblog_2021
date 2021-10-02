<template>
  <div class="content">
    <!-- <search-box
    :searchType="searchType"
    :blogs="blogs"
    ></search-box> -->
    <div>
      <small @click="moveto"
      :class="`archive_post_${key.trim()}`"
       class="chip"
       v-for="(count, key) in tags" :key="key"
       >
        <a class="archive archive_category">{{key}}</a>
      </small>
    </div>
    <div>
      <ul ref="movetoContainer" :class="`archive_post_${key.trim()}`" v-for="(count, key) in tags" :key="key">
        <li class="archive archive_title" @click="$emit('tag-click', key)">
          <a>{{key}}({{count}})</a>
        </li>
        <ul>
          <li class="archive archive_post" v-for="blog in blogs" :key="blog.uid">
            <template v-if="blog.tag.indexOf(key) !== -1">
              <a @click="$emit('title-click', getIdx(blog.uid)); $emit('title-click2')"
              >
                {{blog.title | cut_gdid | add_pref}}
              </a>
            </template>
          </li>
        </ul>
        <div class="divider"></div>
      </ul>
    </div>
    
  </div>
</template>

<script>
// import SearchBox from "./SearchBox";

export default {
  name: "ResultTag",
  // components: {SearchBox},
  data: () => ({
    tags: Object
  }),
  props: {
    blogs: [Array, Object],
    searchType: String
  },
  methods: {
    createCountData() {
      const tags = this.blogs.map(blog => blog.tag.split(","));
      
      const count = tags.flat().reduce((prev, current) => {
          prev[current.trim()] = (prev[current.trim()] || 0) + 1;
        return prev;
      }, {});

      this.tags = count;
    },
    getIdx(uid) {
      const idx = this.blogs.map(blog => blog.uid).indexOf(uid);
      return idx
    },
    moveto(e) {
      const moveto = e.target.parentNode.className.split(" ")[1];
      const refs = this.$refs.movetoContainer;
      const [targetContainer] = refs.filter(ref => ref.className === moveto);
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
</style>