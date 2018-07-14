const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:9090',
    'webpack/hot/only-dev-server',
    path.resolve(__dirname, '../src/main.js'),
  ],
  //指定入口文件，程序从这里开始编译,__dirname当前所在目录
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      'libs': path.resolve(__dirname, '../libs'),
      'assets': path.resolve(__dirname, '../assets'),
      'utils': path.resolve(__dirname, '../utils'),
    }
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      loader: ['babel-loader'],
      exclude: /node_modules/
    }, {
      test: /\.less$/,
      use: [
        'style-loader', {
          loader: 'css-loader?modules',
          options: {
            importLoaders: 1
          }
        },
        'less-loader'
      ]
    }, {
      test: /\.css$/,
      use: [
        'style-loader', //模块运行时，使用<style>标签将所有计算好的css样式插入到html文件的<head>中
        'css-loader' //为了从JavaScript模块中import一个CSS 文件
      ]
      /*
       * webpack loader的执行顺序是从右到左
       * webpack肯定是先将所有css模块依赖解析完得到计算结果再创建style标签
       * 因此应该把style-loader放在css-loader的前面
       */
    }, {
      test: /\.(png|svg|jpg|gif)$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
      }
      /*
       * url-loader 功能类似于 file-loader，但是在文件大小（单位 byte）低于指定的限制时，可以返回一个 DataURL。
       * 在使用css-loader时，url('')
       * 或者在使用html-loader时，<img src='' />
       * 或者在js文件中，import from ''
       * webpack都会在src文件中找到图片文件，处理并添加到output目录
       */
    }, {
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
      }
      /*
       * file-loader可以接收并加载任何文件处理并添加到output目录
       */
    }, ]
  },
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ],
}