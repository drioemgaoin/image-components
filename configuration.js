const path = require('path');

function getPath(folder) {
    return path.join(__dirname, folder);
}

module.exports = {
    entry: {
        component: getPath('demo/index.tsx'),
        style: getPath('src/styles/index.scss')
    },
    src: {
        path: getPath('src')
    },
    output: {
        path: getPath('dist'),
        publichPath: '/',
        styleFileName: 'style.css'
    },
    demo: {
        path: getPath('demo'),
        template: getPath('static/demo/index.html'),
        filename: getPath('dist/index.html')
    },
    devServer: {
        port: 9000
    }
};
