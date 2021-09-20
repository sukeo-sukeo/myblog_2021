<template>
  <div class="content">
    <div>
      <small class="chip" v-for="(count, key) in tags" :key="key">
        <a class="archive archive_category">{{key}}</a>
      </small>
    </div>
    <div>
      <ul :class="`archive_post_${key.trim()}`" v-for="(count, key) in tags" :key="key">
        <li class="archive archive_title" @click="$emit('tag-click', key)">
          <a>{{key}}({{count}})</a>
        </li>
        <ul>
          <li class="archive archive_post" v-for="blog in blogs" :key="blog.uid">
            <a @click="$emit('title-click', getIdx(blog.uid)); $emit('title-click2')"
            >
              {{blog.tag.indexOf(key) !== -1 ? '▶ ' + blog.title : "" | cut_gdid}}
            </a>
          </li>
        </ul>
        <hr>
      </ul>
    </div>
    
  </div>
</template>

<script>
export default {
  name: "ResultTag",
  data: () => ({
    tags: Object
  }),
  props: {
    blogs: [Array, Object],
  },
  methods: {
    createCountData() {
      const tags = this.blogs.map(blog => blog.tag.split(","));
      
      const count = tags.flat().reduce((prev, current) => {
          prev[current.trim()] = (prev[current.trim()] || 0) + 1;
        return prev;
      }, {});

      console.log(count);
      this.tags = count;
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