<template>
  <footer>
    <div class="potok-description">
      <img class="logo" src="@/assets/images/UI/logo.svg" alt="Potok">
      <p class="par-2">Следите за нами и новыми потоками <br>
        в наших социальных сетях</p>
      <v-social-nets youtube></v-social-nets>
    </div>
    <div class="container">
      <div class="col-xl-10 mx-auto">
        <div class="footer-links">
          <div class="footer-group">
            <p class="par-2 medium italic">Применения</p>
            <router-link to="">О нас</router-link>
            <router-link to="">Привыкать ко всему <span class="red">*</span></router-link>
            <router-link to="">Искать по крупицам <span class="red">*</span></router-link>
            <router-link to="">Забывать то, что уже выучил <span class="red">*</span></router-link>
            <router-link to="">Платить за то что уже бесплатно <span class="red">*</span></router-link>
            <router-link to="">Идти не той дорогой <span class="red">*</span></router-link>
            <router-link to="">Постоянно сохранять <br> закладки <span class="red">*</span></router-link>
            <p class="par-4 prefix-annotation">Префик <span class="red">*</span> обозначает <br> проблему, которую решает <br> платформа Potok</p>
          </div>
          <div class="footer-group">
            <p class="par-2 medium italic">Ресурсы</p>
            <router-link to="" class="disabled">Наш блог</router-link>
            <router-link to="">Практики создания <br> потоков</router-link>
            <router-link to="" class="disabled">Вопросы и ответы</router-link>
            <router-link to="" class="disabled">Вакансии</router-link>
            <router-link to="" class="disabled">Заказать печатную версию потока</router-link>
            <router-link to="" class="disabled">Партнерская программа</router-link>
            <router-link to="" class="disabled">Изменть действия в меню</router-link>
          </div>
          <div class="footer-group">
            <p class="par-2 medium italic">Формальности</p>
            <router-link to="" class="disabled">Как мы используем API</router-link>
            <router-link to="" class="disabled">Доступные платформы</router-link>
            <router-link to="" class="disabled">Форматы для вставки</router-link>
            <router-link to="">Что даёт вам создание своих потоков</router-link>
            <router-link to="">Правила пользования</router-link>
            <router-link to="">Копирайт</router-link>
            <router-link to="">Политика конфеденциальности</router-link>
            <router-link to="">Политика Cookie</router-link>
            <router-link to="">Дисклеймер</router-link>
            <router-link to="">Контакты</router-link>
          </div>
          <div class="footer-group" style="flex: none">
            <p class="par-2 medium italic">Платформы</p>
            <router-link to="" class="disabled">Сайт</router-link>
            <router-link to="" class="disabled">Android приложение</router-link>
            <router-link to="" class="disabled">IOS приложение</router-link>
            <router-link to="" class="save-on-desktop disabled">Сохранить <img class="mx-1" src="@/assets/images/UI/logo-sm.svg" alt="Potok"> на рабочий
              <br> стол как приложение</router-link>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "footer-default"
}
</script>

<style lang="scss" scoped>

</style>