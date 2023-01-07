module.exports = {
  presets: [
    {% if cookiecutter.__with_react_native_web == 'true' -%}
    ['module:metro-react-native-babel-preset', { useTransformReactJSXExperimental: true }],
    '@babel/preset-react',
    '@babel/preset-typescript'
    {% else -%}
    'module:metro-react-native-babel-preset'
    {% endif %}
  ],
  plugins: [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    {%- if cookiecutter.__with_react_native_web == 'true' -%}
    ['@babel/plugin-transform-flow-strip-types'],
    [
      '@babel/plugin-transform-react-jsx',
      {
        runtime: 'automatic',
      },
    ],
    ['@babel/plugin-proposal-export-namespace-from'],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['@babel/plugin-proposal-private-methods', { loose: true }],
    ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
    '@babel/plugin-transform-runtime',
    {% endif -%}
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
          '@assets-mock-data': './app/assets/mock-data',
          '@assets': './app/assets',
          '@components': './app/components',
          '@configs': './app/configs',
          '@constants': './app/constants',
          '@hooks-utils': './app/hooks/hooks-utils',
          '@hooks': './app/hooks',
          '@modules-auth': './app/modules/auth',
          '@modules-home': './app/modules/home',
          '@modules-launch': './app/modules/launch',
          '@modules': './app/modules',
          '@navigators': './app/navigators',
          '@models-form': './app/models/form',
          '@models-other': './app/models/other',
          '@models-utils': './app/models/models-utils',
          '@models-request': './app/models/request',
          '@models-response': './app/models/response',
          '@models-schema': './app/models/schema',
          '@models': './app/models',
          {% if cookiecutter.state_management != 'graphql' -%}
          "@redux-middleware": './app/redux/middleware',
          "@redux": './app/redux',
          {% if cookiecutter.state_management == 'saga' -%}
          "@saga": './app/saga',
          "@services": './app/services',
          {%- endif -%}
          {% elif cookiecutter.state_management == "graphql" -%}
          "@graphql": './app/graphql',
          {%- endif -%}
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
    ],
    'react-native-reanimated/plugin'
  ],
  env: {
    development: {},
    production: {
      plugins: ['transform-remove-console']
    }
  }
};
