// eslint-disable-next-line import/no-extraneous-dependencies
import webpack from 'webpack';
// eslint-disable-next-line import/no-extraneous-dependencies
import { merge } from 'webpack-merge';
// eslint-disable-next-line import/no-extraneous-dependencies
import path from 'path';
// eslint-disable-next-line import/extensions
import common from './webpack.js';

export default merge(common, {
    mode: 'development',

    // Global constants
    plugins: [
        new webpack.DefinePlugin({
            'process.env.mode': JSON.stringify('development'),
        }),
    ],

    // Dev Server: code refers to src instead of compiled/transpiled code
    devtool: 'source-map',

    // Dev Server: Served from ./dist folder
    devServer: {
        // Server
        static: {
            directory: path.resolve('dist'),
        },
        port: 3000,

        // Enable adress bar functionality for react-router
        historyApiFallback: {
            rewrites: [
                { from: /^.*\/main\.js$/, to: '/main.js' },
            ],
        },

        // Enable hot reloading
        hot: true,
        liveReload: true,
    },
});
