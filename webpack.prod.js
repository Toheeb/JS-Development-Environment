const merge = require('webpack-merge');
const commonConfig = require('./webpack.common')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssnano = require('cssnano');
// const ImageminPlugin = require('imagemin-webpack-plugin').default;

module.exports = env => {

    return merge(commonConfig(env), prodConfig);
}


const prodConfig = {

    mode: 'production',

    devtool: 'source-map',

    stats: {
        children: false,
        maxModules: 0,
    },

    module: {
        rules: [
            {
                test:/\.(s*)css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // Sets public path for assets inside CSS!
                            // This is prior to directories specified by filename in MiniCssExtractPlugin
                            publicPath: './../../'
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    "sass-loader"
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
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 100
                              },
                              // optipng.enabled: false will disable optipng
                              optipng: {
                                enabled: false,
                              },
                              pngquant: {
                                quality: [0.8, 0.90],
                                speed: 4
                              },
                              gifsicle: {
                                interlaced: false,
                              },
                              // the webp option will enable WEBP
                              webp: {
                                quality: 80
                              }
                        }
                    }
                ]
            }
        ]
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: 'assets/css/[name].[contentHash].css',
            chunkFilename: 'assets/css/[name].[contentHash].css'
        }),
        new OptimizeCSSAssetsPlugin({
            cssProcessor: cssnano,
            cssProcessorOptions: {
                discardComments: {
                    removeAll: true
                },
                map: {
                    inline: false,
                    annotation: true
                },
                safe: true
            },
            canPrint: false // False, if Bundle Analyzer will be used!
        }),
        // new ImageminPlugin()
    ],

};
