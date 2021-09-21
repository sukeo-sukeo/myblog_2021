<template>
  <div class="content">
    <ul :class="`archive_post_${key.trim()}`" v-for="(count, key) in ctimes" :key="key">
      <div v-if="key.length !== 4" class="divider"></div>
      <li class="archive archive_title" @click="$emit('ctime-click', key)">
        <a>{{key.length === 2 ? key + "月": key}}({{count}})</a>
      </li>
      <ul>
        <li class="archive archive_post" v-for="blog in blogs" :key="blog.uid">
          <template v-if="blog.createdAt.split('-')[1].indexOf(key) !== -1">
            <a @click="$emit('title-click', getIdx(blog.uid)); $emit('title-click2')"
            >
              {{`${blog.title} - ${blog.createdAt.replace(/-/g, "/")}` | cut_gdid | add_pref}}
            </a>
          </template>
        </li>
      </ul>
    </ul>
    
  </div>
</template>

<script>
export default {
  name: "ResultArchive",
  data: () => ({
    ctimes: Object
  }),
  props: {
    blogs: [Array, Object],
  },
  methods: {
    createCountData() {
      const ctimes = this.blogs.map(blog => blog.createdAt);
      // yyyy-mm-dd
      
      const count = ctimes.reduce((prev, current) => {
        const y = current.split("-")[0];
        const m = current.split("-")[1];

        current = y
        prev[current] = (prev[current] || 0) + 1;
        current = m
        prev[current] = (prev[current] || 0) + 1;
    
        return prev;
      }, {});
    
      this.ctimes = count;
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