<template>
  <section v-if='appReady' class='min-h-full box-border'>
    <Navigation />
    <router-view class='app-main' />
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import supabase from './supabase';
import { useUserStore } from './store/user';
import Navigation from './components/NavigationComponent.vue';

const router = useRouter();
const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const appReady = ref(null);
onMounted(async () => {
  try {
    await userStore.fetchUser();
    if (!user.value) {
      router.push({ path: '/login' });
      appReady.value = true;
    } else {
      router.push({ path: '/' });
    }
  } catch (e) {
    console.log(e);
  }
});
supabase.auth.onAuthStateChange((event, session) => {
  userStore.setUser(session);
  appReady.value = true;
});
</script>
