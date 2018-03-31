<template>

  <div class="container py-5">

    <div class="row" v-if="isSuccess">
      <div class="col-md-12 text-center">
        <h2 class="text-success mb-1">{{ $t('title.success.first') }}</h2>
        <button type="button"
                class="btn btn-success btn-lg mt-4 border-0 bg-success"
                @click="logIn()">
          {{ $t('link.login') }}
        </button>
      </div>
    </div>

    <div class="row" v-if="!isSuccess">
      <div class="col-md-12">
        <h2 class="text-center mb-1">{{ $t('title.first') }}</h2>
        <p class="text-center text-secondary mb-4">{{ $t('title.second') }} <b>Bootstrap</b></p>
        <div class="row">
          <div class="col-12 col-md-9 col-lg-7 mx-auto">
            <div class="card rounded-2">
              <div class="btn-group p-1 ml-auto">
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
              <div class="card-header border-0 pb-0 bg-white">
                <!--<h3 class="mb-0">Login</h3>-->
                <!--<p class="text-center m-0">-->
                  <!--<img src="../../assets/img/user-photo.png" width="160" height="160" alt="User Photo">-->
                <!--</p>-->
                <upload-avatar :simpleForm="true" @avatar="setIsAvatar" ref="saveAvatar"></upload-avatar>
              </div>
              <div class="card-body pt-0">
                <form class="form"
                      role="form"
                      autocomplete="off"
                      id="formLogin"
                      @submit.prevent="createUser(model)">

                  <div class="form-group mb-0">
                    <label class="text-hide"
                           for="uemail1">
                      Username
                    </label>
                    <input type="email"
                           class="form-control form-control-lg rounded-2 lead"
                           :class="{'is-invalid': $v.model.email.$error, 'is-valid': !$v.model.email.$error && $v.model.email.$dirty}"
                           name="uemail1"
                           id="uemail1"
                           :placeholder="$t('placeholder.email')"
                           v-model="model.email"
                           :disabled="disableForm"
                           @input="$v.model.email.$touch()">
                    <div class="invalid-feedback"
                         v-if="$v.model.email.$error">
                      {{ $t('error.email') }}
                    </div>
                  </div>

                  <div class="form-group mb-0">
                    <label class="text-hide"
                           for="uname1">
                      Username
                    </label>
                    <input type="text"
                           class="form-control form-control-lg rounded-2 lead"
                           :class="{'is-invalid': $v.model.username.$error, 'is-valid': !$v.model.username.$error && $v.model.username.$dirty}"
                           name="uname1"
                           id="uname1"
                           :placeholder="$t('placeholder.user-name')"
                           v-model="model.username"
                           :disabled="disableForm"
                           @input="$v.model.username.$touch()">
                    <div class="invalid-feedback"
                         v-if="!$v.model.username.required">
                      {{ $t('error.user-name-empty') }}
                    </div>
                    <div class="invalid-feedback"
                         v-if="!$v.model.username.minLength">
                      {{ $t('error.user-name-length', {num: $v.model.username.$params.minLength.min}) }}
                    </div>
                    <div class="invalid-feedback"
                         v-if="!$v.model.username.alphaNum">
                      {{ $t('error.user-name-alphanum') }}
                    </div>
                  </div>

                  <div class="form-group mb-0">
                    <label class="text-hide"
                           for="pwd1">
                      Password
                    </label>
                    <input type="password"
                           class="form-control form-control-lg form-control-warning rounded-2 lead"
                           :class="{'is-invalid': $v.model.password.$error, 'is-valid': !$v.model.password.$error && $v.model.password.$dirty}"
                           id="pwd1"
                           :placeholder="$t('placeholder.password')"
                           v-model="model.password"
                           :disabled="disableForm"
                           @input="$v.model.password.$touch()"
                           @keypress="checkCapsLock">
                    <div class="invalid-feedback"
                         v-if="!$v.model.password.required">
                      {{ $t('error.password-empty') }}
                    </div>
                    <div class="invalid-feedback"
                         v-if="!$v.model.password.minLength">
                      {{ $t('error.password-length') }}
                    </div>
                  </div>

                  <div class="form-group mb-0">
                    <label for="repwd1"
                           class="text-hide">
                      Re-Password
                    </label>
                    <input type="password"
                           class="form-control form-control-lg rounded-2 lead"
                           :class="{'is-invalid': $v.model.repassword.$error, 'is-valid': !$v.model.repassword.$error && $v.model.repassword.$dirty}"
                           id="repwd1"
                           :placeholder="$t('placeholder.repassword')"
                           v-model="model.repassword"
                           :disabled="disableForm"
                           @input="$v.model.repassword.$touch()"
                           @keypress="checkCapsLock">
                    <div class="invalid-feedback"
                         v-if="$v.model.repassword.$error">
                      {{ $t('error.repassword') }}
                    </div>
                  </div>

                  <button type="submit"
                          class="btn btn-success btn-lg mt-4 w-100 border-0 bg-danger"
                          :disabled="$v.model.$invalid || disableForm"
                          id="btnLogin">
                    {{ $t('button.register') }}
                  </button>
                  <i class="text-danger" v-if="isError">{{ $t('error.singup') }}</i>
                  <i class="text-danger" v-if="isCapsLock">{{ $t('error.capslock') }}</i>
                  <p class="text-center text-muted mt-5">
                    {{ $t('info.account') }}
                    <router-link tag="a" class="text-danger" to="/login">{{  $t('link.login') }}</router-link>
                    <!--<a class="text-danger" href="#">Create an account</a>-->
                  </p>
                </form>
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
  import { required, minLength, sameAs, email, alphaNum } from 'vuelidate/lib/validators'
  import { capsLock } from '../../system/helpers'

  import en from './lang/en'
  import ru from './lang/ru'

  export default {
    data () {
      return {
        isCapsLock: false,
        disableForm: false,
        isError: false,
        isSuccess: false,
        isAvatar: false,
        model: {
          email: '',
          username: '',
          password: '',
          repassword: ''
        }
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
      ...mapActions(['singUp', 'login', 'logout', 'changeLang']),

      createUser (model) {
        this.disableForm = true
        this.isSuccess = false
        this.isError = false

        this.singUp(model)
          .then(async (res) => {
            if (this.isAvatar) {
              await this.login({
                username: model.username,
                password: model.password
              })
                .then(async () => {
                  await this.$refs.saveAvatar.submitFile()
                    .then(() => {
                      console.log('start saving avatar...')
                      this.logout()
                      this.isSuccess = true
                    })
                })
                .catch(() => {
                  console.log('login error')
                })
            }
            this.isSuccess = true
            console.log(res)
          })
          .catch((err) => {
            this.disableForm = false
            this.isError = true
            console.log(err)
          })
      },
      setIsAvatar (payload) {
        this.isAvatar = payload.isAvatar
      },
      logIn () {
        this.$router.push({ name: 'login' })
      },
      checkCapsLock (event) {
        this.isCapsLock = capsLock(event)
      }
    },
    computed: {
      ...mapGetters(['getUser', 'getLang', 'getAvatar'])
    },
    created () {
      this.model = this.getUser
    },
    validations: {
      model: {
        email: {
          required,
          eMail: email
        },
        username: {
          required,
          minLength: minLength(3),
          alphaNum
        },
        password: {
          required,
          minLength: minLength(6)
        },
        repassword: {
          required,
          minLength: minLength(6),
          sameAsPassword: sameAs('password')
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
