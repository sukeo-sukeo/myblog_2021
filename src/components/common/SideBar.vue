<template>
  <aside>
    <vue-bubbly-bg
      style="position: absolute;"
      :bgColor="'#313251'"
      :colorNum="59"
      :circleNum="10"
      :circleSpeed="'fast'"
      :circleSize="'small'"
      :moveType="'vert'"
    ></vue-bubbly-bg>
    <div class="menu_wrapper">
      <ul class="menu_container">
        <li class="menu" v-for="menu in menus" :key="menu.name" @click="event(menu.event)"><mt-icon :iconName="menu.icon"></mt-icon>{{ menu.name }}</li>
      </ul>
    </div>
  </aside>
</template>

<script>
import MtIcon from '../atoms/MtIcon';
import VueBubblyBg from '../atoms/VueBubblyBg';

export default {
  name: 'SideBar',
  props: {
    
  },
  data: () => ({
    menus: [
      {name: "サイドバー調整中", icon: "", link: "", event: ""},
      {name: "ホーム", icon: "home", link: "", event: "home"},
      {name: "カテゴリ", icon: "label", link: "", event: "category"},
      {name: "タグ", icon: "bookmark", link: "", event: "tag"},
      {name: "アーカイブ", icon: "folder", link: "", event: "archive"},
      {name: "検索", icon: "search", link: "", event: "search"},
      {name: "プロフィール", icon: "account_circle", link: "", event: "profile"},
      {name: "GitHub", icon: "forward", link: "", event: "github"},
      {name: "Twitter", icon: "forward", link: "", event: "twitter"},
    ]
  }),
  methods: {
    event(eventName) {
      console.log(eventName);
      switch (eventName) {
        case "category":
        case "tag":
        case "archive":
          this.$emit("menu-click", eventName)
          this.$eventHub.$emit("open-init")
          break;
        default:
          break;
      }
      // this.$eventHub.$emit('sidebarmenu-click', category);
    }
  },
  components: {
    VueBubblyBg,
    MtIcon
  },
  mounted() {
   
  }
}
</script>

<style scoped>
aside {
  float: left;
  height: 100%;
  width: 220px;
  max-width: 220px;
  opacity: 0.95;
  position: fixed;
  /* background-color: wheat; */
  z-index: 100;
}
.menu_wrapper {
  color: wheat;
  position: absolute;
  z-index: 1000;
}
.menu_container {
  margin: 30px 0 0 30px;
}
.menu {
  margin-bottom: 30px;
  display: flex;
}
.menu > span {
  padding-right: 10px;
}
</style>