const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { EnvironmentPlugin, HotModuleReplacementPlugin } = require('webpack');

const appDirectory = path.resolve(__dirname, './');
const { presets } = require(`${appDirectory}/babel.config.js`);
const Dotenv = require('dotenv-webpack');

const compileNodeModules = [
  '@sentry/react-native',
  'react-native-spinner-button',
  'react-native-animatable',
  'react-native-indicators',
  'react-native/Libraries/Core',
  'react-native/Libraries/NativeModules',
  'react-native/Libraries/Utilities',
  'react-native/Libraries/TurboModule',
  'react-native/Libraries',
  'react-native-fast-image',
  'react-native-code-push',
  'react-native-progress',
  'react-native-reanimated'
].map((moduleName) => path.resolve(appDirectory, `node_modules/${moduleName}`));

// This is needed for webpack to compile JavaScript.
// Many OSS React Native packages are not compiled to ES5 before being
// published. If you depend on uncompiled packages they may cause webpack build
// errors. To fix this webpack can be configured to compile to the necessary
// `node_module`.
const babelLoaderConfiguration = {
  test: /\.(tsx|ts|jsx|js|mjs)$/,
  // Add every directory that needs to be compiled by Babel during the build.
  include: [
    path.resolve(appDirectory, 'index.web.tsx'), // Entry to your application
    path.resolve(appDirectory, 'app/App.tsx'), // Change this to your main App file
    path.resolve(appDirectory, 'app'),
    path.resolve(appDirectory, 'node_modules/react-native-uncompiled'),
    ...compileNodeModules
  ],
  exclude: '/node_modules/',
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      // The 'metro-react-native-babel-preset' preset is recommended to match React Native's packager
      presets: presets,
      // Re-write paths to import only the modules needed by the app
      plugins: ['react-native-web']
    }
  },
  generator: {
    filename: 'static/js/[hash][ext][query]'
  }
};

const svgLoaderConfiguration = {
  test: /\.svg$/,
  issuer: /\.[jt]sx?$/,
  use: ['@svgr/webpack', 'url-loader']
};

// This is needed for webpack to import static images in JavaScript files.
const imageLoaderConfiguration = {
  test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
  type: 'asset/resource'
};

// This is needed for webpack to import static fonts in JavaScript files.
const fontLoaderConfiguration = {
  test: /\.(woff(2)?|ttf|eot|wav)(\?v=\d+\.\d+\.\d+)?$/,
  type: 'asset/resource',
  generator: {
    filename: 'assets/fonts/[hash][ext][query]'
  }
};

const reactNativeWebWebViewLoaderConfiguration = {
  test: /postMock.html$/,
  use: {
    loader: 'file-loader',
    options: {
      name: '[name].[ext]'
    }
  }
};

const isDev = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: ['babel-polyfill', path.join(appDirectory, 'index.web.tsx')],
  // configures where the build ends up
  output: {
    chunkFilename: isDev ? '[name].chunk.js' : 'scripts/[name].[chunkhash].chunk.js',
    filename: isDev ? '[name].js' : 'scripts/[name].[chunkhash].js',
    path: path.resolve(appDirectory, 'dist'),
    publicPath: '/',
    assetModuleFilename: 'assets/images/[hash][ext][query]'
  },
  target: 'web',
  resolve: {
    // If you're working on a multi-platform React Native app, web-specific
    // module implementations should be written in files using the extension
    // `.web.js and .web.ts`.
    extensions: ['.web.js', '.web.ts', '.web.jsx', '.web.tsx', '.js', '.ts', '.jsx', '.tsx'],
    fallback: {
      fs: false,
      path: require.resolve('path-browserify')
    },
    alias: {
      'react-native$': 'react-native-web'
      // Create alias of native and web 3rd party libraries
      // 'react-native-linear-gradient': 'react-native-web-linear-gradient',
      // 'react-native-maps': 'react-native-web-maps'
    }
  },
  // ...the rest of your config
  module: {
    rules: [
      fontLoaderConfiguration,
      imageLoaderConfiguration,
      babelLoaderConfiguration,
      svgLoaderConfiguration,
      reactNativeWebWebViewLoaderConfiguration,
      {
        test: /\.(sa|sc|c)ss$/,
        use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      }
    ]
  },
  optimization: isDev
  ? {
      splitChunks: {
        chunks: 'all'
      }
    }
  : {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          parallel: true,
          terserOptions: {
            compress: {
              comparisons: false,
              drop_console: true
            },
            mangle: true,
            output: {
              ascii_only: true,
              comments: false
            },
            parse: {},
            warnings: false
          }
        })
      ],
      nodeEnv: 'production',
      sideEffects: true,
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: 10,
        minSize: 0,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              // get the name. E.g. node_modules/packageName/not/this/part.js
              // or node_modules/packageName
              const packageName = module.context.match(
                /[\\/]node_modules[\\/](.*?)([\\/]|$)/
              )?.[1];

              // npm package names are URL-safe, but some servers don't like @ symbols
              return `{{cookiecutter.__project_name_with_lowercase}}.${packageName?.replace('@', '')}`;
            }
          }
        }
      }
    },
  plugins: [
    new CleanWebpackPlugin(),
    new EnvironmentPlugin({ NODE_ENV: 'development' }),
    ...(isDev ? [new HotModuleReplacementPlugin()] : []),
    new MiniCssExtractPlugin({
      filename: isDev ? '[name].css' : 'assets/style/[name].[contenthash].css'
    }),
    new HtmlWebpackPlugin({
      inject: true,
      minify: !isDev,
      template: path.join(appDirectory, 'public/index.html')
    }),
    ...(isDev
      ? []
      : [
          new CompressionPlugin({
            algorithm: 'gzip',
            minRatio: 0.8,
            threshold: 10240,
            test: /\.js$|\.css$|\.html$/
          }),
          new webpack.ids.HashedModuleIdsPlugin({
            hashDigest: 'hex',
            hashDigestLength: 20,
            hashFunction: 'sha256'
          })
        ]),
    //new webpack.EnvironmentPlugin({ JEST_WORKER_ID: null }),
    // `process.env.NODE_ENV === 'production'` must be `true` for production
    // builds to eliminate development checks and reduce build size. You may
    // wish to include additional optimizations.
    new webpack.DefinePlugin({
      // See: https://github.com/necolas/react-native-web/issues/349
      __DEV__: JSON.stringify(true), //isDev || true,
      //process: { env: {} },
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    new Dotenv({ path: './.env' })
  ],
  devServer: {
    historyApiFallback: {
      disableDotRule: true
    },
    hot: true,
    port: '3000'
  },
  devtool: isDev ? 'eval' : 'hidden-source-map'
};
