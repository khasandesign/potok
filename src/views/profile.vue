<template>
  <div>
    <Head>
      <title>{{ profile.name }}</title>
    </Head>

    <div class="container">
      <section id="info">
        <div class="col-xxl-4 col-xl-6 col-md-8 mx-auto">
          <div class="profile">
            <label for="avatar-upload" class="avatar-upload-label anim-click">
              <div class="overlay" v-show="edit">
                <v-icon name="camera" size="44"></v-icon>
              </div>
              <v-avatar ref="avatar" :src="'user/original/' + profile.avatar.name" size="98"></v-avatar>
            </label>
            <div class="visually-hidden">
              <input type="file" name="avatar" id="avatar-upload"
                     @change="uploadAvatar($event.target)" :disabled="!edit">
              <canvas class="avatar-canvas"></canvas>
            </div>
            <div class="name form-group">
              <input
                  type="name"
                  class="h4 text-block-input"
                  v-model="profile.name"
                  placeholder="Ваше имя..."
                  ref="name"
                  maxlength="100"
                  readonly
                  @input="typeWidth($event.target)">
              <v-button size="xl" icon="pencil" @click="edit = true" v-show="!edit" v-tip
                        data-tip-id="editProfile"></v-button>
              <span class="length-left" v-show="edit"></span>
            </div>
            <div class="profession form-group">
              <input
                  type="text"
                  class="par-2 italic text-block-input mx-auto"
                  v-model="profile.profession"
                  placeholder="Профессия..."
                  ref="profession"
                  maxlength="50"
                  readonly>
              <span class="length-left" v-show="edit"></span>
            </div>
            <v-pattern></v-pattern>
            <div class="desc form-group">
              <textarea
                  type="text"
                  class="par-3 desc px-md-4 text-block-input mx-auto w-100"
                  v-model="profile.desc"
                  placeholder="Расскажите о себе..."
                  ref="desc"
                  maxlength="100"
                  readonly
                  @input="autoGrow($event.target)"></textarea>
              <span class="length-left" v-show="edit"></span>
            </div>
            <v-social-nets all></v-social-nets>
          </div>
        </div>
      </section>
      <section id="your-flows">
        <v-section-header headline="Ваши потоки">
          Кликните <kbd>ПКМ</kbd> по потоку чтобы изменить <br class="d-none d-xl-block"> его или сделать приватным.
        </v-section-header>
        <div class="row">
          <v-flow-card v-for="flow in flows" :key="flow.id" :flow="flow"></v-flow-card>
          <v-add-flow-card></v-add-flow-card>
        </div>
      </section>
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
import setLayout from "../mixins/setLayout";

