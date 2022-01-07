export default {
    methods: {
        setNavbar(navbar) {
            this.$emit('navbar', navbar)
        },
        setFooter(footer) {
            this.$emit('footer', footer)
        }
    }
}