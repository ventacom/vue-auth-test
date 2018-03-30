import Vue from 'vue'
import VueI18n from 'vue-i18n'

import en from './data/en'
import ru from './data/ru'

Vue.use(VueI18n)

const locale = 'en'

const messages = {
  en: en,
  ru: ru
}

const i18n = new VueI18n({
  locale,
  messages
})

export default i18n
