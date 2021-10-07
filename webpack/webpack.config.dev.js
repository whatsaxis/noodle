const rules = require('./rules.webpack.config')

const CopyPlugin = require("copy-webpack-plugin")

module.exports = {
    mode: 'development',
    watch: true,
    watchOptions: {
        poll: 500
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: 'dev/index.html' },
            ],
            options: {
                concurrency: 100,
            },
        }),
    ],
    ...rules
}