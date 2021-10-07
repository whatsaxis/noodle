const path = require('path')
const rules = require('./rules.webpack.config')

module.exports = {
    mode: 'production',
    ...rules
}