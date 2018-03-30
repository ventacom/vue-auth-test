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
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 60px;
    line-height: 60px;
    background-color: #f5f5f5;
  }
</style>
