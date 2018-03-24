const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompileTimePlugin = require('webpack-compile-time-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin'); // ERROR CAUSED BY THAT

const config = require('./configuration');

module.exports = {
    entry: [config.entry.component, config.entry.style],

    mode: 'production',

    output: {
        filename: 'index.js',
        libraryTarget: 'umd',
        path: config.output.path,
        publicPath: config.output.publichPath
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },

    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                enforce: 'pre',
                loader: 'tslint-loader',
                include: [config.src.path, config.demo.path]
            },
            {
                test: /\.(ts|tsx)$/,
                loader: 'ts-loader',
                options: {
                    transpileOnly: true
                },
                include: [config.src.path, config.demo.path]
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader', // translates CSS into CommonJS
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader', // compiles Sass to CSS
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            }
        ]
    },

    plugins: [
        new CompileTimePlugin(),
        new MiniCssExtractPlugin({
            filename: config.output.styleFileName,
            chunkFilename: config.output.styleFileName
        })
    ]
};
