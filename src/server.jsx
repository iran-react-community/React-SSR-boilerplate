import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {StaticRouter} from 'react-router-dom';
import {Helmet} from "react-helmet";
import Template from './app/template';
import App from './app/App';
import {JssProvider, SheetsRegistry} from 'react-jss'

export default function serverRenderer({clientStats, serverStats}) {
    return (req, res, next) => {
        const sheets = new SheetsRegistry()
        const context = {};
        const markup = ReactDOMServer.renderToString(
            <JssProvider registry={sheets}>
                <StaticRouter location={req.url} context={context}>
                    <App/>
                </StaticRouter>
            </JssProvider>
        );
        const helmet = Helmet.renderStatic();

        res.status(200).send(Template({
            markup: markup,
            helmet: helmet,
            sheets : sheets
        }));
    };
}
