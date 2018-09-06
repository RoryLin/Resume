"use strict";
const devMode = process.env.NODE_ENV !== 'production';
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');

module.exports = {
    entry: path.resolve(__dirname, './src/index.js'),
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        hot: true,
        compress: true
    },
    module: {
        rules: [
            {
                test: /\.pug$/,
                use: ['pug-loader']
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [ devMode ? 'style-loader' : MiniCssExtractPlugin.loader,'style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new MiniCssExtractPlugin({
            filename: "[name].[hash].css",
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.pug'),
            filename: 'index.html'
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    output: {
        filename: 'app.[hash].js',
        path: path.resolve(__dirname, 'dist')
    },

};