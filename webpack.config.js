const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: './src/index.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new MiniCssExtractPlugin({filename: 'index.css'})
    ],
    module: {
        rules: [
            {
                test: /\.qs$/,
                use: './utils/qsParser.js',
                exclude: '/node_modules/'
            },
            {
                test: /\.ls$/,
                use: './utils/listParser.js',
                exclude: '/node_modules/'
            },
            {
                //test: /\.(png|jpe?g|gif)$/i,
                test: /\.png$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[name][ext]'
                }
                //loader: 'file-loader',
            },
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: '/node_modules/'
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ],
                exclude: '/node_modules/'
            }
        ]
    },
    resolve: {
        extensions: ['.ts']
    }
}