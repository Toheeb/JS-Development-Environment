const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
    entry: {
        main: [ "./src/index.js" ],
        app: "./src/app.js"
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, 'dist')
        // filename: "./dist/[name].bundle.js"
    },
    target: 'web',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test:/\.(s)css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            hash: true,
            filename: 'main.html',
            template: './src/index.html',
            title: "Toheeb's Blog",
            toheeb: 'Custom for Toheeb',
            // chunks by default means all js files.
            chunks: ["main"]
        }),
        new HtmlWebpackPlugin({
            hash: true,
            filename: 'app.html',
            template: './src/app.html',
            // title: "Toheeb's Blog",
            chunks: ["app"]
        })

    ]
}
