import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { HashRouter, Route } from 'react-router-dom';

import routes from './routes';

const render = () => {
    ReactDOM.render(
        <AppContainer>
            <HashRouter basename="/">{routes}</HashRouter>
        </AppContainer>,
        document.getElementById('root')
    );
};

render();

const anyModule = module as any;
if (anyModule.hot) {
    anyModule.hot.accept(() => {
        render();
    });
}
