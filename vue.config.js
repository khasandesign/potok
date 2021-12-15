module.exports = {
    publicPath: '/',
    chainWebpack: config => {
        config.module
            .rule('vue')
            .use('vue-loader')
            .tap(options => {
                prettify: false
                return options
            })
    },
    css: {
        loaderOptions: {
            sass: {
                prependData: `@import "@/assets/scss/app.scss";`,
            },
        },
    },

};