<template>
  <span class="material-icons" :class="addClass">{{iconName}}</span>
</template>

<script>
export default {
  name: "MtICon",
  props: {
    iconName: String,
    addClass: String,
  }
}
</script>

<style>

</style>