<template>
  <div
    v-if="dataLoaded"
    class="max-w-[1200px] mx-auto pt-12 md:pt-20 pb-6 px-12"
  >
    <div v-if="data.length === 0" class="w-full flex flex-col items-center">
      <h1 class="text-2xl">Looks empty here...</h1>
      <router-link
        class="mt-12 bg-blue-600 hover:bg-blue-700 text-white font-bold p-2 rounded shadow-lg
        hover:shadow-xl transition duration-200"
        :to="{ name: 'Create' }"
        >Create task</router-link
      >
    </div>

    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <div
        class="flex flex-col items-center bg-yellow-50 p-8 shadow-md"
        v-for="(todo, index) in tasks"
        :key="index"
      >
        <Card
        :todo="todo"
        :index="index"
        :data="data"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useUserStore } from '../store/user';
import { useTaskStore } from '../store/task';
import Card from '../components/CardComponent.vue';

const router = useRouter();
const userStore = useUserStore();
const taskStore = useTaskStore();
const { user } = storeToRefs(userStore);
const { tasks } = storeToRefs(taskStore);
const data = ref([]);
const dataLoaded = ref(null);
const getData = async () => {
  try {
    await taskStore.fetchTasks();
    data.value = tasks.value;
    dataLoaded.value = true;
  } catch (error) {
    console.log(error.message);
  }
};
getData();
onMounted(async () => {
  try {
    await userStore.fetchUser();
    if (!user.value) {
      router.push({ path: '/login' });
    } else {
      router.push({ path: '/' });
    }
  } catch (e) {
    console.log(e);
  }
});
</script>
