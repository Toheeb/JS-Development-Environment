const merge = require('webpack-merge');
const commonConfig = require('./webpack.common')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


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
                    "css-loader",
                    "sass-loader"
                ]
            },
        ]
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: 'assets/css/[name].[contentHash].css',
            chunkFilename: '[[id].[contentHash]].css'
        })
    ]
};
