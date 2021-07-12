<template>
  <div class="card hoverable horizontal" @click="$emit('title-click')">

    <div class="card-image">
      <img class="responsive-img" :src="`data:image/png;base64,${blogData.thumImg}`">
      <span v-if="judgeNewContent" class="new badge pulse red new_badge"></span>
    </div>

    <div class="card-staced">
      <div>
        <h5>{{ blogData.title }}</h5>
        <small>{{ blogData.createdAt }}</small>
      </div>
      <div class="divider"></div>
      <div class="blog_tags">
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
  computed: {
    judgeNewContent() {
      console.log('return boolean');
      return true
    }
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
  position: relative;
}
.card-staced {
  padding-left: 2%;
}
.blog_tags {
  margin-top: 10px;
}
.new_badge {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 10;
  margin: 5px;
}

</style>