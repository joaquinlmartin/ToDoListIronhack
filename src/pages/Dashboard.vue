<template>
    <div class="wrapper-main--dashboard">
      <Navbar :pageTitle="pageTitle" :pageLink="pageLink" />
      <section class="wrapper__tasks">
        <article class="wrapper-paper wrapper-tasks--status isUncomplete">
          <h3 class="subtitle-main">
            <span>TODO!</span>
            <router-link class="link-tasks" :to="'/newtask'">
              New Task!
            </router-link>
          </h3>
          <div class="wrapper-paper-task">
            <Task
              v-for="task in tasksList.filter((x) => x.is_complete === false)"
              :title="task.title"
              :idTask="task.id"
              :isComplete="true"
              :key="task.id"
              @updateStatusTask="handleChildUpdateStatusTask"
              @deleteTask="handleChildDeleteTask"
              @editTask="handleChildEditTask"
            />
          </div>
        </article>

        <article class="wrapper-paper wrapper-tasks--status isComplete">
          <h3 class="subtitle-main">DONE!</h3>
          <div class="wrapper-paper-task">
            <Task
              v-for="task in tasksList.filter((x) => x.is_complete === true)"
              :title="task.title"
              :idTask="task.id"
              :isComplete="false"
              :key="task.id"
              @updateStatusTask="handleChildUpdateStatusTask"
            />
          </div>
        </article>
      </section>
      <div v-if="msgErrors.length > 0" class="messages-bbdd error">
        {{ msgErrors[0].message }}
      </div>
    </div>
  </template>

<script>
import { useRouter } from 'vue-router';
import Navbar from '../components/Navbar.vue';
import Task from '../components/Task.vue';

import { useUserStore } from '../store/user';
import { useTaskStore } from '../store/task';

export default {
  components: { Navbar, Task },
  data() {
    return {
      pageTitle: 'My Tasks',
      pageLink: 'Log out',
      msgErrors: [],
      router: useRouter(),
      userStore: useUserStore(),
      taskStore: useTaskStore(),
      tasksList: [],
    };
  },
  methods: {
    async getTasks() {
      try {
        await this.taskStore.fetchTasks();
        this.tasksList = this.taskStore.tasks;
        // console.log(this.taskStore.tasks);
      } catch (e) {
        this.msgErrors.push(e);
      }
    },
    handleChildUpdateStatusTask() {
      this.getTasks();
    },
    handleChildEditTask() {
      this.getTasks();
    },
    handleChildDeleteTask() {
      this.getTasks();
    },
  },
  mounted() {
    this.getTasks();
  },
};
</script>

  <style>
  </style>
