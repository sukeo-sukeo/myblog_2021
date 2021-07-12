<template>
  <a :href="iconName.url" target="_blank">
    <span class="iconify" data-inline="false" :data-icon="iconName.logo"></span>
  </a>
</template>

<script>
export default {
  name: 'IconBtn',
  props: {
    iconName: [Object, Array]
  }
}
</script>

<style>

</style>