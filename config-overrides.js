const path = require('path')
const { injectBabelPlugin } = require('react-app-rewired')
 
function resolve(dir) {
    return path.join(__dirname, '.', dir)
}
 
module.exports = function override(config, env) {
    // 添加 babel-plugin-import， 用于按需引入antd
    config = injectBabelPlugin(['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }], config)
    
    // 添加alias
    config.resolve.alias = {
        ...config.resolve.alias,
        '@': resolve('src')
    }
    
    // 添加scss
    config.module.rules.forEach(rule => {
        if (Array.isArray(rule.oneOf)) {
            rule.oneOf.forEach(item => {
                if (item.exclude && item.options && item.options.name === 'static/media/[name].[hash:8].[ext]') {
                    item.exclude.push(/\.scss$/)
                }
            })
            rule.oneOf.push({
                test: /\.scss$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader']
            })
        }
    })

    return config
}