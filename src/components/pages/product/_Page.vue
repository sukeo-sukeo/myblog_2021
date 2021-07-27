<template>
  <div id="productContainer">

    <loader-circle class="loader" v-if="isLoader"></loader-circle>

    <transition name="fade">
      <div v-if="isLoader" class="mask"></div>
    </transition>

    <section v-for="repo in repos" :key="repo.url">
      <repo-card :repoData="repo"></repo-card>
    </section>
  </div>
</template>

<script>
import LoaderCircle from "../../atoms/LoaderCircle";
import RepoCard from "./RepoCard";

export default {
  name: 'ProductPage',
  components: {LoaderCircle, RepoCard},
  data: () => ({
    repos: Array,
    isLoader: true,
  }),
  props: {
    baseURL: String,
  },
  methods: {
    async fetchGitApi() {
      const products = await this.$axios.get(`${this.baseURL}/node/product`).then((res) => res.data);
      this.repos = products;
      // console.log(this.repos);
    },
  },
  created() {
    this.fetchGitApi()
  },
  mounted() {
    },
  updated() {
    this.isLoader = false
  }
}
</script>

<style>

</style>