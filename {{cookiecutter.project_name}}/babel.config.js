module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    [
      'module:react-native-dotenv',
      {
        moduleName: 'react-native-dotenv',
        path: '.env',
        blacklist: ['ENV'],
        allowlist: ['SENTRY_URL', 'API_URL', 'ENVIRONMENT', 'ENCRYPTION_KEY'],
        safe: true,
        allowUndefined: false
      }
    ],
    [
      'module-resolver',
      {
        extensions: ['.js', '.ts', '.tsx', '.jsx'],
        alias: {
          '@assets-fonts': './app/assets/fonts',
          '@assets-icons': './app/assets/icons',
          '@assets-images': './app/assets/images',
          '@assets-mockData': './app/assets/mock_data',
          '@assets': './app/assets',
          '@components': './app/components',
          '@configs': './app/configs',
          '@constants': './app/constants',
          '@hooks-util': './app/hooks/hook_util',
          '@hooks': './app/hooks',
          '@modules-auth': './app/modules/auth',
          '@modules-home': './app/modules/home',
          '@modules-launch': './app/modules/launch',
          '@modules': './app/modules',
          '@navigators': './app/navigators',
          '@models-form': './app/models/form',
          '@models-other': './app/models/other',
          '@models-util': './app/models/model_util',
          '@models-request': './app/models/request',
          '@models-response': './app/models/response',
          '@models-schema': './app/models/schema',
          '@models': './app/models',
          '@stores-redux-middleware': './app/stores/redux/middleware',
          '@stores-redux': './app/stores/redux',
          '@stores-saga': './app/stores/saga',
          '@stores-service': './app/stores/service',
          '@stores-util': './app/stores/store_util',
          '@stores': './app/stores',
          '@themes': './app/themes',
          '@translations': './app/translations',
          '@utils': './app/utils'
        }
      }
    ],
    [
      'babel-plugin-inline-import',
      {
        extensions: ['.svg']
      }
    ]
  ],
  env: {
    development: {},
    production: {
      plugins: ['transform-remove-console']
    }
  }
};
