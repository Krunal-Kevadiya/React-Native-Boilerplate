/**
 * A constant freezing object that contains the keys to the local storage.
 * @type {Object}
 */
export default Object.freeze({
  appTheme: 'appTheme',
  systemTheme: 'systemTheme',
  appLanguage: 'app-language',
  redux: '{{cookiecutter.project_name}}-redux',
  storage: '{{cookiecutter.project_name}}-storage',
  graphql: '{{cookiecutter.project_name}}-graphql',
  graphqlClient: '{{cookiecutter.project_name}}-graphql-client'
});
