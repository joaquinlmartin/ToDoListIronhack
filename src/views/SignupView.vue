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
        <p class="text-gray-600 pt-2">Create your account.</p>
      </section>

      <div v-if="errorMsg" class="mb-10 p-4 rounded-md bg-light-grey shadow-lg">
        <p class="text-red-500">{{ errorMsg }}</p>
      </div>

      <section class="mt-10">
        <form
          @submit.prevent="register"
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
              required
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
              required
              id="password"
              v-model="password"
              class="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4
              border-gray-300 focus:border-blue-600 transition duration-500 px-3 pb-3"
            />Password</label>
          </div>
          <div class="mb-6 pt-3 rounded bg-gray-200">
            <label
              class="block text-gray-700 text-sm font-bold mb-2 ml-3"
              for="confirmPassword"
              >
            <input
              type="password"
              required
              id="confirmPassword"
              v-model="confirmPassword"
              class="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4
              border-gray-300 focus:border-blue-600 transition duration-500 px-3 pb-3"
            />Confirm Password</label
            >
          </div>
          <button
            class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded shadow-lg
            hover:shadow-xl transition duration-200"
            type="submit"
          >
            Sign Up
          </button>
        </form>
      </section>
    </div>

    <div class="max-w-lg mx-auto text-center mt-12 mb-6">
      <p>
        Already have an account?
        <router-link class="font-bold hover:underline" to="/login"
          >Log in</router-link
        >.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../store/user';

const router = useRouter();
const userStore = useUserStore();
const email = ref(null);
const password = ref(null);
const confirmPassword = ref(null);
const errorMsg = ref(null);
const register = async () => {
  if (password.value === confirmPassword.value) {
    try {
      await userStore.signUp(email.value, password.value, errorMsg.value);
      router.push({ name: 'Login' });
    } catch (error) {
      errorMsg.value = error.message;
      setTimeout(() => {
        errorMsg.value = null;
      }, 5000);
    }
    return;
  }
  errorMsg.value = 'Error: Password do not match';
  setTimeout(() => {
    errorMsg.value = null;
  }, 5000);
};
</script>

<style></style>
