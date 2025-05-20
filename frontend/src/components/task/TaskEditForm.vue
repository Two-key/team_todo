<template>
    <div v-if="task">
    <h2>タスクの編集</h2>
    <form @submit.prevent="submitForm">
        <div>
            <label for="title">タイトル:</label>
            <input type="text" id="title" v-model="editedTask.title" required>
        </div>
        <div>
            <label for="body">説明:</label>
            <input type="text" id="body" v-model="editedTask.body" required>
        </div>
        <div>
            <label for="status">ステータス:</label>
            <select id="status" v-model="editedTask.status">
                <option v-for="option in options" :value="option.value" :key="option.value">
                    {{ option.text }}
                </option>
            </select>
        </div>
        <div>
            <label for="status">担当者:</label>
            <select v-model.number="editedTask.assignee_id">
                <option v-for="user in users" :value="user.id" :key="user.id">
                    {{ user.name }}
                </option>
            </select>
        </div>
        <button type="submit">更新</button>
        <div v-if="errorMessage" style="color: red;">{{ errorMessage }}</div>
    </form>
    <button @click="goBack">キャンセル</button>
    </div>
    <div v-else>
        <p>タスク情報をロード中...</p>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getTask, updateTask, Task } from '@/api/tasks';
import { getUsers, User } from '@/api/users';
import { getTeam, Team } from '@/api/teams';

const route = useRoute();
const router = useRouter();
const taskId = ref<number>(Number(route.params.id));
const task = ref<Task | null>(null);
const errorMessage = ref<string | null>(null);
const users = ref<User[]>([]);
const team = ref<Team | null>(null);
const editedTask = ref<Omit<Task, 'id' | 'created_at' | 'updated_at'>>({
    title: '',
    body: '',
    status: 1,
    assignee_id: null,
    team_id: Number(route.params.teamId)
});

const fetchUsers = async () => {
    users.value = await getUsers();
};

const fetchTeam = async () => {
    const id = Number(route.params.teamId);
    team.value = await getTeam(id);
    editedTask.value.team_id = id;
};

onMounted(async () => {
    await fetchUsers();
    await fetchTeam();
    await fetchTask();
});

const fetchTask = async () => {
    try {
    const fetchedTask = await getTask(taskId.value);
    task.value = { ...fetchedTask};
    } catch (error) {
    console.error('タスク情報の取得に失敗しました:', error);
    errorMessage.value = 'タスク情報の取得に失敗しました。';
    }
};

const submitForm = async () => {
    if (task.value) {
    try {
        const updatedTask = await updateTask(taskId.value, editedTask.value);
        console.log('タスク情報を更新しました:', updatedTask
        );
        router.push({ name: 'About' });
    } catch (error: any) {
        errorMessage.value = 'タスク情報の更新に失敗しました。';
        if (error.response && error.response.data) {
        console.error('エラー詳細:', error.response.data);
        }
    }
    }
};

interface Status {
    value: number;
    text: string;
}

const options = ref<Status[]>([
    { value: 1, text: '未着手' },
    { value: 2, text: '進行中' },
    { value: 3, text: '完了' }
]);

const goBack = () => {
    router.go(-1);
};
</script>