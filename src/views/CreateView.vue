<template>
  <div
    class="body-bg min-h-screen pt-12 md:pt-20 pb-6 px-2 md:px-0"
    style="font-family: 'Lato', sans-serif"
  >
    <div
      class="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl"
    >
      <section>
        <h3 class="font-bold text-2xl">Create Task</h3>
      </section>

      <div
        v-if="statusMsg || errorMsg"
        class="mb-10 p-4 bg-light-grey rounded-md shadow-lg"
      >
        <p class="text-green-500">
          {{ statusMsg }}
        </p>
        <p class="text-red-500">{{ errorMsg }}</p>
      </div>

      <section class="mt-10">
        <form @submit.prevent="createTodo" class="flex flex-col">
          <div class="mb-6 pt-3 rounded bg-gray-200">
            <label
              class="block text-gray-700 text-sm font-bold mb-2 ml-3"
              for="todo-name"
              >
            <input
              required
              type="text"
              id="todo-name"
              v-model="title"
              maxlength="40"
              class="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4
              border-gray-300 focus:border-blue-600 transition duration-500 px-3 pb-3"
            />Title</label
            >
          </div>

          <div class="mb-6 pt-3 rounded bg-gray-200">
            <label
              class="block text-gray-700 text-sm font-bold mb-2 ml-3"
              for="todo-text"
              >
            <select
              required
              id="todo-state"
              v-model="isComplete"
              class="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4
              border-gray-300 focus:border-blue-600 transition duration-500 px-3 pb-3"
            >
              <option value="select-state" disabled selected hidden>
                Select state
              </option>
              <option value="false">In progress</option>
              <option value="true">Completed</option>
            </select>State</label
            >
          </div>

          <button
            class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded shadow-lg
            hover:shadow-xl transition duration-200"
            type="submit"
          >
            Create
          </button>
        </form>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useTaskStore } from '../store/task';

const router = useRouter();
const taskStore = useTaskStore();
const title = ref('');
const isComplete = ref('select-state');
const statusMsg = ref(null);
const errorMsg = ref(null);
const token = JSON.parse(localStorage.getItem('supabase.auth.token'));
const userId = ref(token.currentSession.user.id);
const createTodo = async () => {
  try {
    await taskStore.insertTodo(title.value, isComplete.value, userId.value);
    statusMsg.value = 'Succes: Task created!';
    title.value = '';
    isComplete.value = 'select-state';
    setTimeout(() => {
      statusMsg.value = false;
    }, 5000);
    setTimeout(() => {
      router.push({ name: 'Home' });
    }, 1000);
  } catch (error) {
    errorMsg.value = `Error: ${error.message}`;
    setTimeout(() => {
      errorMsg.value = false;
    }, 5000);
  }
};
</script>

<style></style>
