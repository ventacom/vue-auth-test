<template>
  <div class="container">

    <user-info v-if="isLoggedIn()"></user-info>

    <auth-form v-if="!isLoggedIn()"></auth-form>

  </div>
</template>

<script>
  import authForm from '../components/authForm/authForm'
  import userInfo from '../components/userInfo/userInfo'
  import { mapGetters, mapActions } from 'vuex'

  export default {
    components: {
      authForm,
      userInfo
    },
    methods: {
      ...mapGetters(['isLoggedIn']),
      ...mapActions(['check'])
    },
    created () {
      // this.check();
    }
  }
</script>

<style lang="scss" scoped>

</style>
