<template>

  <div class="page">

    <page-header v-if="willShown"></page-header>

    <main class="content mt-5">
      <router-view></router-view>
    </main>

    <page-footer v-if="willShown"></page-footer>

  </div>

</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import pageHeader from './components/pageHeader/pageHeader'
  import pageFooter from './components/pageFooter/pageFooter'

  export default {
    metaInfo () {
      return {
        meta: [
          { name: 'viewport', content: 'width=device-width, initial-scale=1' },
          { name: 'format-detection', content: 'telephone=no' }
        ],
        title: 'Vue Auth Test',
        titleTemplate: '%s | ' + this.$i18n.t('meta.title')
      }
    },
    components: {
      pageHeader,
      pageFooter
    },
    methods: {
      ...mapActions(['checkGeo'])
    },
    computed: {
      ...mapGetters(['isLoggedIn']),
      willShown () {
        const route = this.$route.name === 'singup'
        return this.isLoggedIn && !route
      }
    },
    beforeUpdate () {
      this.checkGeo()
    }
  }
</script>

<style lang="scss">
  @import "../node_modules/bootstrap/scss/bootstrap";
  .page {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }
  .content {
    flex: 1;
  }
</style>
