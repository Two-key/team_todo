<template>
    <div v-if="team">
      <h2>チーム名の編集</h2>
      <form @submit.prevent="submitForm">
        <div>
          <label for="name">名前:</label>
          <input type="text" id="name" v-model="team.name" required>
        </div>
        <button type="submit">更新</button>
        <div v-if="errorMessage" style="color: red;">{{ errorMessage }}</div>
      </form>
      <button @click="goBack">キャンセル</button>
    </div>
    <div v-else>
      <p>チーム情報をロード中...</p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { getTeam, updateTeam, Team } from '@/api/teams';
  
  const route = useRoute();
  const router = useRouter();
  const teamId = ref<number>(Number(route.params.id));
  const team = ref<Team | null>(null);
  const errorMessage = ref<string | null>(null);
  
  onMounted(async () => {
    await fetchTeam();
  });
  
  const fetchTeam = async () => {
    try {
      const fetchedTeam = await getTeam(teamId.value);
      team.value = { ...fetchedTeam};
    } catch (error) {
      console.error('チーム情報の取得に失敗しました:', error);
      errorMessage.value = 'チーム情報の取得に失敗しました。';
    }
  };
  
  const submitForm = async () => {
    if (team.value) {
      try {
        const updatedTeam = await updateTeam(teamId.value, {
          name: team.value.name,
          owner_id: team.value.owner_id
        });
        console.log('ユーザー情報を更新しました:', updatedTeam);
        router.push({ name: 'TeamList' });
      } catch (error: any) {
        errorMessage.value = 'チーム情報の更新に失敗しました。';
        if (error.response && error.response.data) {
          console.error('エラー詳細:', error.response.data);
        }
      }
    }
  };
  
  const goBack = () => {
    router.go(-1);
  };
  </script>
  
  
  