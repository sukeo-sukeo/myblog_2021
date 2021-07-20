<template>
  <nav class="nav-extended white">
    <div class="nav-content row">
      <ul class="tabs tabs-transparent valign-wrapper">
        <router-link v-for="route in routeData" :key="route.path"
        :to="route.path"
        class="tab col s3 grey-text text-darken-4"
        >
          {{ route.name }}
        </router-link>
      </ul>
    </div>  
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
  props: {
    routeData: Array
  },
  mounted() {
  }
}
</script>

<style>

</style>