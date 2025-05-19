<template>
  <div>
    <h1>タスク一覧</h1>
    <ul>
      <li v-for="task in filteredTasks" :key="task.id">
        <div>タイトル：{{ task.title }}</div>
        <div>説明：{{ task.body }}</div>
        <div>ステータス：{{ task.status }}</div>
        <div>担当者：{{ task.assignee_id }}</div>
        <div>作成日時：{{ formatDate(task.created_at) }}</div>
        <div>更新日時：{{ formatDate(task.updated_at) }}</div>
        <button @click="editTask(task.id)">編集</button>
        <button @click="deleteTaskById(task.id)">削除</button>
      </li>
    </ul>
    <button @click="fetchTasks">更新</button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getTasks, deleteTask, Task } from '@/api/tasks';
import dayjs from 'dayjs';

const route = useRoute();
const router = useRouter();
const teamId = Number(route.params.id);

const tasks = ref<Task[]>([]);

const filteredTasks = computed(() =>
  tasks.value.filter(task => task.team_id === teamId)
);

const formatDate = (dateStr: Date): string => {
  return dayjs(dateStr).format('YYYY/MM/DD HH:mm');
};

const editTask = (id: number) => {
  router.push({ name: 'TaskEdit', params: { id } });
};

const deleteTaskById = async (id: number) => {
  if (confirm('本当にこのタスクを削除しますか？')) {
    try {
      await deleteTask(id);
      await fetchTasks();
    } catch (error) {
      console.error('タスクの削除に失敗しました:', error);
      alert('タスクの削除に失敗しました。');
    }
  }
};

const fetchTasks = async () => {
  try {
    const fetched = await getTasks(); // チームIDに限らず全件取得
    tasks.value = fetched;
  } catch (error) {
    console.error('タスクの取得に失敗しました:', error);
  }
};

onMounted(fetchTasks);
</script>
