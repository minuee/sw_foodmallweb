/** @type {import('next-i18next').UserConfig} */
module.exports = {
    i18n: {
      defaultLocale: 'ko',
      localeDetection: false,
      locales: ['ko', 'en', 'ja', 'zh-CN'],
    },
    fallbackLng: {
      default: ['ko']
    },
    nonExplicitSupportedLngs: false,
    // - for dev
    reloadOnPrerender: false,
    // - for production
    //reloadOnPrerender: true,
}