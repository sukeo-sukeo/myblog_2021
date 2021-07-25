<template>
  <div id="profileContainer">
  
    <transition name="fade">
      <div v-if="isLoader" class="mask"></div>
    </transition>

    <loader-circle class="loader" v-if="isLoader"></loader-circle>

    <profile-card ref="profile"
    @open-twitter="openTwitterFeed" 
    :profileData="twProfile"
    :isMovileView="isMovileView"
    :isOpenFeed="isOpenFeed"
    :followBtn="followBtn"
    ></profile-card>
    
    <div class="row feed_wrapper">
      <div class="col">
        <span v-show="isOpenFeed" class="tweet_feed" v-html="tweetFeed"></span>
      </div>
    </div>

    <transition name="fadeinout">
      <any-btn 
      :btnIcon="`arrow_upward`"
      :event="`returnTop`"
      :positionX="5" 
      :positionY="5" 
      :btnColor="`red`" :c_Height="c_Height" :isStop="isStopBeforeFooter" v-show="topReturnBtnActive"></any-btn>
    </transition>

    <transition name="fadeinout">
      <any-btn
      class="follow_btn" 
      :btnIcon="followBtn"
      :event="`followBtn`"
      :positionX="3" 
      :positionY="15" 
      :btnColor="``" :c_Height="c_Height" :isStop="isStopBeforeFooter" v-show="topReturnBtnActive"></any-btn>
    </transition>

  </div>
</template>

<script>
import LoaderCircle from "../../atoms/LoaderCircle";
import ProfileCard from "./ProfileCard";
import AnyBtn from "../../atoms/AnyBtn";

export default {
  name: 'ProfilePage',
  components: {
    LoaderCircle,
    ProfileCard,
    AnyBtn
  },
  data: () => ({
    isLoader: true,
    isOpenFeed: false,
    twProfile: Object,
    followBtn: `<a href="https://twitter.com/sukeo_sukeo?ref_src=twsrc%5Etfw" class="twitter-follow-button" data-size="large" data-show-screen-name="false" data-show-count="true">Follow @sukeo_sukeo</a>`,
    tweetFeed: `<a class="twitter-timeline" data-width="600" data-theme="dark" href="https://twitter.com/sukeo_sukeo?ref_src=twsrc%5Etfw"
    ></a>`,
  }),
  props: {
    baseURL: String,
    isMovileView: Boolean,
    topReturnBtnActive: Boolean,
    isStopBeforeFooter: Boolean,
    c_Height: [Array, Object, Function],
  },
  methods: {
    async fetchTwitterApi() {
      const {twitterProfile} = await this.$axios.get(`${this.baseURL}/node/profile`).then((res) => res.data);
      this.twProfile = twitterProfile;
    },
    openTwitterFeed() {
      const domRect = this.$refs.profile.$el.getBoundingClientRect();
      if (!this.isOpenFeed) {
        this.adjustScroll(domRect.height + domRect.bottom, 200);
      }
      this.isOpenFeed = !this.isOpenFeed;
    },
    adjustScroll(scrollPosition, adjust = 0) {
      const adjustY = adjust;
      setTimeout(() =>  scrollTo({
        top: scrollPosition - adjustY,
        behavior: 'smooth'
      }), 100);
    }
  },
  created() {
    // ツイッターapi
    this.fetchTwitterApi();
    // ツイッターオブジェクトをロード
    window.twttr.widgets.load()
    },
  mounted() {
  },
  updated() {
    this.isLoader = false
  }
}
</script>

<style scoped>
.feed_wrapper {
  display: flex;
  justify-content: center;
}
.follow_btn {
  border-radius: 5px;
  border: none;
  padding-top: 5px;
  padding-bottom: 2px;
  background-color: #e5e6f0;
}
</style>