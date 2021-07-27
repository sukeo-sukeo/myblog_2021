<template>
   <div class="row">
     <ul class="collection with-header">
        <li class="collection-header">
          <h4>{{repoData.name}}</h4>
        </li>
        <li class="collection-item">
          <dt class="valign-wrapper new badge">
            <mt-icon :iconName="`short_text`"></mt-icon>アプリの説明
          </dt>
          <dd>
            {{repoData.description}}
          </dd>
        </li>
        <li class="collection-item">
          <dt class="valign-wrapper">
            <mt-icon :iconName="`code`"></mt-icon>ソースを見る
          </dt>
          <dd>
            <a :href="repoData.url" target="_blank">{{ repoData.url }}</a>
          </dd>  
        </li>
        <li class="collection-item">
          <dt class="valign-wrapper">
            <mt-icon :iconName="`open_in_new`"></mt-icon>さわってみる
          </dt>
          <dd>
            <a :href="repoData.siteUrl" target="_blank">{{ repoData.siteUrl }}</a>
          </dd> 
        </li>
        <li class="collection-item">
          <dt class="valign-wrapper">
            <mt-icon :iconName="`update`"></mt-icon>更新日
          </dt>
          <dd>{{ repoData.updatedAt }}</dd>
        </li>
        <li class="collection-item">
          <dt class="valign-wrapper">
            <mt-icon :iconName="`notes`"></mt-icon>詳細
          </dt>
          <dd>
            {{ repoData.name }}の
            <a :href="`https://github.com/sukeo-sukeo/${repoData.name}/blob/main/readme.md`" target="_blank">readme.md</a>を見る
          </dd>
        </li>
     </ul>
   </div>
</template>

<script>
import MtIcon from "../../atoms/MtIcon";

export default {
  name: "RepoCard",
  components: {MtIcon},
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

<style scoped>
.collection {
  border-radius: 5px;
}
.material-icons {
  margin-right: 5px;
}
a {
  text-decoration: underline;
  color: #0000EE
}
</style>