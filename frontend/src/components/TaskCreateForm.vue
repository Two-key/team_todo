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
            <select v-model="selectedStatus">
                <option v-for="option in options" :value="option.value" :key="option.value">
                    {{ option.text }}
                </option>
            </select>
        </div>
        <button type="submit">作成</button>
        <div v-if="errorMessage" style="color: red;">{{ errorMessage }}</div>
    </form>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { createTask, Task } from '@/api/tasks';
import { useRouter } from 'vue-router'

const newTask = ref<Omit<Task, 'id'>>({
    title: '',
    body: '',
    status: 1,
    assignee_id: 0,
    created_at: new Date()
});
const errorMessage = ref<string | null>(null);

const router = useRouter();

const emit = defineEmits(['task-created']);

interface Status {
    value: number;
    text: string;
}

const submitForm = async () => {
    try {
    const createdTask = await createTask(newTask.value as Omit<Task, 'id'| 'created_at' >);
    emit('task-created', createdTask);
    newTask.value = {
        title: '',
        body: '',
        status: selectedStatus.value ?? 1,
        assignee_id: 0,
        created_at: new Date()
    };
    errorMessage.value = null;
    router.push({ name: 'TeamShow'})
    } catch (error: any) {
    errorMessage.value = 'タスクの作成に失敗しました。';
    if (error.response && error.response.data) {
        console.error('エラー詳細:', error.response.data);
    }
    }
};
const selectedStatus = ref<number | null>(null);
const options = ref<Status[]>([
    { value: 1, text: '未着手' },
    { value: 2, text: '進行中' },
    { value: 3, text: '完了' }
]);

</script>