<template>
  <header>
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">

      <a class="navbar-brand" href="#">Vue-test</a>

      <button class="navbar-toggler"
              type="button"
              @click="showNav = !showNav"
              data-toggle="collapse"
              data-target="#navbarCollapse"
              aria-controls="navbarCollapse"
              aria-expanded="false"
              aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse"
           :class="{'show': showNav}"
           id="navbarCollapse">

        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link tag="a" class="nav-link" exact-active-class="active" to="/">{{ $t('nav.home') }}</router-link>
          </li>
          <li class="nav-item">
            <router-link tag="a" class="nav-link" exact-active-class="active" to="/page">{{ $t('nav.page') }}</router-link>
          </li>
          <li class="nav-item">
            <router-link tag="a" class="nav-link" exact-active-class="active" to="/login">{{ $t('nav.user') }}</router-link>
          </li>
        </ul>

        <div class="btn-group">
          <button type="button"
                  class="btn btn-sm btn-outline-secondary"
                  :class="{'active': getLang === 'ru'}"
                  @click="changeLang('ru')">
            RU
          </button>
          <button type="button"
                  class="btn btn-sm btn-outline-secondary"
                  :class="{'active': getLang === 'en'}"
                  @click="changeLang('en')">
            EN
          </button>
        </div>

      </div>

    </nav>
  </header>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  import en from './lang/en'
  import ru from './lang/ru'

  export default {
    data () {
      return {
        showNav: false
      }
    },
    methods: {
      ...mapActions(['changeLang'])
    },
    computed: {
      ...mapGetters(['getUser', 'getLang'])
    },
    i18n: {
      messages: {
        en: en,
        ru: ru
      }
    },
    watch: {
      '$route' () {
        this.showNav = false
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
