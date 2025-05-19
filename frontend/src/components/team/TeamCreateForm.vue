<template>
    <div>
        <h2>新規チーム作成</h2>
        <form @submit.prevent="submitForm">
        <div>
            <label for="name">チーム名:</label>
            <input type="text" id="name" v-model="newTeam.name" required>
        </div>
        <button type="submit">作成</button>
        <div v-if="errorMessage" style="color: red;">{{ errorMessage }}</div>
    </form>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { createTeam, Team } from '@/api/teams';
import { useRouter } from 'vue-router'

const newTeam = ref<Omit<Team, 'id' | 'created_at' | 'updated_at'>>({
    name: '',
    owner_id: 0
});

const errorMessage = ref<string | null>(null);

const router = useRouter();

const emit = defineEmits(['team-created']);

const submitForm = async () => {
    try {
    const createdTeam = await createTeam(newTeam.value as Omit<Team, 'id' | 'created_at' | 'updated_at'>);
    emit('team-created', createdTeam);
    newTeam.value = { name: '', owner_id: 0};
    errorMessage.value = null;
    router.push({ name: 'TeamList'})
    } catch (error: any) {
    errorMessage.value = 'チームの作成に失敗しました。';
    if (error.response && error.response.data) {
        console.error('エラー詳細:', error.response.data);
    }
    }
};
</script>