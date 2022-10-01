<template>
    <div>
      <div class="task">
        <template v-if="!isEdit">
          <h4 class="task__title">
            <label for="updateStatusTask"><input
              class="task__title-icon fa-regular fa-square-check"
              @click="updateStatusTask"
            ></label>
            -
            {{ title }}
          </h4>
        </template>
        <template v-if="isEdit">
          <form class="form-tasks" @submit.prevent="editTask">
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
          </form>
        </template>

        <div class="task__actions">
          <template v-if="isComplete">
            <label for="showEdit"><input
              class="task__actions-icon fa-regular fa-pen-to-square"
              @click="showEdit"
            ></label>
            <label for="deleteTask"><input
              class="task__actions-icon fa-regular fa-trash-can"
              @click="deleteTask"
            ></label>
          </template>
        </div>
      </div>
      <div v-if="msgErrors.length > 0" class="messages-bbdd error">
        {{ msgErrors[0].message }}
      </div>
    </div>
  </template>

<script>
import { useRouter } from 'vue-router';
import { useTaskStore } from '../store/task';

export default {
  name: 'Task',
  props: {
    title: String,
    idTask: Number,
    isComplete: Boolean,
  },
  data() {
    return {
      router: useRouter(),
      taskStore: useTaskStore(),
      msgErrors: [],
      isEdit: false,
      taskTitle: this.title,
    };
  },
  methods: {
    setFocus() {
      this.$refs.taskTitle.focus();
    },
    showEdit() {
      this.isEdit = !this.isEdit;
      if (this.isEdit) { setTimeout(this.setFocus, 1000); }
    },
    async updateStatusTask() {
      try {
        await this.taskStore.updateStatusTask(this.idTask, this.isComplete);
        this.$emit('updateStatusTask');
      } catch (e) {
        this.msgErrors.push(e);
      }
    },
    async editTask() {
      try {
        await this.taskStore.editTask(this.idTask, this.taskTitle);
        this.isEdit = false;
        this.$emit('editTask');
      } catch (e) {
        this.msgErrors.push(e);
      }
    },
    async deleteTask() {
      try {
        await this.taskStore.deleteTask(this.idTask);
        this.$emit('deleteTask');
      } catch (e) {
        this.msgErrors.push(e);
      }
    },
  },
};
</script>
