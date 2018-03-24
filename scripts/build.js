const chalk = require('chalk');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.prod.js');

const config = require('../configuration');

function printErrors(summary, errors) {
    console.log(chalk.red(summary));
    console.log();
    errors.forEach(err => {
        console.log('##[error]: ', err.message || err);
        console.log();
    });
}

webpack(webpackConfig).run((err, stats) => {
    if (err) {
        printErrors('##[error]: Failed to compile.', [err]);
        process.exit(1);
    }

    if (stats.compilation.errors.length) {
        printErrors('##[error]: Failed to compile.', stats.compilation.errors);
        process.exit(1);
    }
});
