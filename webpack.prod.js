/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/extensions */
import { merge } from 'webpack-merge';
import common from './webpack.common.js';

/** @type {import('webpack').Configuration} */
export default merge(common, {
    mode: 'production',
});
