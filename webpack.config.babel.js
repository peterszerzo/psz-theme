import path from 'path';
import webpack from 'webpack';
import autoprefixer from 'autoprefixer';
import validate from 'webpack-validator';

const {NODE_ENV} = process.env;

const corePlugins = [];

const developmentPlugins = [
  new webpack.NoErrorsPlugin()
];

const productionPlugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': '"production"'
  }),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin({
    mangle: {
      except: [ '$super', '$', 'exports', 'require' ]
    }
  })
];

const usedPlugins = NODE_ENV === 'development' ? [...corePlugins, ...developmentPlugins] : [...corePlugins, ...productionPlugins];

const config = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: path.resolve('./assets/js'),
    publicPath: 'http://0.0.0.0:3001/',
    filename: 'bundle.js',
    sourceMapFilename: 'bundle.js.map'
  },
  module: {
    loaders: [
      {
        test: /(\.js)|(\.jsx)$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react', 'stage-0']
        },
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'postcss', 'sass']
      }
    ]
  },
  postcss() {
    return [
      autoprefixer({
        browsers: 'last 2 versions'
      })
    ];
  },
  devtool: NODE_ENV === 'development' ? 'source-map' : null,
  plugins: usedPlugins
};

export default validate(config);
