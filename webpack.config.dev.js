const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = require('./configuration');

module.exports = {
    entry: [
        'react-hot-loader/patch',
        'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
        `webpack-dev-server/client?http://localhost:${config.devServer.port}`, // WebpackDevServer host and port
        config.entry.component
    ],

    mode: 'development',

    devtool: 'inline-source-map',

    output: {
        filename: 'index.js',
        libraryTarget: 'umd',
        path: config.output.path,
        publicPath: config.output.publichPath
    },

    devServer: {
        hot: true,
        contentBase: config.output.path,
        port: config.devServer.port,
        publicPath: '/',
        stats: 'minimal'
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
                    {
                        loader: 'style-loader' // creates style nodes from JS strings
                    },
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
        new HtmlWebpackPlugin({
            template: config.demo.template,
            filename: config.demo.filename
        }),
        new webpack.HotModuleReplacementPlugin() // enable HMR globally
    ]
};
