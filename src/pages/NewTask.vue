<template>
    <div class="wrapper-main--newTask">
      <Navbar :pageTitle="pageTitle" :pageLink="pageLink" />
      <div class="wrapper-paper">
        <form
          class="form-tasks form-tasks--newTask"
          @submit.prevent="submitTask"
        >
          <fieldset class="form-tasks__fieldset">
            <i class="form-tasks__element-icon fa-solid fa-quote-left"></i>
            <label for="taskTitle"><input
              v-model="taskTitle"
              class="form-tasks__element"
              type="text"
              name="taskTitle"
              id="taskTitle"
              ref="taskTitle"
              placeholder="Task Title...."
              required
            /></label>
          </fieldset>
          <button class="button-tasks__form" type="submit">Add</button>
        </form>
        <div v-if="msgErrors.length > 0" class="messages-bbdd error">
          {{ msgErrors[0].message }} <br />
          {{ msgErrors[0].status }}
        </div>
      </div>
    </div>
  </template>

<script>
import { useRouter } from 'vue-router';
import Navbar from '../components/Navbar.vue';
import { useUserStore } from '../store/user';
import { useTaskStore } from '../store/task';

export default {
  components: { Navbar },
  data() {
    return {
      pageTitle: 'New Task',
      pageLink: 'Back',
      taskTitle: '',
      msgErrors: [],
      router: useRouter(),
      userStore: useUserStore(),
      taskStore: useTaskStore(),
    };
  },
  methods: {
    setFocus() {
      this.$refs.taskTitle.focus();
    },
    async submitTask() {
      if (this.taskTitle) {
        try {
          await this.taskStore.newTask(this.taskTitle, this.userStore.user.id);
          this.router.push({ path: '/dashboard' });
        } catch (e) {
          this.msgErrors.push(e);
        }
      }
    },
  },
  mounted() {
    this.setFocus();
  },

};
</script>

  <style>
  </style>
