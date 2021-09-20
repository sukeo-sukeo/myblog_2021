<template>
  <div class="content">
    <ul>
      <li :class="`archive_post_${key.trim()}`" v-for="(count, key) in categorys" :key="key">
        <a class="archive archive_category">{{key}}</a>
      </li>
    </ul>
    <div>
      <ul :class="`archive_post_${key.trim()}`" v-for="(count, key) in categorys" :key="key">
        <li class="archive archive_title" @click="$emit('category-click', key)">
          <a>{{key}}({{count}})</a>
        </li>
        <ul>
          <li class="archive archive_post" v-for="blog in blogs" :key="blog.uid">
              <a @click="$emit('title-click', getIdx(blog.uid)); $emit('title-click2')">{{blog.category === key ? '▶ ' + blog.title : "" | cut_gdid}}</a>
          </li>
        </ul>
        <hr style="color: gray;">
      </ul>
    </div>
    
  </div>
</template>

<script>
export default {
  name: "ResultCategory",
  data: () => ({
    categorys: Object
  }),
  props: {
    blogs: [Array, Object],
  },
  methods: {
    createCountData() {
      const categorys = this.blogs.map(blog => blog.category);
      const count = categorys.reduce((prev, current) => {
        prev[current] = (prev[current] || 0) + 1;
        return prev;
      }, {});

      console.log(count);
      this.categorys = count;
    },
    getIdx(uid) {
      const idx = this.blogs.map(blog => blog.uid).indexOf(uid);
      return idx
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
.archive_category {
  color: #0000EE;
}
.archive_post {
  margin-left: 30px;
}
</style>