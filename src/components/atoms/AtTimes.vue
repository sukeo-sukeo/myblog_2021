<template>
  <div class="row at_times">
    <span class="col"><i class="tiny material-icons grey-text">text_snippet</i>{{ blogData.createdAt.split('T')[0] }}に公開</span>
    <span class="col"><i class="tiny material-icons grey-text">update</i>{{ blogData.modifidAt.split('T')[0] }}に更新されています</span>
  </div>
</template>

<script>
export default {
  name: 'AtTimes',
  props: {
    blogData: [Array, Object]
  }
}
</script>

<style scoped>
.at_times {
  margin-bottom: 5px;
  display: flex;
  align-items: baseline;
}
.at_times > span {
  display: flex;
  align-items: center;
}
</style>