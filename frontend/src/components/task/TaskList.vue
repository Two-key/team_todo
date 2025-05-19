<template>
    <div>
      <h1>タスク一覧</h1>
      <ul>
        <li v-for="task in tasks" :key="task.id">
          {{ task.title }}
          <div>説明：{{ task.body }}</div>
          <div>ステータス：{{ task.status }}</div>
          <div>担当者：{{ task.assignee_id}}</div>
          <div>作成日時：{{ task.created_at }}</div>
          <div>更新日時：{{ task.updated_at }}</div>
        </li>
      </ul>
      <button @click="fetchTasks">更新</button>
    </div>
</template>
  
<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { getTasks, Task } from '@/api/tasks';
  
  const tasks = ref<Task[]>([]);
  const router = useRouter();
  
  const fetchTasks = async () => {
    tasks.value = await getTasks();
  };
  
  onMounted(fetchTasks);
</script>
  