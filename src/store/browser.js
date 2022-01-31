const browser = {
    state: {
        underConstruction: false, // Create seperated api endpoint for this,
        browserSupport: true,
        browserInfo: null,
        browserTempBlock: {
            // firefox: {
            //     only: true,
            //     version: 96
            // },
        },
        browserList: {
            chrome: {
                version: 50
            },
            safari: {
                version: 12
            },
            firefox: {
                version: 60
            },
            opera: {
                version: 40
            },
            edge: {
                version: 41
            },
            chromeIOS: {
                version: 50
            },
            firefoxIOS: {
                version: 10
            },
            safariIOS: {
                version: 11
            }
        }
    },
    mutations: {
        /**
         * Check if used browser is allowed
         * @param state
         * @param browserInfo
         */
        checkBrowser(state, browserInfo) {
            function validateVersion(rules, version) {
                if (rules.version > Number(version)) {
                    state.browserSupport = false
                }
                state.browserInfo = browserInfo
                state.browserInfo.msg = msg

                // Check are there browser for temp blocking
                if (state.browserTempBlock && Object.keys(state.browserTempBlock).length !== 0) {
                    if (browserInfo.meta.name.toLowerCase() in state.browserTempBlock) {
                        let index = browserInfo.meta.name.toLowerCase(),
                            version = Number(browserInfo.meta.version)

                        if (state.browserTempBlock[index].only) {
                            if (version === state.browserTempBlock[index].version) {
                                state.underConstruction = true
                            }
                        } else {
                            if (version <= state.browserTempBlock[index].version) {
                                state.underConstruction = true
                            }
                        }
                        return false
                    }
                }

                return false
            }

            let rules,
                msg

            if (browserInfo.isBrave) {
                rules = state.browserList.brave
                msg = 'Brave browser'
            }
            if (browserInfo.isChrome) {
                if (browserInfo.meta.name === 'Chrome') {
                    rules = state.browserList.chrome
                    msg = 'Chrome or Chromium browser'
                }
            }
            if (browserInfo.isChromeIOS) {
                rules = state.browserList.chromeIOS
                msg = 'Chrome IOS browser'
            }
            if (browserInfo.isEdge) {
                if (browserInfo.meta.name === 'Chrome') {
                    rules = state.browserList.edge
                    msg = 'Chromium Edge browser'
                } else {
                    state.browserSupport = false
                    msg = 'Personal core Edge browser'
                    return false
                }
            }
            if (browserInfo.isFirefox) {
                if (browserInfo.isIOS) {
                    rules = state.browserList.firefoxIOS
                    msg = 'IOS Firefox browser'
                } else {
                    rules = state.browserList.firefox
                    msg = 'Firefox browser'
                }
            }
            if (browserInfo.isIE || browserInfo.meta.name === 'MSIE' || browserInfo.meta.name === 'IE') {
                state.browserSupport = false
                msg = 'IE browser'
                return false
            }
            if (browserInfo.isOpera) {
                rules = state.browserList.opera
                msg = 'Opera browser'
            }
            if (browserInfo.isSafari || browserInfo.meta.name === 'Safari') {
                if (browserInfo.isIOS) {
                    rules = state.browserList.safariIOS
                    msg = 'IOS Safari browser'
                } else {
                    rules = state.browserList.safari
                    msg = 'Safari browser'
                }
            }

            if (!rules) {
                state.browserSupport = false
                msg = 'Browser is not defined'
                return false
            }

            validateVersion(rules, browserInfo.meta.version, msg)
        }
    },
    actions: {},
}

export default browser