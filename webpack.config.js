const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

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
            // {
            //     test: /\.qs/,
            //     use: 'raw-loader',
            //     exclude: '/node_modules/'
            // },
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