const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // подключите плагин
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: { main: './src/pages/index.js' },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'main.js',
        publicPath: ''
    },
    mode: 'development',
    devServer: {
        static: path.resolve(__dirname, './dist'),
        compress: true,
        port: 8080,
        open: true
    },
    module: {
        rules: [{
            test: /\.js$/,// регулярное выражение, которое ищет все js файлы
            use: 'babel-loader',// при обработке этих файлов нужно использовать babel-loader
            exclude: '/node_modules/'// исключает папку node_modules, файлы в ней обрабатывать не нужно
        },
        // добавили правило для обработки файлов
        {
            // регулярное выражение, которое ищет все файлы с такими расширениями

            test: /\.(png|svg|jpg|jpeg|gif)$/,
            type: 'asset/resource',
            generator: {
                filename: 'images/[name].[hash][ext]',
            }
        },
        {
            test: /\.(woff|woff2|eot|ttf|otf)$/i,
            type: 'asset/resource',
            generator: {
                filename: 'fonts/[name].[hash][ext]',
            }
        },
        {
            // применять это правило только к CSS-файлам
            test: /\.css$/,
            // при обработке этих файлов нужно использовать
            // MiniCssExtractPlugin.loader и css-loader
            use: [MiniCssExtractPlugin.loader, {
                loader: 'css-loader',
                options: { importLoaders: 1 }
            },
                'postcss-loader'
            ]
        },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html' // путь к файлу index.html
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin(),
    ]
};