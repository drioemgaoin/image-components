import App from './app';
import { ImagePage, UploadPage } from './components';
import { renderRoutes, RouteConfig } from 'react-router-config';

export interface IAppRoute extends RouteConfig {
    title?: string;
    routes?: IAppRoute[];
}

export const routes: IAppRoute[] = [
    {
        component: App,
        routes: [
            {
                path: '/image',
                component: ImagePage,
                title: 'Image'
            },
            {
                path: '/upload',
                component: UploadPage,
                title: 'Upload Image'
            }
        ]
    }
];

export default renderRoutes(routes);
