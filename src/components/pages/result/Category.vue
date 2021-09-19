<template>
  <div class="content">
    <h4>search_box</h4>
    <ul>
      <li :class="`archive_post_${key.trim()}`" v-for="(count, key) in categorys" :key="key">
        <a class="archive_category">{{key}}</a>
      </li>
    </ul>
    <div>
      <ul :class="`archive_post_${key.trim()}`" v-for="(count, key) in categorys" :key="key">
        <li class="archive_title">
          <a>{{key}}({{count}})</a>
        </li>
        <ul>
          <li class="archive_post" v-for="blog in blogs" :key="blog.uid">
              <a @click="$emit('blogtitle-click', blog.uid, blog.category)">{{blog.category === key ? '▶ ' + blog.title : ""}}</a>
          </li>
        </ul>
        <hr>
      </ul>
    </div>
    
  </div>
</template>

<script>
export default {
  name: "CategoryResult",
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
    }
  },
  mounted() {
    this.createCountData();
  }
}
</script>

<style scoped>
.content {
  background: white;
  padding: 30px 50px;
  border-radius: 5px;
  line-height: 1.8;
}

.archive_category {
  color: #0000EE;
}
.archive_post {
   margin-left: 30px;
}
</style>