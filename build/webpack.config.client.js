/**
 * 客户端渲染
 */
const path = require("path")
const webpack = require("webpack")
const webpackMerge = require('webpack-merge')
const HtmlWebpackPlugin = require("html-webpack-plugin")
const baseConfig = require('./webpack.base');
const isDevelopment = process.env.NODE_ENV === "development"

const config = webpackMerge(baseConfig, {
    entry: {
        app: path.join(__dirname, "../client/app.js"),
    },
    output: {
        filename: "[name].[hash].js"
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "../client/template.html")
        }),
        new webpack.HotModuleReplacementPlugin() //react-hot-loader
    ]
})

//开发模式
if(isDevelopment) {
    config.entry = {
        app: [
          'react-hot-loader/patch', // react-hot-loader
          path.join(__dirname, '../client/app.js')
        ]
    }
    config.devServer = {
        host: "0.0.0.0",
        port: "8888",
        contentBase: path.join(__dirname, "../dist"),
        overlay: { // 黑色背景弹错误信息
            errors: true
        },
        publicPath: "/public",
        historyApiFallback: {
            index: "/public/index.html"
        },
        hot: true, // react-hot-loader
    }
}

module.exports = config;
