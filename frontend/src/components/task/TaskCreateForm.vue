<template>
    <div>
        <h2>新しいタスク</h2>
        <form @submit.prevent="submitForm">
        <div>
            <label for="title">タイトル:</label>
            <input type="text" id="title" v-model="newTask.title" required>
        </div>
        <div>
            <label for="body">説明:</label>
            <input type="text" id="body" v-model="newTask.body" required>
        </div>
        <div>
            <label for="status">ステータス:</label>
            <select id="status" v-model="newTask.status">
                <option v-for="option in options" :value="option.value" :key="option.value">
                    {{ option.text }}
                </option>
            </select>
        </div>
        <div>
            <label for="status">担当者:</label>
            <select v-model.number="newTask.assignee_id">
                <option v-for="user in users" :value="user.id" :key="user.id">
                    {{ user.name }}
                </option>
            </select>
        </div>
        <button type="submit">作成</button>
        <div v-if="errorMessage" style="color: red;">{{ errorMessage }}</div>
    </form>
    </div>
</template>

<script setup lang="ts">
import { onMounted,ref } from 'vue';
import { createTask, Task } from '@/api/tasks';
import { getUsers, User } from '@/api/users';
import { useRoute, useRouter } from 'vue-router'
import { getTeam, Team } from '@/api/teams';
import { options } from '@/components/task/status'

const route = useRoute();
const users = ref<User[]>([]);
const team = ref<Team | null>(null);
const teamId = ref<number>(Number(route.params.teamId));

const fetchUsers = async () => {
    users.value = await getUsers();
};

const fetchTeam = async () => {
    const id = Number(route.params.teamId);
    team.value = await getTeam(id);
    newTask.value.team_id = id;
};

onMounted(() => {
    fetchUsers();
    fetchTeam();
});

const newTask = ref<Omit<Task, 'id'| 'created_at'| 'updated_at'>>({
    title: '',
    body: '',
    status: 1,
    assignee_id: 1,
    team_id: 1,
});
const errorMessage = ref<string | null>(null);

const router = useRouter();

const emit = defineEmits(['task-created']);

const submitForm = async () => {
    try {
        newTask.value.team_id = Number(route.params.teamId);
        newTask.value.assignee_id = Number(newTask.value.assignee_id);

        const taskToCreate = {
            title: newTask.value.title,
            body: newTask.value.body,
            status: Number(newTask.value.status),
            assignee_id: newTask.value.assignee_id,
            team_id: Number(route.params.teamId),
        };

        const createdTask = await createTask(taskToCreate);
        emit('task-created', createdTask);
        
        newTask.value = {
        title: '',
        body: '',
        status: 1,
        assignee_id: null,
        team_id: Number(route.params.teamId),
        };

        errorMessage.value = null;
        router.push({ name: 'About', params: { teamId: teamId.value }});
    } catch (error: any) {
        errorMessage.value = 'タスクの作成に失敗しました。';
        if (error.response && error.response.data) {
            console.error('エラー詳細:', error.response.data);

            if (error.response.data.error) {
        errorMessage.value = `エラー: ${error.response.data.error}`;
        } else if (typeof error.response.data === 'object') {
        // オブジェクトの場合は各フィールドのエラーを表示
        const errorDetails = Object.entries(error.response.data)
            .map(([key, value]) => `${key}: ${value}`)
            .join(', ');
        errorMessage.value = `バリデーションエラー: ${errorDetails}`;
        }
        }
    }
};

</script>