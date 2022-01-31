<template>
  <div>
    <Head>
      <title>Сайт на реконструкции</title>
    </Head>

    <div class="warn-wrap">
      <div class="warn">
        <v-avatar src="user/original/profile.jpg" size="44" class="mx-auto"></v-avatar>
        <h4>Реконструкция</h4>
        <p class="par-4 italic">На сайте сейчас технические работы, просим прощения <br>
          за неудобства, скоро все заработает</p>
        <v-pattern></v-pattern>
        <p class="par-4 italic" ref="msg" v-html="msg"></p>
        <div class="actions" :class="!actions ? 'actions-hidden' : ''">
          <v-button @click="notifyMe(true)" size="xs" variant="primary">Да, отправить</v-button>
          <v-button @click="notifyMe(false)" size="xs" variant="transparent" color="primary">Нет, спасибо</v-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'under-construction',
  data() {
    return {
      msg: 'Отправить уведомление когда мы закончим <br> на has...rov@gmail.com?',
      msgTrue: 'Когда мы закончим, вы получите <br> письмо на has...rov@gmail.com',
      msgFalse: 'Хорошо, ещё раз приносим извинения, <br> ждём вас чуток позже',
      actions: true
    }
  },
  beforeMount() {
    let cookies = JSON.parse(this.getCookies()),
        notifyMe = (cookies['notifyConstructionDone'])

    if (this.hasProperty(cookies, 'notifyConstructionDone')) {
      this.actions = false

      if (notifyMe) {
        this.msg = this.msgTrue
      } else {
        this.msg = this.msgFalse
      }
    }
  },
  methods: {
    notifyMe(notify) {
      if (this.actions) {
        this.$refs.msg.classList.add('anim-fade-out-in')

        setTimeout(() => {
          this.msg = this.msgFalse
          if (notify) {
            // ... Save to notification log in db
            this.msg = this.msgTrue
          }

          this.$refs.msg.innerHTML = this.msg
          this.setCookie('notifyConstructionDone', notify, 1)
        }, 150)

        this.actions = false
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.warn-wrap {
  text-align: center;
  display: flex;
  justify-content: center;
  padding: 80px 0;

  .avatar {
    margin-bottom: 16px;
  }

  h4 {
    margin-bottom: 8px;
  }

  .actions {
    margin-top: 24px;

    > .btn {
      display: block;
      margin-left: auto;
      margin-right: auto;
      margin-bottom: 8px;
    }
  }

  .actions-hidden {
    opacity: 0;
    pointer-events: none;
  }
}

@media (max-width: 1280px) {
  .warn-wrap {
    padding: 64px 0;
  }
}
</style>