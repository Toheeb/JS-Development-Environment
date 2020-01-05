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
                        {
                          loader: "eslint-loader",
                          options: {
                            fix: true
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
                toheeb: 'Custom for Toheeb',
                minify: {
                    collapseInlineTagWhitespace: true,
                    collapseWhitespace: true,
                    removeComments: true,
                }
            }),
        ]
    }
}
