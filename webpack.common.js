const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = env => {

    return {
        entry: {
            theme: "./src/theme/index.js"
        },

        output: {
            filename: "assets/js/[name].[chunkHash].js",
            chunkFilename: 'assets/js/[name].[chunkHash].js',
            path: path.resolve(__dirname, 'dist'),
        },

        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: [
                        "babel-loader",
                        "eslint-loader"
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
                        }
                    ]
                },
                {
                    test: /\.html$/,
                    use: [
                        'html-loader'
                    ]
                }
            ]
        },

        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                hash: true,
                filename: 'index.html',
                template: './src/index.html',
                title: "Toheeb's Blog",
                toheeb: 'Custom for Toheeb'
            }),
        ]
    }
}
