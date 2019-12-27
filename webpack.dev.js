const path = require('path');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common');


module.exports = env => {

    return merge(commonConfig(env), devConfig);
}

const devConfig = {

    mode: 'development',

    devtool: 'inline-source-map',

    devServer: {
        compress: true,
        stats: {
            children: false,
            maxModules: 0,
        }
    },

    output: {
        publicPath: '/'
    },

    module: {
        rules: [
            {
                test:/\.(s*)css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
        ]
    }
};
