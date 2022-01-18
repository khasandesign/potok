<template>
  <img class="icon undraggable" @click="!area ? switchIcon : ''" :style="{ width: customSize + 'px', height: customSize + 'px'}" :src="require(`@/assets/icons/${path}`)" :data-click="pathClick ? require(`@/assets/icons/${pathClick}`) : ''"/>
</template>


<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    click: {
      type: String,
    },
    size: {
      type: String,
      default: '24'
    },
    customSize: {
      type: String,
      required: false,
    },
    area: {
      type: String,
      default: ''
    }
  },
  name: 'v-icon',
  data() {
    return {
      path: this.size + 'px' + '/i-' + this.name + '-' + this.size + 'px.svg',
      pathClick: this.click ? this.size + 'px' + '/i-' + this.click + '-' + this.size + 'px.svg' : false
    }
  },
  mounted() {
    if (this.area) {
      document.querySelector(this.area).addEventListener('click', function () {
        let icon = this.querySelector('.icon'),
            click = icon.getAttribute('data-click')

        if (click !== '') {
          icon.src = icon.getAttribute('data-click')
        }
      })
    }
  },
  methods: {
    switchIcon(e) {
      let click = e.target.getAttribute('data-click')
      if (click !== '' && this.area) {
        e.target.src = e.target.getAttribute('data-click')
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
