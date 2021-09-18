<template>
<!-- ねじこんだ形での実装... -->
<!-- ルーティングの方法に改善が必要... -->
  <nav class="bread_wrapper">
    <div class="nav-wrapper row red">
      <div class="col s12">
        <span class="breadcrumb"
        :class="{movile_fontsize: isMovileView}"
        v-for="(bread, key) in breads" :key="bread"
        @click="routingView(key, bread)"
        >{{ bread | cut_gdid }}</span>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'BreadCrumbs',
  props: {
    // 各_Page.vueからパンくずリストのデータが渡されます
    breads: [Array, Object],
    isMovileView: Boolean
  },
  methods: {
    routingView(key, bread) {
      switch (key) {
        case "root":
          this.$eventHub.$emit('blogtag-click')
          break;
        case "sub":

          switch (bread) {
            case "BLOG":
              this.$emit('title-click');
              break;
            case "PRODUCT":
              // this.$router.push('/product');
              break;
            case "CONTACT":
              // this.$router.push('/product');
              break;
            case "PROFILE":
              // this.$router.push('/product');
              break;
          }
          break;

        case "category":
          this.$emit('category-click', bread);
          break;
        case "title":
          break;
        default:
          location.reload();
          break;
      }
    }
  },
  mounted() {
  }
}
</script>

<style scoped>
.bread_wrapper {
  height: 30px;
  line-height: 30px;
  margin-bottom: 10px;
}
.movile_fontsize {
  font-size: 12px;
}
.breadcrumb:before {
  margin: 0 5px 0 4px;
}

.breadcrumb {
  cursor: pointer;
}
</style>