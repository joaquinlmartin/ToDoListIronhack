<template>
    <nav class="navbar">
      <ul class="navbar__list">
        <li class="navbar__item">
          <h2 class="title-main title-main--navbar">{{ pageTitle }}</h2>
        </li>
        <li class="navbar__item">
          <button
            v-if="pageTitle == 'My Tasks'"
            class="navbar__link"
            type="button"
            @click="signOut"
          >
            {{ pageLink }} <i class="navbar__icon fa-solid fa-arrow-right-from-bracket"></i>
          </button>
          <router-link
            v-if="pageTitle == 'New Task'"
            class="navbar__link"
            :to="'/dashboard'"
          >
            {{ pageLink }} <i class="navbar__icon fa-solid fa-angles-left"></i
          ></router-link>
        </li>
      </ul>
      <div class="button-exp__group">
        <button
          @click="setTheme('forest')"
          class="button-exp forest"
          id="forest"
          type="text"
        >
          Forest
        </button>
        <button
          @click="setTheme('ocean')"
          class="button-exp ocean"
          id="ocean"
          type="text"
        >
          Ocean
        </button>
        <button
          @click="setTheme('spring')"
          class="button-exp spring"
          id="spring"
          type="text"
        >
          Spring
        </button>
      </div>
    </nav>
    <p class="wrapper-main-user">{{ this.userStore.user.email }}</p>
    <div v-if="msgErrors.length > 0" class="messages-bbdd error">
        {{ msgErrors[0].message }}
      </div>
  </template>

<script>
import { useRouter } from 'vue-router';
import { useUserStore } from '../store/user';
import { useThemingStore } from '../store/theming';

export default {
  name: 'Navbar',
  props: {
    pageTitle: String,
    pageLink: String,
  },
  data() {
    return {
      msgErrors: [],
      router: useRouter(),
      userStore: useUserStore(),
      themingStore: useThemingStore(),
    };
  },
  methods: {
    async getTheming() {
      try {
        await this.themingStore.fetchTheming(this.userStore.user.id);
        this.theme = this.themingStore.theming[0].theme;
        this.setThemeHTML(this.theme);
      } catch (e) {
        this.msgErrors.push(e);
      }
    },
    setThemeHTML(theme) {
      const el = document.getElementsByTagName('html')[0];
      el.classList.replace(el.classList, theme);
    },
    setTheme(theme) {
      this.editTheme(theme);
      this.setThemeHTML(theme);
    },
    async editTheme(theme) {
      try {
        await this.themingStore.editTheming(this.userStore.user.id, theme);
      } catch (e) {
        this.msgErrors.push(e);
      }
    },
    async signOut() {
      try {
        this.router.push({ path: '/' });
        this.userStore.signOut();
        this.setThemeHTML('forest');
      } catch (e) {
        this.msgErrors.push(e);
      }
    },
  },
  mounted() {
    this.getTheming();
  },
};
</script>
