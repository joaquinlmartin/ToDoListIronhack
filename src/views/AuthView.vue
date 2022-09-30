<template>
    <h1>Esta es la vista del Sign up</h1>
    <button @click="handleSingUp">Sign Up</button>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import userStore from '@/store/user';

export default {
  name: 'Authview',
  computed: {
    ...mapState(userStore, ['user']),
  },
  methods: {
    ...mapActions(userStore, ['signUp']),
    handleSingUp() {
      const userData = {
        email: 'joaquinlmartin@gmail.com',
        password: 'prueba1234',
      };
      this.signUp(userData.email, userData.password);
    },
  },
  watch: {
    user() {
      if (this.user) {
        console.log(this.user);
        this.$router.push({ path: '/' });
      }
    },
  },
};
</script>
