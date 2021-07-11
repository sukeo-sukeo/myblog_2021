<template>
  <section class="content">
    <div class="divider"></div>
    <span>{{ blogData.createdAt }}</span>
    <h3>{{ blogData.title }}</h3>
    <vue-markdown>
      {{ blogData.content }}
    </vue-markdown>
  </section>
</template>

<script>
import VueMarkdown from "vue-markdown";

export default {
  name: "ContentCard",
  components: {
    VueMarkdown,
  },
  props: {
    blogData: [Object, Array],
  },
  methods: {
  
  },
  updated() {
  },
};
</script>

<style scoped>
.content >>> img {
  width: 100%;
}
.content > h3 {
  margin-top: 0;
}
.content > .divider {
  margin-bottom: 10px;
}
</style>