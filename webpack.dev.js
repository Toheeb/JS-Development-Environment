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
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|svg|jpe?g|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false,
                            name: '[name].[ext]?[hash]',
                            // path: path.resolve(__dirname, 'dist'),
                            outputPath: 'assets/images'
                        }
                    },
                ]
            },
        ]
    }
};
