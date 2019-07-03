let webpack = require('webpack');
let HtmlPlugin = require('html-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');
let ExtractTextPlugin = require('mini-css-extract-plugin');
let rules = require('./webpack.config.rules');
let path = require('path');

rules.push({
    test: /\.css$/,
    use: ExtractTextPlugin.loader
});

module.exports = {
    entry: {
        cookie: './src/cookie.js'
    },
    devServer: {
        index: './src/cookie.html'
    },
    output: {
        filename: '[name].[hash].js',
        path: path.resolve('dist')
    },
    devtool: 'source-map',
    module: { rules },
    plugins: [
        new ExtractTextPlugin('styles.css'),
        new HtmlPlugin({
            title: 'Cookies',
            template: './src/cookie.hbs',
            filename: './src/cookie.html',
            chunks: ['cookie']
        }),
        new CleanWebpackPlugin(['dist'])
    ]
};