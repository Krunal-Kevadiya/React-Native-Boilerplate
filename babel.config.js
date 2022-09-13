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
        allowlist: ['SENTRY_URL', 'SEGMENT_KEY', 'API_URL', 'ENVIRONMENT'],
        safe: true,
        allowUndefined: false
      }
    ],
    [
      'module-resolver',
      {
        extensions: ['.js', '.ts', '.tsx', '.jsx'],
        alias: {
          '@assets-font': './src/assets/font',
          '@assets-icon': './src/assets/icon',
          '@assets-image': './src/assets/image',
          '@assets-mockData': './src/assets/mock_data',
          '@assets': './src/assets',
          '@components': './src/components',
          '@configs': './src/configs',
          '@constants': './src/constants',
          '@hooks-util': './src/hooks/hook_util',
          '@hooks': './src/hooks',
          '@modules-auth': './src/modules/auth',
          '@modules-home': './src/modules/home',
          '@modules-launch': './src/modules/launch',
          '@modules': './src/modules',
          '@navigators': './src/navigators',
          '@models-form': './src/models/form',
          '@models-other': './src/models/other',
          '@models-util': './src/models/model_util',
          '@models-request': './src/models/request',
          '@models-response': './src/models/response',
          '@models-schema': './src/models/schema',
          '@models': './src/models',
          '@stores-redux-middleware': './src/stores/redux/middleware',
          '@stores-redux': './src/stores/redux',
          '@stores-saga': './src/stores/saga',
          '@stores-service': './src/stores/service',
          '@stores-util': './src/stores/store_util',
          '@stores': './src/stores',
          '@themes': './src/themes',
          '@translations': './src/translations',
          '@utils': './src/utils'
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
