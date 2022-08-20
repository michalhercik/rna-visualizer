const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    index: './src/rnavis.ts',
  },
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
  },
  output: {
     filename: '[name].js',
     path: path.resolve(__dirname, 'dist'),
     clean: true,
     globalObject: 'this',
     libraryTarget: 'umd',
     library: 'rna-visualizer',
     umdNamedDefine: true
   },
  optimization: {
    runtimeChunk: 'single',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};

