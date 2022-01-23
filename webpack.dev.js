/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/extensions */
import webpack from 'webpack';
import { merge } from 'webpack-merge';
import path from 'path';
import common from './webpack.common.js';

export default merge(common, {
    mode: 'development',

    plugins: [
        new webpack.DefinePlugin({
            // Replace following text in all bundled files.
            'process.env.mode': JSON.stringify('development'),
        }),
    ],

    // devtool source map provides extra code, mapping the bundled code to the original src files.
    // This allows debugging from the editor on compiled code.
    devtool: 'source-map',

    devServer: {
        static: {
            // Serve static content
            directory: path.resolve('dist'),
        },
        port: 3000,

        // TODO: Evaluate functionality. Must rename the JS for sure.
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
