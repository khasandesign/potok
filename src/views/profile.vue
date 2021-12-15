<template>
  <div>
    <Head>
      <title>Хасан Шадияров</title>
    </Head>

    <div class="container">
      <section id="info">
        <div class="col-xl-4 col-lg-6 col-md-8 mx-auto">
          <v-avatar src="profile.jpg" size="98"></v-avatar>
          <div class="name form-group" :style="[!edit ? {marginRight: '-40px'} : {marginRight: '0'}]">
            <input
                type="text"
                class="h4 text-block-input"
                v-model="profile.name"
                placeholder="Ваше имя..."
                ref="name"
                maxlength="20"
                readonly
                @input="typeWidth($event.target)">
            <v-button size="xl" icon="pencil" @click="edit = true" v-show="!edit" v-tip data-tip-id="editProfile"></v-button>
            <span class="length-left" v-show="edit"></span>
          </div>
          <input
              type="text"
              class="par-2 italic text-block-input mx-auto"
              v-model="profile.job"
              placeholder="Профессия..."
              ref="job"
              readonly>
          <div class="pattern">
            <svg width="25" height="9" viewBox="0 0 25 9" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                  d="M23.6497 2C23.6497 5.31371 20.9634 8 17.6497 8C10.9912 8 12.272 1 6.49127 1C1.99127 1 1.00006 5 1.00006 7.97833"
                  stroke="black"/>
            </svg>
          </div>
          <textarea
              type="text"
              class="par-3 desc px-md-4 text-block-input mx-auto w-100"
              v-model="profile.desc"
              placeholder="Расскажите о себе...
"             ref="desc"
              readonly
              maxlength="100"
              @input="autoGrow($event.target)"></textarea>
          <v-social-nets all></v-social-nets>
        </div>
      </section>
      <div class="medium-wrap">
        <section id="your-flows">
          <v-section-header headline="Ваши потоки">
            Кликните <kbd>ПКМ</kbd> по потоку чтобы изменить <br class="d-none d-xl-block"> его или сделать приватным.
          </v-section-header>
          <div class="row">
            <v-flow-card
                cripSrc="profile.jpg"
                cripName="Hasan Sh."
                title="Начинаем учить Python до джуна"
                annotation="Вот и я начал учить питончик, а шо поделать то?"
                art="art-3.svg"
            ></v-flow-card>
            <v-flow-card
                cripSrc="profile.jpg"
                cripName="Hasan Sh."
                title="Становление мидлом в PHP c практикой"
                annotation="Делаю эту подборку для себя чтобы стать мидлом"
                art="art-1.svg"
            ></v-flow-card>
            <v-add-flow-card></v-add-flow-card>
          </div>
        </section>
      </div>
    </div>

    <!--  Tips  -->
    <v-tip id="editProfile" class="tip-left" data-direction="left" tip-id="editProfile" action="Понятно">
      Сделать всю информацию <br> о себе изменяймой
    </v-tip>
  </div>
</template>

<script>
import autoGrow from "../mixins/autoGrow";
import lengthLeft from "../mixins/lengthLeft";

export default {
  data() {
    return {
      edit: false,
      profile: {
        name: 'Хасан Шадияров',
        job: 'Full Stack Developer',
        desc: 'Арт-директор и Middle Full Stack Разраб. Здесь чтобы создаваться свои потоки и развиваться быстрее всех.'
      },
      oldInfo: {
        name: '',
        job: '',
        desc: ''
      }
    }
  },
  mixins: [autoGrow, lengthLeft],
  beforeMount() {
    this.$emit('navbar', 'default')
  },
  watch: {
    edit(newValue) {
      if (newValue) {
        //  Save current info
        this.saveOldInfo()

        //  Set new navbar
        this.$emit('navbar', 'profile')

        //  Remove readonly attributes
        this.unlockInputs()

        //  Add vue model to use in event listeners
        var vm = this

      //  Listeners
      this.$nextTick(() => {
        document.querySelector('.save-profile').addEventListener('click', function () {
          //  Save profile in db...

          vm.edit = false
        })
        document.querySelector('.cancel-profile').addEventListener('click', function () {
          //  Reset old info
          vm.setOldInfo()

          vm.edit = false
        })
      })
      } else {
        //  Set default navbar
        this.$emit('navbar', 'default')

        //  Add readonly attributes
        this.lockInputs()
      }
    },
    save(newValue) {
      if (newValue) {
        this.$emit('navbar', 'default')
        //  Apply new profile info and show alert
      } else {
        this.$emit('navbar', 'default')
      }
    }
  },
  methods: {
    typeWidth(el) {
      if (el.value) {
        el.style.width = el.value.length + 4 + 'ch'
      } else {
        el.style.width = 'auto'
      }
    },
    unlockInputs() {
      let name = this.$refs.name,
          job = this.$refs.job,
          desc = this.$refs.desc
      name.removeAttribute('readonly')
      job.removeAttribute('readonly')
      desc.removeAttribute('readonly')
      name.select()
    },
    lockInputs() {
      let name = this.$refs.name,
          job = this.$refs.job,
          desc = this.$refs.desc
      name.setAttribute('readonly', true)
      job.setAttribute('readonly', true)
      desc.setAttribute('readonly', true)
    },
    saveOldInfo() {
      this.oldInfo.name = this.$refs.name.value
      this.oldInfo.job = this.$refs.job.value
      this.oldInfo.desc = this.$refs.desc.value
    },
    setOldInfo() {
      this.profile.name = this.oldInfo.name
      this.profile.job = this.oldInfo.job
      this.profile.desc = this.oldInfo.desc

      var el = this.$refs.name
      el.style.width = this.profile.name.length + 4 + 'ch'
    }
  },
  mounted() {
    this.typeWidth(this.$refs.name)
    this.autoGrow(this.$refs.desc)

    this.lengthLeft(this.$refs.name)
  }
}
</script>

<style lang="scss" scoped>
#info {
  text-align: center;
  margin-bottom: 88px;
  margin-top: 48px;

  .avatar {
    border-radius: 16px !important;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 18px;
  }

  .name {
    display: flex;
    align-items: center;
    justify-content: center;

    h4 {
      margin-bottom: 12px;
    }

    button {
      margin-top: -12px;
    }
  }

  .pattern {
    margin: 16px 0 16px 0;
  }

  .desc {
    margin-bottom: 32px;
  }

  .text-block-input {
    text-align: center;
    width: auto;
  }
}
</style>