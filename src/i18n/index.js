import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);
const enUS = require('./en-US.json');
const zhCN = require('./zh-CN.json');

const i18n = new VueI18n({
  locale: 'zh-CN',
  messages: {
    'en-US': enUS,
    'zh-CN': zhCN,
  },
});

export default i18n;
