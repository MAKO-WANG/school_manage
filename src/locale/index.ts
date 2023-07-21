import { createI18n } from 'vue-i18n';
import { enUS, zhCN, zhTW } from './lang';

const i18n = createI18n({
  locale: 'zh-CN',
  messages: {
    'zh-CN': zhCN,
    'zh-TW': zhTW,
    'en-US': enUS,
  },
});

export default i18n;
