module.exports = {
  assets: ['./app/assets/fonts'],
  project: {
    ios: {},
    android: {}
  },
  dependencies: {
    {% if cookiecutter.__with_react_native_web == 'true' -%}
    'react-native-permissions': {
      platforms: {
        web: null
      }
    }
    {% endif -%}
  }
};
