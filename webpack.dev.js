const path = require('path');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');

const smp = new SpeedMeasurePlugin();

module.exports = env => {

  const mergedConfig = merge(commonConfig(env), developmentConfig);

  if ( env && env.speed === true) {
    return smp.wrap(mergedConfig);
  }

  return mergedConfig;
}

const developmentConfig = {

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
                test:/\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            importLoaders: 1
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        // options: {
                        //     sourceMap: true
                        // }
                    }
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
