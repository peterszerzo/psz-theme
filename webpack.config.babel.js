import path from 'path'
import webpack from 'webpack'

const {NODE_ENV} = process.env

const commonPlugins = []

const productionPlugins = [
  new webpack.optimize.UglifyJsPlugin({
    mangle: {
      except: [ '$super', '$', 'exports', 'require' ]
    }
  }),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': '"production"'
  })
]

const usedPlugins = NODE_ENV === 'development' ? [...commonPlugins] : [...commonPlugins, ...productionPlugins]

export default {

  entry: './src/assets/scripts/bundle.js',

  output: {
    path: path.resolve('./assets/js'),
    publicPath: 'http://localhost:3001/',
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
        loaders: [ 'style', 'css', 'sass' ]
      }

    ]
  },

  devtool: NODE_ENV === 'development' ? 'source-map' : null,

  plugins: usedPlugins

}
