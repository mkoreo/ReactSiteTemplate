/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/extensions */
import { merge } from 'webpack-merge';
import common from './webpack.common.js';

export default merge(common, {
    mode: 'production',
});
