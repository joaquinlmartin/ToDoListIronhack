<template>
    <div class="wrapper-auth">
      <h2 class="title-main title-main--auth">Register</h2>
      <form class="form-auth" @submit.prevent="submit">
        <fieldset class="form-auth__fieldset">
          <label for="email"><input
            class="form-auth__element"
            v-model="email"
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            required
          /></label>
          <p class="messages__form-auth error" v-if="msgForm.email">
            {{ msgForm.email }}
          </p>
        </fieldset>
        <fieldset class="form-auth__fieldset">
          <label for="password"><input
            v-model="password"
            class="form-auth__element"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            required
          /></label>
          <p class="messages__form-auth error" v-if="msgForm.password">
            {{ msgForm.password }}
          </p>
        </fieldset>
        <fieldset class="form-auth__fieldset">
          <label for="confirmpassword"><input
            v-model="confirmPassword"
            class="form-auth__element"
            type="password"
            name="confirmpassword"
            id="confirmpassword"
            placeholder="Confirm Password"
            required
          /></label>
          <p class="messages__form-auth error" v-if="msgForm.confirmPassword">
            {{ msgForm.confirmPassword }}
          </p>
        </fieldset>
        <button class="button-auth__form" type="submit">Submit</button>
      </form>
      <div v-if="msgErrors.length > 0" class="messages-bbdd error">
        {{ msgErrors[0].message }}
      </div>

      <router-link class="link-auth" :to="'/'">Click to LogIn</router-link>
    </div>
    <div class="wrapper-auth">
      <div v-if="msgInfo.length > 0">
        <h3 class="subtitle-main">{{ msgInfo[0].title }}</h3>
        <p>{{ msgInfo[0].body }}</p>
      </div>
    </div>
  </template>

<script>
import { useRouter } from 'vue-router';
import { useUserStore } from '../store/user';
import { useThemingStore } from '../store/theming';

export default {
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      msgErrors: [],
      msgInfo: [],
      msgForm: [],
      router: useRouter(),
      userStore: useUserStore(),
      themingStore: useThemingStore(),
      validateFormEmail: false,
      validateFormPassword: false,
    };
  },
  watch: {
    email(value) {
      this.validateEmail(value);
    },
    password(value) {
      this.validatePassword(value);
    },
    confirmPassword(value) {
      this.validateConfirmPassword(value);
    },
  },
  methods: {
    validateEmail(value) {
      if (/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(value)) {
        this.msgForm.email = '';
        this.validateFormEmail = true;
      } else {
        this.msgForm.email = 'Invalid Email rules';
        this.validateFormEmail = false;
      }
    },
    validatePassword(value) {
      if (/^(?=(?:.*\d))(?=.*[A-Z])(?=.*[a-z])\S{8,64}$/.test(value)) {
        this.msgForm.password = '';
        this.validateFormPassword = true;
      } else {
        this.msgForm.password = 'Your password needs at least: ';
        this.msgForm.password += ' 1 number 0-9';
        this.msgForm.password += ' + 1 Capital letter';
        this.msgForm.password += ' + 1 lowercase letter';
        this.msgForm.password += ' + 8 characters';
        this.validateFormPassword = false;
      }
    },
    validateConfirmPassword() {
      if (this.password !== this.confirmPassword) {
        this.msgForm.confirmPassword = 'The passwords are not equals';
      } else {
        this.msgForm.confirmPassword = '';
      }
    },
    async submit() {
      if (
        this.password
          && this.email
          && this.confirmPassword
          && this.validateFormEmail
          && this.validateFormPassword
      ) {
        try {
          await this.userStore.signUp(this.email, this.password);
          this.msgInfo.push({
            title: 'You have registered!',
            body: 'To complete the process, you will have received a confirmation email. Please accept the email.',
          });
          await this.themingStore.insertTheme(this.userStore.user.id, 'forest');
          setTimeout(() => {
            this.router.push({ path: '/' });
          }, 5000);
        } catch (e) {
          this.msgErrors.push(e);
        }
      }
    },
  },
};
</script>

  <style>
  </style>
