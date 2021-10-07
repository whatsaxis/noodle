const path = require('path')

module.exports = {
    module: {
        rules: [
            {
                test: /\.(png|jpg|jpeg|svg)$/i,
                use: 'url-loader'
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(ts|tsx)$/i,
                use: 'ts-loader',
                exclude: /node_modules/
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        path: path.resolve(__dirname, '../build'),
        filename: 'bundle.js',
        clean: true
    },
}