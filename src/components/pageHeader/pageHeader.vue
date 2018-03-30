<template>
  <header>
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <a class="navbar-brand" href="#">Vue-test</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarCollapse">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link tag="a" class="nav-link" exact-active-class="active" to="/">{{ $t('nav.home') }}</router-link>
            <!--<a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>-->
          </li>
          <li class="nav-item">
            <router-link tag="a" class="nav-link" exact-active-class="active" to="/page">{{ $t('nav.page') }}</router-link>
            <!--<a class="nav-link" href="#">Secret Page</a>-->
          </li>
          <li class="nav-item">
            <router-link tag="a" class="nav-link" exact-active-class="active" to="/login">{{ $t('nav.user') }}</router-link>
            <!--<a class="nav-link disabled" href="#">Disabled</a>-->
          </li>
        </ul>
        <!--<form class="form-inline mt-2 mt-md-0">-->
          <!--<input class="form-control mr-sm-2" type="text" :placeholder=getUser.email aria-label="Search">-->
          <!--<button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>-->
        <!--</form>-->
        <!--<div class="icon-preview">-->
          <!--<svg width="30" height="30" viewBox="0 0 16 16" version="1.1" aria-hidden="true">-->
            <!--<path fill-rule="evenodd" d="M16 12.999c0 .439-.45 1-1 1H7.995c-.539 0-.994-.447-.995-.999H1c-.54 0-1-.561-1-1 0-2.634 3-4 3-4s.229-.409 0-1c-.841-.621-1.058-.59-1-3 .058-2.419 1.367-3 2.5-3s2.442.58 2.5 3c.058 2.41-.159 2.379-1 3-.229.59 0 1 0 1s1.549.711 2.42 2.088C9.196 9.369 10 8.999 10 8.999s.229-.409 0-1c-.841-.62-1.058-.59-1-3 .058-2.419 1.367-3 2.5-3s2.437.581 2.495 3c.059 2.41-.158 2.38-1 3-.229.59 0 1 0 1s3.005 1.366 3.005 4"></path>-->
          <!--</svg>-->
        <!--</div>-->
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
    }
  }
</script>

<style lang="scss" scoped>

</style>
