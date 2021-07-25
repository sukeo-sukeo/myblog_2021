<template>
   <div class="row">
     <ul class="collection with-header">
        <li class="collection-header">
          <h4>{{repoData.name}}</h4>
        </li>
        <li class="collection-item">
          {{repoData.description}}
        </li>
        <li class="collection-item">
          <span>ソースを見る  </span>
          <a :href="repoData.url" target="_blank">{{ repoData.url }}</a>
        </li>
        <li class="collection-item">
          <span>さわってみる  </span>
          <a :href="repoData.siteUrl" target="_blank">{{ repoData.siteUrl }}</a>
        </li>
        <li class="collection-item">
          {{ repoData.updatedAt }}
        </li>
        <li class="collection-item">
          <a :href="`https://github.com/sukeo-sukeo/${repoData.name}/blob/main/readme.md`" target="_blank">readme</a>
        </li>
     </ul>
   </div>
</template>

<script>
export default {
  name: "RepoCard",
  data: () => ({
  }),
  props: {
    repoData: [Array, Object],
    isMovileView: Boolean
  },
  methods: {
  }
}
</script>

<style>

</style>