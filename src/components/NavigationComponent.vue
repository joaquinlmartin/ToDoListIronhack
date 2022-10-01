<template>
  <header class="bg-blue-700 text-white">
    <nav class="py-5 px-4 flex flex-col gap-4 items-center sm:flex-row">
      <div class="flex items-center gap-x-4">
        <h1 class="text-lg">TAREAS</h1>
      </div>
      <ul v-if="user" class="flex flex-1 justify-end gap-x-10">
        <router-link class="cursor-pointer" :to="{ name: 'Home' }"
          >Home</router-link
        >
        <router-link class="cursor-pointer" :to="{ name: 'Create' }"
          >Create</router-link
        >
        <li @onClick="signout" class="cursor-pointer">Logout</li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useUserStore } from '../store/user';

const router = useRouter();
const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const signout = async () => {
  await userStore.logOut();
  router.push({ name: 'Login' });
};
</script>
