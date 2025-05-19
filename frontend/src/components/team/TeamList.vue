<template>
    <div>
      <h1>チーム一覧</h1>
      <ul>
        <li v-for="team in teams" :key="team.id">
          <router-link :to="{ name: 'About', params: { id: team.id } }">
            {{ team.name }}
          </router-link>
        </li>
      </ul>
      <button @click="fetchTeams">更新</button>
      <button @click="createTeam">新しいチームを追加</button>
    </div>
</template>
  
<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { getTeams, Team } from '@/api/teams';
  
  const teams = ref<Team[]>([]);
  const router = useRouter();
  
  const fetchTeams = async () => {
    teams.value = await getTeams();
  };
  
  const createTeam = () => {
    router.push({ name: 'NewTeam'});
  };
  
  onMounted(fetchTeams);
</script>
  