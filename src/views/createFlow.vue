<template>
  <div>
    <Head>
      <title>{{ flow.title ? flow.title : 'Заголовок...' }}</title>
    </Head>

    <div class="container">
      <section id="info">
        <div class="col-xl-6 col-lg-6 col-md-8 mx-auto">
          <v-crip src="user/original/profile.jpg">Khasan Sh.</v-crip>
          <div class="name form-group">
            <textarea type="text" ref="name" v-model="flow.title" @input="autoGrow($event.target); setRestore()" maxlength="40"
                      class="h3 text-block-input" placeholder="Заголовок..." v-focus></textarea>
            <span class="length-left"></span>
            <v-error :message="errors.title"></v-error>
          </div>
          <div class="desc form-group">
              <textarea type="text" ref="desc" v-model="flow.description" @input="autoGrow($event.target); setRestore()"
                        maxlength="80"
                        class="par-1 italic text-block-input" placeholder="Описание..."></textarea>
            <span class="length-left"></span>
            <v-error :message="errors.description"></v-error>
            <v-error class="art-error" :message="errors.art"></v-error>
          </div>
          <div class="art-create-group">
            <v-art-create @sendArt="getArt"></v-art-create>
          </div>
        </div>
      </section>
      <section id="content">
        <div class="row">
          <div class="col-xxl-8 col-xl-9 offset-xxl-1">
            <v-flow-create @sendContent="getContent" :contentRestore="flowRestore.content" :setRestore="setRestore"></v-flow-create>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import autoGrow from "../mixins/autoGrow";
import lengthLeft from "../mixins/lengthLeft";

export default {
  data() {
    return {
      flow: {
        title: '',
        description: '',
        art: '',
        authorId: '', // Get from store
        public: true,
        content: {},
        fives: 0,
        saves: 0,
      },
      errors: {
        title: '',
        description: '',
        art: ''
      },
      flowRestore: null
    }
  },
  mixins: [autoGrow, lengthLeft],
  methods: {
    /**
     * Get unfinished flow form localStorage
     */
    getRestore() {
      let flowRestore = JSON.parse(localStorage.getItem('flowRestore'))
      if (flowRestore) {
        return flowRestore
      }
    },

    /**
     * Set unfinished flow to localStorage to restore it later
     */
    setRestore() {
      this.$nextTick(() => {
        let flow = {...this.flow}

        localStorage.setItem('flowRestore', JSON.stringify(flow))
      })
    },

    /**
     * Get content for sendContent emit from vFlowCreate
     * @param content
     */
    getContent(content) {
      // ... Remove chapters without links and empty links
      this.flow.content = content
      this.setRestore()
      console.log(this.flow)
    },

    /**
     * Get art for sendArt emit from vArtCreate
     * @param art
     */
    getArt(art) {
      this.flow.art = art
      console.log(this.flow.art)
    },

    validateFlow() {
      if (!this.flow.title) {
        this.errors.title = '*Впишите название потока'
      } else {
        this.errors.title = ''
      }

      if (!this.flow.description) {
        this.errors.description = '*Дайте описание потоку'
      } else {
        this.errors.description = ''
      }

      if (!this.flow.art) {
        this.errors.art = '*Сделайте рисунок'
      } else {
        this.errors.art = ''
      }

      if (!Object.values(this.errors).some(err => err !== null && err !== '')) {
        // Clear all restore cookies
        localStorage.removeItem('flowRestore')
        return true
      }
    },

    /**
     * Save flow and publish it
     */
    saveFlow(e) {
      // 1. Check validation
      // 2. Save to db
      // 3. Set notification
      // 4. Redirect to this flow
      if (this.validateFlow()) {

        // Start loading
        this.addClass(e.target, 'allow-loading', 'btn')

        setTimeout(() => {
          this.pushNotification({
            title: 'Поток опубликован!',
            description: 'Поток “' + this.flow.title.substring(0, 22) + '...” успешно опубликован',
            url: '/flow',
            icon: 'flow-success'
          })

          this.$router.push('/flow')
        }, 1000) // Simulate saving to db
      }

    },

    /**
     * Save flow to drafts
     */
    draftFlow(e) {
      // same steps as save, just publish it as type of draft
      if (this.validateFlow()) {
        // Start loading
        this.addClass(e.target, 'allow-loading', 'btn')

        setTimeout(() => {
          this.pushNotification({
            title: 'Поток в черновиках',
            description: 'Поток “' + this.flow.title.substring(0, 22) + '...” добавлен в черновики',
            url: '/flow',
            icon: 'flow-draft'
          })

          this.$router.push('/flow')
        }, 1000) // Simulate saving to db
      }
    }
  },
  beforeMount() {
    this.flowRestore = this.getRestore()
    if (this.flowRestore) {
      this.flow = this.flowRestore
    } else {
      this.flowRestore = this.flow
    }
  },
  mounted() {
    this.autoGrow(this.$refs.name)
    this.autoGrow(this.$refs.desc)

    this.lengthLeft(this.$refs.name)
    this.lengthLeft(this.$refs.desc)

    let vm = this
    document.querySelector('.save-flow').addEventListener('click', function (e) {
      vm.saveFlow(e)
    })
    document.querySelector('.draft-flow').addEventListener('click', function (e) {
      vm.draftFlow(e)
    })
  }
}
</script>

<style lang="scss" scoped>
section {
  margin: 0;
}

.text-block-input {
  text-align: center;
}

.text-block-input.h3 {
  &:focus {
    margin-right: 0;
  }
}

#info {
  margin-top: 36px;
  margin-bottom: 80px;

  > div {
    text-align: center;
  }

  .crip {
    margin-bottom: 16px;
  }

  .desc {
    textarea {
      margin-bottom: 8px;
      margin-bottom: 28px;
    }
  }

  .form-group {
    textarea {
      max-width: 70%;
      margin-left: auto;
      margin-right: auto;
    }
  }

  .art-error {
    top: 80px;
  }

  .art-create-group {
    .error-message {
      top: 0;
    }
  }
}

#content {
  .info-md {
    text-align: center;

    .crip {
      margin-bottom: 20px;
    }
  }
}

@media (max-width: 992px) {
  #content {
    .info-md {
      margin: auto;
    }
  }
}
</style>