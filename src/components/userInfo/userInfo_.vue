<template>

  <div class="container py-5">
    <div class="row">
      <div class="col-md-12">
        <h2 class="text-center mb-1">{{ $t('title.first') }}</h2>
        <p class="text-center text-secondary mb-4">{{ $t('title.second') }} <b>Bootstrap</b></p>
        <div class="row">
          <div class="col-md-6 mx-auto">
            <div class="card rounded-2 box-shadow">
              <div class="card-header border-0 pb-0 bg-white">
                <div v-if="startFileUpload" class="row justify-content-md-center mb-3">

                  <div class="col text-center">
                    <!--<div class="progress">-->
                    <!--<progress class="upload-progress" max="100" :value.prop="uploadPercentage"></progress>-->
                    <div class="progress-bar mb-2"
                         role="progressbar"
                         :style="{width: uploadPercentage + '%'}"
                         aria-valuenow="25"
                         aria-valuemin="0"
                         aria-valuemax="100">

                    </div>
                    <!--</div>-->

                    <span>Save new avatar?</span>
                    <button type="button"
                            class="btn btn-outline-success py-0"
                            :disabled="isSaving"
                            @click="submitFile()">
                      Yes
                    </button>
                    <button type="button"
                            class="btn btn-outline-danger py-0"
                            :disabled="isSaving"
                            @click="cancelFile()">
                      No
                    </button>
                  </div>
                </div>

                <div v-if="saveError" class="row justify-content-md-center">
                  <i class="text-center text-danger mb-3">Error uploading avatar!</i>
                </div>

                <div class="row justify-content-md-center mb-3">
                  <div class="col-md-auto">
                    <p class="avatar"
                       :class="{'avatar--upload':startFileUpload}">
                      <img class="avatar__image avatar__image--old"
                           :src=getAvatar
                           width="160"
                           height="160"
                           alt="Avatar">
                      <img v-if="startFileUpload"
                           class="avatar__image avatar__image--new"
                           :src=newImage
                           width="160"
                           height="160"
                           alt="New Avatar">
                      <input v-if="!isSaving" class="avatar__input"
                             type="file"
                             accept="image/*"
                             ref="file"
                             @change="handleFileUpload()"/>
                    </p>
                  </div>
                </div>
                <!--<p class="avatar">-->
                <!--<img class="avatar__image" src="../../assets/img/user-photo.png" width="160" height="160" alt="User Photo">-->
                <!--<img class="avatar__image avatar__image&#45;&#45;new" :src=getSetImage width="160" height="160" alt="User Photo">-->
                <!--<input class="avatar__input"-->
                <!--type="file"-->
                <!--id="file"-->
                <!--ref="file"-->
                <!--@change="handleFileUpload()"/>-->
                <!--</p>-->
              </div>
              <div class="card-body pt-0">
                <p><b>{{ $t('user.id') }} </b>{{ getUser.id }}</p>
                <p><b>{{ $t('user.name') }} </b>{{ getUser.username }}</p>
                <p><b>{{ $t('user.email') }} </b>{{ getUser.email }}</p>
                <p><b>{{ $t('user.avatar') }} </b>{{ getUser.avatar.path }}</p>

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
  import { fileUpload, uploadProgress } from '../../system/helpers'

  import en from './lang/en'
  import ru from './lang/ru'

  export default {
    data() {
      return {
        file: '',
        setImage: null,
        newImage: null,
        uploadPercentage: 0,
        startFileUpload: false,
        isSaving: false,
        saveError: false
      }
    },
    i18n: {
      messages: {
        en: en,
        ru: ru
      }
    },
    methods: {
      ...mapActions(['logout', 'uploadUserAvatar', 'check']),
      handleFileUpload () {
        this.startFileUpload = true
        this.saveError = false
        this.uploadPercentage = 0

        this.file = this.$refs.file.files[0] || this.file
        fileUpload(this.file, (img) => { this.newImage = img })
      },
      submitFile () {
        this.isSaving = true

        let formData = new FormData()

        formData.append('avatar[path]', this.file)
        // console.log('FormData = ', Array.from(formData.entries()))
        this.uploadUserAvatar({
          id: this.getUser.id,
          formData: formData,
          progress: (progressEvent) => {
            this.uploadPercentage = uploadProgress(progressEvent)
            // this.uploadPercentage = parseInt( Math.round( ( progressEvent.loaded * 100 ) / progressEvent.total ) )
          } })
          .then(() => {
            this.startFileUpload = false
            this.isSaving = false
            this.setImage = this.getUser.avatar.path
            console.log('SUCCESS')
          })
          .catch((err) => {
            this.isSaving = false
            this.check(err.response.status.toString())
              .then(() => {
                console.log('Error saving image')
                this.saveError = true
              })
              .catch(() => {
                console.log('Token lifetime error')
              })
            console.log('ERROR', err.response.status)
          })
      },
      cancelFile () {
        this.startFileUpload = false
        this.$refs.file.type = 'text'
        this.$refs.file.type = 'file'
      },
      logOut () {
        this.logout()

      }
    },
    computed: {
      ...mapGetters(['getUser', 'getAvatar'])
    }
  }
</script>

<style lang="scss" scoped>
  .avatar {
    position: relative;
    height: 160px;
    width: 160px;
    margin: 0 auto;
    &--upload {
      width: 210px;
      .avatar__image--old {
        opacity: 0.5;
      }
    }
  }
  .avatar__image {
    border-radius: 50%;
    height: 160px;
    width: 160px;
  }
  .avatar__image--new {
    display: block;
    position: absolute;
    top: 0;
    left: 50px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }

  .avatar__input {
    position: absolute;
    top: 0;
    right: 0;
    opacity: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
  .progress-bar {
    height: 3px;
  }
</style>
