import { defineStore } from 'pinia';
import supabase from '../supabase';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
  }),

  actions: {
    async fetchUser() {
      const user = await supabase.auth.user();
      this.user = user;
    },
    async signUp(email, password) {
      const { user, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw error;
      if (user) this.user = user;
    },
    async singIn(email, password) {
      const { error } = await supabase.auth.signIn({
        email,
        password,
      });
      if (error) throw error;
    },
    async logOut() {
      await supabase.auth.signOut();
    },
    async setUser(session) {
      this.user = session ? session.user : null;
    },
    persist: {
      enabled: true,
      strategies: [
        {
          key: 'user',
          storage: localStorage,
        },
      ],
    },
  },
});
