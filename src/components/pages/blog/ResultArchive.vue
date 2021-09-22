<template>
  <div class="content">
    <ul :class="`archive_year archive_post_${key.trim()}`" v-for="(count, key) in ctimes" :key="key">
      <!-- <div v-if="key.length !== 4" class="divider"></div> -->
      <li class="archive archive_title" @click="$emit('ctime-click', key)">
        <a>{{key}}年({{count[key]}})</a>
      </li>

      <ul class="arcive_month" v-for="(count2, key2) in ctimes[key]" :key="key2">
        <template v-if="key2.length === 2">
          <li class="archive archive_title"
          @click="$emit('ctime-click', key2)">
            <a>{{key2}}月({{count2}})</a>
          </li>
          <ul class="archive archive_post" v-for="blog in blogs" :key="blog.uid">
            <template v-if="blog.createdAt.split('-')[1].indexOf(key2) !== -1">
              <li>
                <a @click="$emit('title-click', getIdx(blog.uid)); $emit('title-click2')"
                >
                  {{blog.title | cut_gdid | add_pref}}
                  <span> - </span>
                  {{blog.createdAt.replace(/-/g, "/")}}
                </a>
              </li>
            </template>
          </ul>
        </template>

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
      console.log(ctimes);
      const count = ctimes.reduce((prev, current) => {
        const y = current.split("-")[0];
        const m = current.split("-")[1];

        current = y
        prev[current] = (prev[current] || 0) + 1;
        current = m
        prev[current] = (prev[current] || 0) + 1;
        // console.log(prev);
        return prev;
      }, {});
      
      // yearをkeyにしたobjectに成形
      let obj = {};
      Object.keys(count).forEach(key => key.length === 4 ? obj[key] = count : "")
      // console.log(obj);
      this.ctimes = obj;
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
.archive_month {
  margin: 20px 0 10px 30px;
}
</style>