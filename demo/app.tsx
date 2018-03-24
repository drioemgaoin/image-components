import * as React from 'react';
import { NavLink, Route } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { Navbar, Nav, NavItem, NavbarBrand } from 'reactstrap';
import { sortBy } from 'lodash';

import { routes, IAppRoute } from './routes';

import 'bootstrap/dist/css/bootstrap.css';
import '../src/styles/index.scss';
import './style.scss';

export interface AppProps {
    route: any;
}

export default class App extends React.Component<AppProps, undefined> {
    render() {
        return (
            <div className="App">
                <Navbar className="App__navbar" color="faded" light>
                    <NavbarBrand href="#/">Image Components</NavbarBrand>
                    <Nav navbar>{this.renderSectionLink()}</Nav>
                </Navbar>
                <div className="App__content">{renderRoutes(this.props.route.routes)}</div>
            </div>
        );
    }

    private renderSectionLink() {
        return sortBy(this.props.route.routes, ['title'])
            .filter((r: any) => r.component)
            .map((r: any) => (
                <NavItem key={r.path}>
                    <NavLink
                        to={r.path}
                        activeClassName="App__navbar__link__active"
                        className="nav-link App__navbar__link"
                        replace
                    >
                        {r.title || 'NO NAME GIVEN'}
                    </NavLink>
                </NavItem>
            ));
    }
}
