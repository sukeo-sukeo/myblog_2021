<template>
  <nav class="nav-extended white">
    <div class="nav-content row">
      <ul class="tabs tabs-transparent valign-wrapper">
        <router-link
         to="/"
         class="tab col s3 grey-text text-darken-4"
         >Blog</router-link>
        <router-link
         to="/product"
         class="tab col s3 grey-text text-darken-4"
         >Product</router-link>
        <router-link
         to="/contact"
         class="tab col s3 grey-text text-darken-4"
         >Contact</router-link>
        <router-link 
         to="/profile"
         class="tab col s3 grey-text text-darken-4"
        >Profile</router-link>

      </ul>
    </div>  
  </nav>
</template>

<script>
export default {
    name: 'NavBar',
}
</script>

<style>

</style>