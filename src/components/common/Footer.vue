<template>
  <footer class="page-footer red">
    <div class="container">
      <div class="row sns_icons">
        <div 
        class="col hoverable"
        v-for="icon in iconName" :key="icon"
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
    iconName: [
      "logos:twitter", 
      "logos:facebook", 
      "logos:instagram-icon", 
      "logos:github-icon", 
      "simple-icons:qiita"]
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