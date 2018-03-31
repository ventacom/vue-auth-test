<template>

  <div class="container py-5">
    <div class="row">
      <div class="col-md-12">
        <h2 class="text-center mb-1">{{ $t('title.first') }}</h2>
        <p class="text-center text-secondary mb-4">{{ $t('title.second') }} <b>Bootstrap</b></p>
        <div class="row">
          <div class="col-12 col-sm-11 col-md-6 mx-auto">
            <div class="card rounded-2 box-shadow">
              <div class="card-header border-0 pb-0 bg-white">

                <upload-avatar @saving="setIsSaving"></upload-avatar>
              </div>
              <div class="card-body pt-0">
                <p><b>{{ $t('user.id') }} </b>{{ getUser.id }}</p>
                <p><b>{{ $t('user.name') }} </b>{{ getUser.username }}</p>
                <p><b>{{ $t('user.email') }} </b>{{ getUser.email }}</p>
                <!--<p><b>{{ $t('user.avatar') }} </b>{{ getUser.avatar.path }}</p>-->

                <button type="button"
                        class="btn btn-success btn-lg mt-4 w-100 border-0"
                        :disabled="isSaving"
                        @click="logOut">
                  {{ $t('button.logout') }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import uploadAvatar from '../uploadAvatar/uploadAvatar'

  import en from './lang/en'
  import ru from './lang/ru'

  export default {
    data () {
      return {
        isSaving: false
      }
    },
    metaInfo () {
      return {
        title: this.$i18n.t('meta.title')
      }
    },
    components: {
      uploadAvatar
    },
    i18n: {
      messages: {
        en: en,
        ru: ru
      }
    },
    methods: {
      ...mapActions(['logout']),
      logOut () {
        this.logout()
      },
      setIsSaving (payload) {
        this.isSaving = payload.isSaving
      }
    },
    computed: {
      ...mapGetters(['getUser'])
    }
  }
</script>

<style lang="scss" scoped>

</style>
