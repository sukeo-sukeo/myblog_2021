<template>
  <footer class="page-footer red">
    <div class="container">
      <div class="row sns_icons">
        <div 
        class="col hoverable"
        v-for="icon in iconNames" :key="icon.url"
        >
          <icon-btn
          :iconName="icon"
          ></icon-btn> 
        </div>
      </div>
    </div>
    <div class="footer-copyright">
      <span>
      © 2021 sukeo-sukeo
      </span>
    </div>

  </footer>

</template>

<script>
import IconBtn from '../atoms/IconBtn';

export default {
  name: 'FooterBar',
  components: {IconBtn},
  data: () => ({
    iconNames: [
      {logo: "logos:twitter", url: "https://twitter.com/sukeo_sukeo"}, 
      {logo: "logos:facebook", url: "1"}, 
      {logo: "logos:instagram-icon", url: "2"}, 
      {logo: "logos:github-icon", url: "https://github.com/sukeo-sukeo"}, 
      {logo: "simple-icons:qiita", url: "https://qiita.com/sukeo-sukeo"},
    ]
  })
}
</script>

<style scoped>
.iconify {
  cursor: pointer;
}

.sns_icons {
  display: flex;
  justify-content: center;
  font-size: 48px;
}

.sns_icons > .col {
  border-radius: 25%;
  padding-top: 10px;
}

.footer-copyright {
  display: flex;
  justify-content: center;
}
</style>