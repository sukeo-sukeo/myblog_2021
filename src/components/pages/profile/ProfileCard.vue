<template>

  <div class="col s12 m8 offset-m2 l6 offset-l3">
    <div class="card-panel white lighten-5 z-depth-1">
      <div class="tw_profile_wrapper" :class="{'row valign-wrapper': !isMovileView, 'center-align': isMovileView}">
        <div class="tw_img_wrapper" :class="{'col s3': !isMovileView, 'row': isMovileView}">
          <img :src="profileData.profile_image_url" alt="ツイッターでも使用しているプロフィール画像" class="circle responsive-img">
          

          <p class="center-align" v-html="followBtn"></p>

          <span class="btn-floating waves-effect halfway-fab waves-light btn-large blue add_tweetfeed" :class="{pulse: !isOpenFeed}"><i class="material-icons" 
          @click="$emit('open-twitter')">{{ isOpenFeed? 'remove' : 'add'}}</i></span>
          <span class="badge blue white-text openTweet_txt">{{ isOpenFeed? "close" : "openTweet !" }}</span>

        </div>
        <div class="tw_txt_wrapper" :class="{'col s10': !isMovileView, 'row': isMovileView}">
          <div class="row">
            <h3>スケオ<br class="hide-on-med-and-up"/><small class="grey-text tw_sub_title">for twitter profile</small>
            </h3>
            <blockquote class="left-align">
              <small>ツイッターで
                <strong style="font-weight: bold;">
                  @{{ profileData.name }}
                </strong>
                として日々の学習ログなど気ままにつぶやいてます。
              </small>
            </blockquote>
          </div>
          <div class="row">
            <span class="black-text">
              {{ profileData.description }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "ProfileCard",
  data: () => ({
  }),
  props: {
    profileData: [Object, Array, Function],
    isMovileView: Boolean,
    isOpenFeed: Boolean,
    followBtn: String
  },
  methods: {
  },
  mounted() {
  },
  updated() {
  }
}
</script>

<style scoped>
.card-panel {
  border-radius: 5px;
}
.tw_profile_wrapper {
  margin-bottom: 0;
  position: relative;
}
.tw_img_wrapper {
  min-width: 200px;
}
.tw_txt_wrapper {
  padding: 0 30px;
  margin-bottom: 0;
  font-size: 18px;
}
.tw_sub_title {
  font-size: 24px; 
  margin-left: 10px;
}
.add_tweetfeed {
  left: 50px;
  bottom: -50px !important;
}
.openTweet_txt {
  padding: 0 5px;
  border-radius: 5px;
  position: absolute;
  left: 100px;
  bottom: -35px !important;
}

</style>