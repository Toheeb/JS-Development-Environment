const merge = require('webpack-merge');
const commonConfig = require('./webpack.common')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');

const smp = new SpeedMeasurePlugin();

module.exports = env => {

  const mergedConfig = merge(commonConfig(env), productionConfig);

  if (env && env.speed === true) {
    return smp.wrap(mergedConfig);
  }

  return mergedConfig;
}


const productionConfig = {

  mode: 'production',

  devtool: 'source-map',

  stats: {
    children: false,
    maxModules: 0,
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // Sets public path for assets inside CSS!
              // This is prior to directories specified by filename in MiniCssExtractPlugin
              publicPath: './../../',
            }
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
            options: {
              sourceMap: true
            }
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
    })
  ],

};
