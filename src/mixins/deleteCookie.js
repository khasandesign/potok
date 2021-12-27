import getCookie from "./getCookie";

export default {
    mixins: [getCookie],
    methods: {
        deleteCookie(name, path = null, domain = null) {
            let cookies = this.getCookie()
            if (cookies[name]) {
                document.cookie = name + "=" + ((path) ? ";path=" + path : "") + ((domain) ? ";domain=" + domain : "") + ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
            }
        }
    }
}