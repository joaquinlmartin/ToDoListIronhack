<template>
    <h1>Esta es la vista del Sign up</h1>
    <button @click="singUp">Sign Up</button>
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
    signUp() {
      const userData = {
        email: 'joaquinlmartin@gmail.com',
        password: 'prueba1234',
      };
      this.signUp(userData);
    },
  },
};
</script>
