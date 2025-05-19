<template>
  <div v-if="team">
    <div>
      <h1>チーム詳細</h1>
      <ul>
        <li id="name">チーム名:{{ team.name }}</li>
        <li>オーナーID:{{ team.owner_id }}</li>
        <li>作成日時:{{ formatDate(team.created_at) }}</li>
        <li>更新日時:{{ formatDate(team.updated_at) }}</li>
      </ul>
      <button @click="editTeam(team.id)">編集</button>
      <button @click="deleteTeamById(team.id)">削除</button>
    </div>
  </div>
  <div v-else>
      <p>チーム情報をロード中...</p>
  </div>
</template>
  
<script setup lang="ts">
  import dayjs from 'dayjs'
  import { ref, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { getTeam, deleteTeam, Team } from '@/api/teams';

  const formatDate = (dateStr: Date): string => {
    return dayjs(dateStr).format('YYYY/MM/DD HH:mm')
  }
  
  const team = ref<Team | null>(null);
  const route = useRoute();
  const router = useRouter();
  
  const fetchTeam = async () => {
    const id = Number(route.params.id);
    team.value = await getTeam(id);
  };
  
  const editTeam = (id: number) => {
    router.push({ name: 'TeamEdit', params: { id } });
  };
  
  const deleteTeamById = async (id: number) => {
    if (confirm('本当にこのチームを削除しますか？')) {
      try {
        await deleteTeam(id);
        router.push({ name: 'TeamList'})
      } catch (error) {
        console.error('チームの削除に失敗しました:', error);
        alert('チームの削除に失敗しました。');
      }
    }
  };
  
  onMounted(fetchTeam);
</script>
  