import { defineStore } from 'pinia';
import supabase from '../supabase';

export const useTaskStore = defineStore('tasks', {
  state: () => ({
    tasks: null,
  }),
  actions: {
    async fetchTasks() {
      const { data: tasks, error } = await supabase
        .from('tasks')
        .select('*')
        .order('id', { ascending: false });
      this.tasks = tasks;
      console.log('FETCHTASK', this.tasks.target);
      if (error) throw error;
    },
    async insertTodo(title, isComplete, userId) {
      const { error } = await supabase.from('tasks').insert([
        {
          title,
          isComplete,
          userId,
        },
      ]);
      if (error) throw error;
    },
    async editTodo(title, isComplete, taskId) {
      await supabase
        .from('tasks')
        .update({ title, isComplete })
        .match({ id: taskId });
      this.fetchTasks();
    },
    async deleteTodo(taskId) {
      await supabase
        .from('tasks')
        .delete()
        .match({ id: taskId });
      this.fetchTasks();
    },
  },
});
