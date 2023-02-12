const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  stats: 'errors-only',
  entry: {
    index: './src/index.ts',
  },
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/groups.html',
      title: 'Groups',
      filename: 'groups.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/transformation.html',
      title: 'Transformation',
      filename: 'transformation.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/layers.html',
      title: 'Layers',
      filename: 'layers.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/combination.html',
      title: 'Combination',
      filename: 'combination.html',
    }),
  ],
  output: {
     filename: '[name].js',
     path: path.resolve(__dirname, 'dist'),
     clean: true,
     globalObject: 'this'
   },
  optimization: {
    runtimeChunk: 'single',
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
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

