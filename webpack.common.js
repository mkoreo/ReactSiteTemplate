/* eslint-disable import/no-extraneous-dependencies */
import path from 'path';
import CopyPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
        new CopyPlugin({
            patterns: [
                { from: 'src/public', to: '' },
            ],
        }),
    ],

    // Configure entry points
    entry: './src/index.tsx',

    resolve: {
        // How should webpack look for modules.
        // First search in local src, then node_modules. Resolve extensions automatically.
        modules: [path.join(import.meta.url, 'src'), 'node_modules'],
        extensions: ['.ts', '.tsx', '.js', '.mjs', '.cjs'],
    },

    module: {
        // The "use" property array is run from right to left.
        rules: [
            {
                // Provide image as resources sepperatly.
                // TODO: Investigate how a cdn can host this.
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: 'asset/resource',
            },
            {
                // Fonts
                test: /\.(woff|woff2|eot|ttf)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: './font/[hash].[ext]',
                        mimetype: 'application/font-woff',
                    },
                }],
            },
            {
                // Load and compile TS with TSC
                // Use babel to transpile for older browsers
                // See .babelrc for configuration
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                    },
                    {
                        loader: 'ts-loader',
                    },
                ],
            },
        ],
    },
    output: {
        // Output to the "dist" folder. Clean before build
        path: path.resolve('dist'),
        publicPath: '/',
        clean: true,

        filename: 'index.js',

        // The devtool: "source-map" supplies source maps but webpack uses a special protocol to resolve the location
        // To allow debugging with vscode, following makes it resolve with an actual filepath.
        // This prevents use from having to map source map locations to actual files on disk in the launch config.
        devtoolModuleFilenameTemplate(info) {
            return `file:///${encodeURI(info.absoluteResourcePath)}`;
        },
    },
};
