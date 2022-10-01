<template>
  <div
    class="body-bg min-h-screen pt-12 md:pt-20 pb-6 px-2 md:px-0"
    style="font-family: 'Lato', sans-serif"
  >
    <div
      class="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl"
    >
      <section>
        <h3 class="font-bold text-2xl">TAREAS</h3>
        <p class="text-gray-600 pt-2">Sign in to your account.</p>
      </section>

      <div v-if="errorMsg" class="mb-10 p-4 rounded-md bg-light-grey shadow-lg">
        <p class="text-red-500">{{ errorMsg }}</p>
      </div>

      <section class="mt-10">
        <form
          @submit.prevent="login"
          class="flex flex-col"
          method="POST"
          action="#"
        >
          <div class="mb-6 pt-3 rounded bg-gray-200">
            <label
              class="block text-gray-700 text-sm font-bold mb-2 ml-3"
              for="email"
              >
            <input
              type="text"
              id="email"
              v-model="email"
              class="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4
              border-gray-300 focus:border-blue-600 transition duration-500 px-3 pb-3"
            />Email</label
            >
          </div>
          <div class="mb-6 pt-3 rounded bg-gray-200">
            <label
              class="block text-gray-700 text-sm font-bold mb-2 ml-3"
              for="password"
              >
            <input
              type="password"
              id="password"
              v-model="password"
              class="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4
              border-gray-300 focus:border-blue-600 transition duration-500 px-3 pb-3"
            />Password</label>
          </div>
          <div class="flex justify-end">
            <a
              href="#"
              class="text-sm text-blue-600 hover:text-blue-700 hover:underline mb-6"
              >Forgot your password?</a
            >
          </div>
          <button
            class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded shadow-lg
            hover:shadow-xl transition duration-200"
            type="submit"
          >
            Log In
          </button>
        </form>
      </section>
    </div>

    <div class="max-w-lg mx-auto text-center mt-12 mb-6">
      <p>
        Don't have an account?
        <router-link class="font-bold hover:underline" to="/signup"
          >Sign up</router-link
        >.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../store/user';
import supabase from '../supabase';

const router = useRouter();
const userStore = useUserStore();
const email = ref(null);
const password = ref(null);
const errorMsg = ref(null);
const login = async () => {
  try {
    await userStore.singIn(email.value, password.value, errorMsg.value);
    router.push({ name: 'Home' });
    supabase.auth.onAuthStateChange((event, session) => {
      userStore.setUser(session);
    });
  } catch (error) {
    errorMsg.value = `Error: ${error.message}`;
    setTimeout(() => {
      errorMsg.value = null;
    }, 5000);
  }
};
</script>

<style></style>
