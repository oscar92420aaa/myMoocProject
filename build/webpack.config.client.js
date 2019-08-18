/**
 * 客户端渲染
 */
const path = require("path")
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin")
const isDevelopment = process.env.NODE_ENV === "development"

const config = {
    entry: {
        app: path.join(__dirname, "../client/app.js"),
    },
    output: {
        path: path.join(__dirname, "../dist"),
        filename: "[name].[hash].js",
        publicPath: "/public"
    },
    module: {
        rules: [
            {
                enforce: 'pre', // 强制在babel-loader之前进行eslint检查，如错误不继续执行
                test: /.(js|jsx)$/,
                loader: 'eslint-loader',
                exclude: [
                    path.resolve(__dirname, '../node_modules')
                ]
            },
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
            },
            {
              test: /.js$/,
              loader: 'babel-loader',
              exclude: [
                path.join(__dirname, '../node_modules')
              ]
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "../client/template.html")
        }),
        new webpack.HotModuleReplacementPlugin() //react-hot-loader
    ]
}

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