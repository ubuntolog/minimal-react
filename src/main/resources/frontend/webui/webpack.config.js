const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: ['./src/index.jsx'],
    output: {
        path: __dirname+"/app",
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {   test: /\.jsx?$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
                include: path.join(__dirname, 'src')
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    devServer: {
        contentBase: __dirname+"/app",
        historyApiFallback: true,
        proxy: {
            '/api/**': {
                target :'http://localhost:8088',
                changeOrigin: true,
                secure: false
            }
        }
    }
};
