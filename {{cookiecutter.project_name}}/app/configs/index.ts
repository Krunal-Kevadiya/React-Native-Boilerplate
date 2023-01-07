{% if cookiecutter.state_management != 'graphql' -%}
export * from './APIConfig';
{% elif cookiecutter.state_management == "graphql" -%}
export * from './GraphQlConfig';
{% endif -%}
export * from './SentryConfig';
export { default as i18n } from './TranslationConfig';
export * from './FirebaseConfig';
