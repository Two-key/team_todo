<template>
  <div>
    <h1>タスク一覧</h1>
    <ul>
      <li v-for="task in filteredTasks" :key="task.id">
        <div>タイトル：{{ task.title }}</div>
        <div>説明：{{ task.body }}</div>
        <div>ステータス：{{ getStatusText(task.status) }}</div>
        <div>担当者：{{ getUserNameById(task.assignee_id) }}</div>
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
import { getUsers, User} from '@/api/users';
import { options } from '@/components/task/status'

import dayjs from 'dayjs';

const route = useRoute();
const router = useRouter();
const teamId = Number(route.params.teamId);

const tasks = ref<Task[]>([]);
const users = ref<User[]>([]);

const filteredTasks = computed(() =>
  tasks.value.filter(task => task.team_id === teamId)
);

const getUserNameById = (id: number | null): string => {
  if (id === null) return '未設定';
  const user = users.value.find(user => user.id === id);
  return user ? user.name : '未設定';
};

const getStatusText = (value: number): string => {
  const option = options.find(o => o.value === value);
  return option ? option.text : '不明';
};

const formatDate = (dateStr: Date): string => {
  return dayjs(dateStr).format('YYYY/MM/DD HH:mm');
};

const editTask = (id: number) => {
  router.push({ name: 'TaskEdit', params: { teamId, id } });
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

const fetchUsers = async () => {
  users.value = await getUsers();
}

const fetchTasks = async () => {
  try {
    const fetched = await getTasks();
    tasks.value = fetched;
  } catch (error) {
    console.error('タスクの取得に失敗しました:', error);
  }
};

onMounted(async () => {
  await fetchUsers();
  await fetchTasks();
});
</script>
