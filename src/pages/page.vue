<template>
    <div class="container mt-5">
      <div class="row">
        <h1 class="m-auto text-danger">{{ getPage }}</h1>
      </div>
    </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  export default {
    methods: {
      ...mapActions(['loadPage', 'check', 'loadUserData'])
    },
    computed: {
      ...mapGetters(['getToken', 'isLoggedIn', 'getPage'])
    },
    created () {
      this.loadPage()
    }
  }
</script>

<style lang="scss" scoped>

</style>
