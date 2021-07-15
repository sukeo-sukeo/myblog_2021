<template>
  <div>
    <small class="chip" v-for="tag in blogData.tag.split(',')" :key="tag">{{tag}}</small>
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

<style>

</style>