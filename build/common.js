const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProductionMode = process.env.NODE_ENV === 'production';

module.exports = {
    entry: {
        main: path.resolve(__dirname, '..', './src/index.ts'),
    },
    output: {
        filename: '[name].[contenthash].bundle.js',
        chunkFilename: '[name].[contenthash].bundle.js',
        path: path.resolve(__dirname, '..', './dist'),
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        roots: [path.resolve(__dirname), '..', './src'],
    },
    optimization: {
        moduleIds: 'deterministic',
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all',
            maxInitialRequests: Infinity,
            minSize: 0,
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name(module) {
                        // get the name. E.g. node_modules/packageName/not/this/part.js
                        // or node_modules/packageName
                        const packageName = module.context.match(
                            /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                        )[1];

                        // npm package names are URL-safe, but some servers don't like @ symbols
                        return `npm.${packageName.replace('@', '')}`;
                    },
                },
            },
        },
    },

    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/i,
                exclude: /node_modules/,
                use: ['swc-loader'],
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/i,
                exclude: /node_modules/,
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                exclude: /node_modules/,
                type: 'asset/resource',
            },
            {
                test: /\.svg$/i,
                use: ['@svgr/webpack'],
            },
            {
                test: /\.css$/i,
                exclude: /node_modules\/?!(modern-normalize\)\/).*/,
                use: [
                    {
                        loader: isProductionMode
                            ? MiniCssExtractPlugin.loader
                            : 'style-loader',
                        options: {
                            esModule: true,
                        },
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            esModule: true,
                        },
                    }
                ],
            },
        ],
    },

    plugins: [
        new CleanWebpackPlugin({cleanStaleWebpackAssets: false}),
        new HtmlWebpackPlugin({
            title: 'BabylonJS Starter Template',
            favicon: path.resolve(__dirname, '..', './public/favicon.ico'),
            template: path.resolve(__dirname, '..', './public/index.html'),
            hash: true,
            scriptLoading: 'defer',
            inject: 'head', // head better for extension
            excludeChunks: ['manifest', 'background'],
        }),
        new MiniCssExtractPlugin({
            filename: isProductionMode ? '[name].[contenthash].css' : '[name].css',
        }),
    ],
};
