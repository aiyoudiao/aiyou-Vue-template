/*
 * @Descripttion: aiyoudiao
 * @version: 1.0.0
 * @Author: aiyoudiao
 * @Date: 2020-08-08 21:04:26
 * @LastEditTime: 2020-08-09 18:51:16
 * @LastEditors: aiyoudiao
 * @FilePath: \web-fornt\vue.config.js
 */
const path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    /* 所有的资源都会被链接为相对路径，这样打出来的包可以被部署在任意路径 */
    publicPath: process.env.NODE_ENV === 'production' ? '' : '',
    // publicPath: '',
    /* 生成的生产环境构建文件的目 */
    outputDir: 'dist',
    /* 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录 */
    assetsDir: '',
    /* 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。
    https://cli.vuejs.org/zh/config/#indexpath
  */
    indexPath: 'index.html',
    /* 生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存。 */
    filenameHashing: true,

    /* 在开发环境下通过 eslint-loader 在每次保存时 lint 代码 */
    lintOnSave: true,
    /* 不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建 */
    productionSourceMap: false,
    /* 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。 */
    parallel: true,
    /* https://cli.vuejs.org/zh/guide/html-and-static-assets.html#%E4%BB%8E%E7%9B%B8%E5%AF%B9%E8%B7%AF%E5%BE%84%E5%AF%BC%E5%85%A5 */
    chainWebpack: config => {
        config.module
        .rule('images')
        .use('url-loader')
        .loader('url-loader')
        .tap(options => Object.assign(options, { limit: 10240 }))

        config.resolve.alias
        .set('@src', resolve('src'))
        .set('@assets', resolve('src/assets'))
        .set('@common', resolve('src/common'))
        .set('@components', resolve('src/components'))
        .set('@constant', resolve('src/constant'))
        .set('@router', resolve('src/router'))
        .set('@store', resolve('src/store'))
        .set('@views', resolve('src/views'))
        .set('@permission', resolve('src/permission'))
    },
    devServer: {
        port: 8080,
        open: true,
        overlay: {
            warnings: false,
            errors: true,
        },
        proxy: {
            '/business': {
                target: 'http://localhost:8888', // 对应自己的接口
                // target: 'http://xxxx/device/', // 对应自己的接口
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/business': '/business',
                },
            },
        },
        // before: require('./mock/mock-server.js'),
        // before: app => {
        //     app.get('/api/info', (req, res) => {
        //         res.json({
        //             errno: 0,
        //             data: {
        //                 info: 'success',
        //                 code: '0000',
        //             },
        //         })
        //     })
        // },
    },
}
