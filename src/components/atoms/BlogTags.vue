<template>
  <div>
    <small class="chip" 
    v-for="tag in blogData.tag.split(',')" :key="tag"
    @click="$emit('tag-click', tag)"
    >{{tag}}</small>
  </div>
</template>

<script>
export default {
  name: 'BlogTags',
  props: {
    blogData: [Array, Object]
  }
}
</script>

<style scoped>
.chip {
  cursor: pointer;
}
.chip:hover {
  text-decoration: underline;
}
</style>