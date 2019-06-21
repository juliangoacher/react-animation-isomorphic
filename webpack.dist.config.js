const path = require('path')
const merge = require('webpack-merge')
const commonConfig = require('./webpack.common')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = merge(commonConfig, {
  entry: path.join(__dirname, 'index.js'),
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'react-animation-isomorphic.js',
    library: 'ReactAnimationIsoMorphic',
    libraryTarget: 'umd',
    publicPath: '/dist/',
    umdNamedDefine: true,
    globalObject: 'this'
  },
  externals: {
    // Don't bundle react or react-dom
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'React',
      root: 'React'
    },
    'react-dom': {
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'ReactDOM',
      root: 'ReactDOM'
    }
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: 'react-animation/src/theme/keyframes.css',
        to: ''
      }
    ])
  ]
})
