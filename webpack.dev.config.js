const path = require('path');

const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');
const EvalSourceMapDevToolPlugin = require('webpack/lib/EvalSourceMapDevToolPlugin');

module.exports = {
    entry: {
        'main': './src/js/site.js',
    },
    resolve: {
        extensions: ['.js', '.json']
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                  fallback: 'style-loader',
                  use: 'css-loader'
                })
            },
            {
                test: /\.(jpg|png|gif|pdf)$/,
                use: 'file-loader'
            },
            {
              test: /\.(eot|woff2?|svg|ttf)([\?]?.*)$/,
              use: 'file-loader'
            }
        ]
    },
    plugins: [
        new EvalSourceMapDevToolPlugin({
            moduleFilenameTemplate: '[resource-path]',
            sourceRoot: 'webpack:///'
        }),
        new CommonsChunkPlugin({
            name: 'main',
            async: 'common',
            children: true,
            minChunks: 2
        }),
        new ExtractTextPlugin('[name].[contenthash].css'),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: { discardComments: {removeAll: true } },
            canPrint: true
        }),
        new CopyWebpackPlugin([
            { from: 'src/assets', to: 'assets' },
        ]),
        new HtmlWebpackPlugin({
            template: 'src/sites/cn/index.html',
            inject: 'body',
            xhtml: true,
            metadata: {
                isDevServer: true
            },
            minify: {
              caseSensitive: true,
              collapseWhitespace: true,
              keepClosingSlash: true
            },
            chunks: 'all',
            filename: 'index.html'
        }),
    ],
    devServer: {
        port: 3002,
        host: '127.0.0.1',
        historyApiFallback: true,
        watchOptions: {
          ignored: /node_modules/
        }
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
        sourceMapFilename: '[file].map',
        chunkFilename: '[name].chunk.js'
    }
};