export default {
  data() {
    return {
      edit: false,
      profile: {
        avatar: {
          name: 'profile.jpg',
          file: false
        },
        name: 'Хасан Шадияров',
        profession: 'Full Stack Developer',
        desc: 'Арт-директор и Middle Full Stack Разраб. Здесь чтобы создаваться свои потоки и развиваться быстрее всех.'
      },
      oldInfo: {
        avatar: '',
        name: '',
        profession: '',
        desc: ''
      },
      flows: [ // This is just mock data, btw api crops data, not vue
        {
          id: 1,
          title: 'Начинаем учить Python до джуна',
          description: 'Вот и я начал учить питончик, а шо поделать то?',
          art: 'art-3.svg',
          public: true,
          user: {
            id: 13,
            name: 'Khasan Sh.',
            avatar: 'user/original/profile.jpg'
          }
        },
        {
          id: 2,
          title: 'Становление мидлом в PHP back end',
          description: 'Делаю эту подборку для себя чтобы стать мидлом',
          art: 'art-1.svg',
          public: false,
          user: {
            id: 13,
            name: 'Khasan Sh.',
            avatar: 'user/original/profile.jpg'
          }
        },
      ]
    }
  },
  mixins: [autoGrow, lengthLeft, setLayout],
  watch: {
    edit(newValue) {
      if (newValue) {
        // Set new navbar
        this.setNavbar('profile')

        this.saveOldInfo()
        this.unlockInputs()
        let vm = this

        // Listen for save/cancel actions
        this.$nextTick(() => {
          document.querySelector('.save-profile').addEventListener('click', function () {
            vm.saveEdit()
            vm.edit = false
          })
          document.querySelector('.cancel-profile').addEventListener('click', function () {
            vm.cancelEdit()
            vm.edit = false
          })
        })
      } else {
        // Set default navbar
        this.$emit('navbar', 'default')
        this.lockInputs()
      }
    },
    save() {
      this.$emit('navbar', 'default')
    }
  },
  methods: {
    /**
     * Save profile editing
     */
    saveEdit() {
      // Save profile in db
      console.log(this.profile)
      this.clearSelection()

      let image = this.profile.avatar.file ? this.profile.avatar.file : 'user/original/' + this.profile.avatar.name

      this.pushNotification({
        title: 'Профиль изменён',
        description: 'Ваш профиль был успешно изменён :D',
        image: image
      })
    },

    /**
     * Cancel profile editing
     */
    cancelEdit() {
      this.setOldInfo()
      this.typeWidth(this.$refs.name)
      this.clearSelection()
    },

    /**
     * Clear text selection when editing is done
     */
    clearSelection() {
      if (window.getSelection) {
        window.getSelection().removeAllRanges();
      } else if (document.selection) {
        document.selection.empty();
      }
    },

    /**
     * Set input width according to its content
     * @param el
     * @param cancel – set width according to prev content length
     */
    typeWidth(el, cancel = false) {
      if (el.value && !cancel) {
        el.style.width = el.value.length + 4 + 'ch'
      } else {
        el.style.width = this.oldInfo.name + 4 + 'ch'
      }
    },

    /**
     * Remove readonly attributes from the fields
     * ...rewrite the methods with fields looping, if you are going to add more of them
     */
    unlockInputs() {
      let name = this.$refs.name,
          profession = this.$refs.profession,
          desc = this.$refs.desc
      name.removeAttribute('readonly')
      profession.removeAttribute('readonly')
      desc.removeAttribute('readonly')
      name.select()
    },

    /**
     * Add readonly attributes when editing is done
     */
    lockInputs() {
      let name = this.$refs.name,
          profession = this.$refs.profession,
          desc = this.$refs.desc
      name.setAttribute('readonly', true)
      profession.setAttribute('readonly', true)
      desc.setAttribute('readonly', true)
    },

    /**
     * Save old values of the fields to apply them back if cancel method is called
     */
    saveOldInfo() {
      this.oldInfo.avatar = this.$refs.avatar.$el.querySelector('img').getAttribute('src')
      this.oldInfo.name = this.$refs.name.value
      this.oldInfo.profession = this.$refs.profession.value
      this.oldInfo.desc = this.$refs.desc.value
    },

    /**
     * Set saved old values of the fields
     */
    setOldInfo() {
      this.$refs.avatar.$el.querySelector('img').setAttribute('src', this.oldInfo.avatar)
      this.profile.name = this.oldInfo.name
      this.profile.profession = this.oldInfo.profession
      this.profile.desc = this.oldInfo.desc
    },

    /**
     * Get data of the uploaded image and send it for cropping
     * @param uploader
     */
    uploadAvatar(uploader) {
      let vm = this

      // Get image as data
      if (uploader.files && uploader.files[0]) {
        let reader = new FileReader();
        reader.onload = function (e) {
          vm.cropImage(e.target.result);
        }
        reader.readAsDataURL(uploader.files[0]);
      }
    },

    /**
     * Crop image using canvas rendering and saving it as blob in profile object
     * @param imgData
     */
    cropImage(imgData) {
      const canvas = document.querySelector('.avatar-canvas')
      let img = this.$refs.avatar.$el.querySelector('img'),
          vm = this

      // Create mock image in canvas and paste uploaded image to it
      img.onload = function () {
        canvas.width = 500
        canvas.height = 500
        const ctx = canvas.getContext('2d')
        let iHeight = this.width * canvas.height / this.height
        ctx.drawImage(img, (canvas.width - iHeight) / 2, 0, iHeight, canvas.height);

        canvas.toBlob(function (blob) {
          vm.profile.avatar.file = blob
        });
      };

      // Show new avatar
      img.src = imgData
    },
  },
  mounted() {
    this.typeWidth(this.$refs.name)
    this.autoGrow(this.$refs.desc)
    this.lengthLeft(this.$refs.name)
    this.lengthLeft(this.$refs.profession)
    this.lengthLeft(this.$refs.desc)
  }
}
</script>

<style lang="scss" scoped>
#info {
  text-align: center;
  margin-bottom: 56px;
  margin-top: 48px;

  .avatar-upload-label {
    position: relative;
    margin-bottom: 18px;

    .avatar {
      border-radius: 16px !important;
      margin-left: auto;
      margin-right: auto;
    }

    .overlay {
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      border-radius: 16px;
      z-index: 1;
      padding: 30%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      img {
        filter: grayscale(1) invert(1);
      }
    }
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

  .desc {
    margin-bottom: 32px;
  }

  .text-block-input {
    text-align: center;
    width: auto;
  }

  .form-group {
    width: fit-content;
    margin: auto;
  }

  .form-group.name {
    max-width: 100%;

    button {
      position: absolute;
      left: 100%;
    }
  }
}

@media (max-width: 1280px) {
  #info {
    margin-top: 36px;

    .desc {
      width: 80%;
    }
  }
}
</style>