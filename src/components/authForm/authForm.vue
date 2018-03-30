<template>
  <div class="container py-5">
    <div class="row">
      <div class="col-md-12">
        <h2 class="text-center mb-1">{{ $t('title.first') }}</h2>
        <p class="text-center text-secondary mb-4">{{ $t('title.second') }} <b>Bootstrap</b></p>
        <div class="row">
          <div class="col-md-6 mx-auto">
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
                <p class="text-center m-0">
                  <img src="../../assets/img/user-photo.png" width="160" height="160" alt="User Photo">
                </p>
              </div>
              <div class="card-body pt-0">
                <form class="form"
                      role="form"
                      autocomplete="off"
                      id="formLogin"
                      @submit.prevent="logIn(model)">

                  <div class="form-group mb-0"
                       :class="{}">
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
                           @input="$v.model.password.$touch()"
                           @keypress="checkCapsLock">
                    <div class="invalid-feedback"
                         v-if="$v.model.password.$error">
                      {{ $t('error.password') }}
                    </div>
                  </div>

                  <button type="submit"
                          class="btn btn-success btn-lg mt-4 w-100 border-0 bg-danger"
                          :disabled="$v.model.$invalid"
                          id="btnLogin">
                    {{ $t('button.login') }}
                  </button>
                  <i class="text-danger" v-if="isError">{{ $t('error.login') }}</i>
                  <i class="text-danger" v-if="isCapsLock">{{ $t('error.capslock') }}</i>
                  <p class="text-center text-muted mt-5">
                    {{ $t('info.register') }}
                    <!--<router-link tag="a" class="text-danger" to="/singup">Create an account</router-link>-->
                    <a class="text-danger singup" @click="singUp(model)">{{ $t('link.account') }}</a>
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
  import { mapActions, mapMutations, mapGetters } from 'vuex'
  import { required, minLength, alphaNum } from 'vuelidate/lib/validators'
  import { capsLock } from '../../system/helpers'

  import en from './lang/en'
  import ru from './lang/ru'

  export default {
    data() {
      return {
        isCapsLock: false,
        isError: false,
        model: {
          username: '',
          password: ''
        }
      }
    },
    i18n: {
      messages: {
        en: en,
        ru: ru
      }
    },
    methods: {
      ...mapMutations(['SET_USER_DATA']),
      ...mapActions(['login', 'changeLang']),
      logIn (model) {
        this.isError = false
        this.login(model)
          .then(() => {
            console.log('Success')
          })
          .catch((err) => {
            this.isError = true
            console.log(err)
          })
      },
      singUp (model) {
        this.SET_USER_DATA(model)
        this.$router.push({ name: 'singup' })
      },
      checkCapsLock (event) {
        this.isCapsLock = capsLock(event)
      }
    },
    computed: {
      ...mapGetters(['getLang'])
    },
    validations: {
      model: {
        username: {
          required,
          minLength: minLength(3),
          alphaNum
        },
        password: {
          required,
          minLength: minLength(1)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .singup {
    cursor: pointer;
  }
</style>
