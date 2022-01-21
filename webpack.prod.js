// eslint-disable-next-line import/no-extraneous-dependencies
import { merge } from 'webpack-merge';
// eslint-disable-next-line import/extensions
import common from './webpack.js';

export default merge(common, {
    mode: 'production',
});
