module.exports = {
    publicPath: '/',
    css: {
        loaderOptions: {
            sass: {
                prependData: `@import "@/assets/scss/global.scss";`,
            },
        },
    },

};