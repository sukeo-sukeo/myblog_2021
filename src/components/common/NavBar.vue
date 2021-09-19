<template>
  <nav class="nav-extended white">
    <div class="nav-content row">
      <ul class="tabs tabs-transparent valign-wrapper">
        <router-link v-for="route in routeData"
        @click.native="route.path === '/' ? $eventHub.$emit('blogtag-click') : ''; $emit('navmenu-click')"
        :key="route.path"
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
    routeData: Array,
  },
  methods: {
    // blogsPageInit() {
    //   console.log("すべて表示させる処理emitかな");
    //   this.$emit("blogtag-click");
    //   // すべて表示させる
    //   // パンくずのblogでも同じ処理をさせる
    // }
  },
  mounted() {
  }
}
</script>

<style>

</style>