// /store/task.js

import { defineStore } from 'pinia';
import { supabase } from '../supabase/index';

export const useTaskStore = defineStore('tasks', {
  state: () => ({
    tasks: null,
  }),
  actions: {
    async fetchTasks() {
      const { data: tasks } = await supabase
        .from('tasks')
        .select('*')
        .order('id', { ascending: false });
      this.tasks = tasks;
    },
    async newTask(taskTitle, userID) {
      await supabase
        .from('tasks')
        .insert([{ title: taskTitle, is_complete: false, user_id: userID }]);
      this.fetchTasks();
    },
    async updateStatusTask(taskID, taskStatus) {
      await supabase
        .from('tasks')
        .update({ is_complete: taskStatus })
        .match({ id: taskID });
      this.fetchTasks();
    },
    async editTask(taskID, taskTitle) {
      await supabase
        .from('tasks')
        .update({ title: taskTitle })
        .match({ id: taskID });
      this.fetchTasks();
    },
    async deleteTask(taskID) {
      await supabase
        .from('tasks')
        .delete()
        .match({ id: taskID });
      this.fetchTasks();
    },
  },
});
