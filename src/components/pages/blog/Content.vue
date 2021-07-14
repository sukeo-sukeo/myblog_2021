<template>
  <section class="content">
    <div class="divider"></div>
    <div class="row at_times">
      <span class="col"><i class="tiny material-icons grey-text">text_snippet</i>{{ blogData.createdAt.split('T')[0] }}</span>
      <span class="col"><i class="tiny material-icons grey-text">update</i>{{ blogData.modifidAt.split('T')[0] }}</span>
    </div>
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
.at_times {
  margin-bottom: 5px;
  display: flex;
  align-items: baseline;
}
</style>