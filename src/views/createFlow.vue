<template>
  <div>
    <Head>
      <title>{{ flow.title ? flow.title : 'Заголовок...' }}</title>
    </Head>

    <div class="container">
      <section id="info">
        <div class="col-xl-4 col-lg-6 col-md-8 mx-auto">
          <v-crip src="profile.jpg">Khasan Sh.</v-crip>
          <div class="name form-group">
            <textarea type="text" ref="name" v-model="flow.title" @input="autoGrow($event.target)" maxlength="40"
                      class="h3 text-block-input" placeholder="Заголовок..." v-focus></textarea>
            <span class="length-left"></span>
          </div>
          <div class="desc form-group">
              <textarea type="text" ref="desc" v-model="flow.description" @input="autoGrow($event.target)" maxlength="80"
                        class="par-1 italic text-block-input" placeholder="Описание..."></textarea>
              <span class="length-left"></span>
          </div>
          <v-art-create @sendArt="getArt"></v-art-create>
        </div>
      </section>
      <section id="content">
        <div class="row">
          <div class="col-xl-8 col-lg-12 offset-xl-1">
            <v-flow-create @sendContent="getContent"></v-flow-create>
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
        content: {}
      },
      art: ''
    }
  },
  mixins: [autoGrow, lengthLeft],
  methods: {
    getContent(content) {
      this.flow.content = content
      console.log(this.flow)
    },
    getArt(art) {
      this.flow.art = art
      console.log(this.flow.art)
    }
  },
  beforeMount() {
    this.$emit('navbar', 'create')
  },
  mounted() {
    this.autoGrow(this.$refs.name)
    this.autoGrow(this.$refs.desc)

    this.lengthLeft(this.$refs.name)
    this.lengthLeft(this.$refs.desc)
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
  margin-top: 48px;
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