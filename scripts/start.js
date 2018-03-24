const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const chalk = require('chalk');
const openBrowser = require('react-dev-utils/openBrowser');

const config = require('../webpack.config.dev.js');

let compiler = webpack(config);
let server = new webpackDevServer(compiler, config.devServer).listen(
    config.devServer.port,
    'localhost',
    (error, result) => {
        if (error) {
            chalk.red(error);
        }

        openBrowser(`http://localhost:${config.devServer.port}`);
        console.log(chalk.green(`Dev server is running on port: ${config.devServer.port}`));
    }
);
