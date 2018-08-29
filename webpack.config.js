const path = require('path');

const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

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
                isDevServer: false
            },
            minify: {
              caseSensitive: true,
              collapseWhitespace: true,
              keepClosingSlash: true
            },
            chunks: 'all',
            excludeChunks: ['operator'],
            filename: 'index.html'
        }),
        new UglifyJsPlugin({
            sourceMap: true,
            uglifyOptions: {
                ecma: 5,
                warnings: false,    // TODO verbose based on option?
                ie8: false,
                mangle: true,
                compress: {
                    pure_getters: true, /* buildOptimizer */
                    // PURE comments work best with 3 passes.
                    // See https://github.com/webpack/webpack/issues/2899#issuecomment-317425926.
                    passes: 3
                },
                output: {
                  ascii_only: true,
                  comments: false
                }
            }
        })
    ],
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].[chunkhash].bundle.js',
        sourceMapFilename: '[file].map',
        chunkFilename: '[name].[chunkhash].chunk.js'
    }
};
