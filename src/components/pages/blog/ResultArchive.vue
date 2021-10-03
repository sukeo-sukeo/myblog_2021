<template>
  <div class="content">
    <!-- <search-box
    :searchType="searchType"
    :blogs="blogs"
    ></search-box> -->
    <ul :class="`archive_post_${key.trim()}`" v-for="(count, key) in ctimes" :key="key">
      <li>
        <a class="archive archive_year"
        @click="$emit('ctime-click', key)"
        >{{key}}年({{count[key]}})</a>
      </li>

      <template v-for="(count2, key2) in ctimes[key]">
        <ul class="archive_head z-depth-2" 
        v-if="key2.length === 2"
        :key="key2">
          <li class="archive archive_title"
          @click="$emit('ctime-click', key2)">
            <a><h5>{{key2}}月({{count2}})</h5></a>
          </li>
          <template v-for="blog in blogs">
            <li class="archive archive_post"
            v-if="blog.createdAt.split('-')[1].indexOf(key2) !== -1"
            :key="blog.uid">
              <a @click="$emit('title-click', getIdx(blog.uid)); $emit('title-click2')"
              >
                {{blog.title | cut_gdid | add_pref}}
                <span class="grey-text"> - </span>
                <span class="grey-text">
                {{blog.createdAt.replace(/-/g, "/")}}
                </span>
              </a>
            </li>
          </template>
          <!-- <div class="divider"></div> -->
        </ul>
      </template>
  
    </ul>
    
  </div>
</template>

<script>
// import SearchBox from "./SearchBox";

export default {
  name: "ResultArchive",
  // components: {SearchBox},
  data: () => ({
    ctimes: Object
  }),
  props: {
    blogs: [Array, Object],
    searchType: String
  },
  methods: {
    createCountData() {
      const ctimes = this.blogs.map(blog => blog.createdAt);
      // yyyy-mm-dd
      // console.log(ctimes);
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
    },
  },
  mounted() {
    this.createCountData();
  }
}
</script>

<style scoped>
.archive {
  cursor: pointer;
  width: fit-content;
}
.archive:hover {
  text-decoration: underline;
}
.archive_year {
  color: #0000EE;
}
.archive_post {
  margin: 20px 0 10px 30px;
}
.archive_head {
  margin: 20px;
  padding: 15px;
  border-radius: 5px;
}
</style>