<template>
  <div class="card hoverable horizontal" @click="$emit('title-click')">

    <div class="card-image">
      <img class="responsive-img" :src="`data:image/png;base64,${blogData.thumImg}`">
    </div>

    <div class="card-staced">
      <div>
        <h5>{{ blogData.title }}</h5>
        <small>{{ blogData.createdAt }}</small>
      </div>
      <div class="divider"></div>
      <div class="blog_tags hide-on-small-only">
        <small class="chip" v-for="tag in blogData.tag.split(',')" :key="tag">{{tag}}</small>
      </div>
    </div>

  </div>
</template>

<script>

export default {
  name: "TitleCard",
  components: {
   
  },
  data: () => ({
    
  }),
  props: {
    blogData: [Object, Array],
  },
  methods: {
    
  },
  created() {
    
  },
  mounted() {
  },
  updated() {
    
  },
};
</script>

<style scoped>
.card {
  padding: 2%;
  cursor: pointer;
}
.card-image {
  width: 300px;
  min-width: 150px;
}
.card-staced {
  padding-left: 2%;
}
.blog_tags {
  margin-top: 10px;
}
</style>