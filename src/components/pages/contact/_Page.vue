<template>
  <div class="row" id="contactPage" :class="{padding: !isMovileView}">

    <form class="col s12">
      <div class="row center-align page_title">
        <h5>お問い合わせ</h5>
        <small>ご意見・ご要望などお気軽にお寄せください</small>
        <p class="red-text">只今調整中です</p>
      </div>
      
      <!-- name -->
      <div class="row">
        <div class="input-field col s11 m8">
          <mt-icon :iconName="`account_circle`" :addClass="`prefix`"></mt-icon>
          <input id="name" type="text" class="validate" v-model="formData.name">
          <label for="name">Name</label>
        </div>
      </div>

      <!-- email -->
      <div class="row">
        <div class="input-field col s11 m8">
          <mt-icon :iconName="`markunread`" :addClass="`prefix`"></mt-icon>
          <input id="email" type="email" class="validate" v-model="formData.email">
          <label for="email">Email</label>
        </div>
      </div>

      <!-- message -->
      <div class="row">
        <div class="input-field col s11">
          <mt-icon :iconName="`mode_edit`" :addClass="`prefix`"></mt-icon>
          <textarea id="textarea" class="materialize-textarea" maxlength="200" v-model="formData.message"></textarea>
          <label for="textarea">Message</label>
        </div>
      </div>

      <!-- submitbtn -->
      <div class="row submit_wrapper">
        <button class="btn waves-effect waves-light submit_btn" type="submit" name="action" disabled>Submit
          <mt-icon :iconName="`send`" :addClass="`prefix`"></mt-icon>
        </button>
      </div>

    </form>
  </div>
</template>

<script>
import MtIcon from "../../atoms/MtIcon";

export default {
  name: 'ContactPage',
  data: () =>({
    formData: {
      name: "",
      email: "",
      message: ""
    }
  }),
  props: {
    isMovileView: Boolean
  },
  components: {MtIcon},
  mounted() {
    
  }
}
</script>

<style scoped>
#contactPage {
  background: white;
  border-radius: 5px;
}
.padding {
  padding: 20px 40px;
}
#textarea {
  height: 200px;
}
.page_title {
  margin-bottom: 30px;
}
.submit_wrapper {
  display: flex;
  justify-content: center;
}
.submit_btn {
  display: flex;
  align-items: center;
  font-size: 20px;
  margin-bottom: 50px;
}
button > span {
  margin-left: 5px;
}
</style>