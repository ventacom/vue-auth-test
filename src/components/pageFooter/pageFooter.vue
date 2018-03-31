<template>
  <footer class="footer">
    <div class="container">
      <span class="text-muted">{{ $t('info.copyright') }}</span>
    </div>
  </footer>
</template>

<script>
  import en from './lang/en'
  import ru from './lang/ru'

  export default {
    i18n: {
      messages: {
        en: en,
        ru: ru
      }
    }
  }

</script>

<style lang="scss" scoped>
  .footer {
    height: 50px;
    background-color: #f5f5f5;
    line-height: 50px;
  }
</style>
