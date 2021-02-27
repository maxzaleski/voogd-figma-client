const path = require('path');
const webpack = require('webpack');
const TerserJSPlugin = require('terser-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const { version } = require('./package.json');

module.exports = {
  target: 'node',
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve('./lib'),
    filename: `voogd-figma-client-${version}.min.js`,
    library: 'Voogd',
    libraryTarget: 'umd'
  },
  optimization: {
    minimizer: [
      new TerserJSPlugin({
        cache: false,
        terserOptions: {
          output: { comments: false }
        }
      })
    ]
  },
  plugins: [new webpack.optimize.ModuleConcatenationPlugin()],
  externals: [nodeExternals()]
};
