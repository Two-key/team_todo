<template>
    <div>
      <h1>チーム一覧</h1>
      <ul>
        <li v-for="team in filteredTeams" :key="team.id">
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
  import { ref,computed, onMounted } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { getTeams, Team } from '@/api/teams';// 修正　ログイン中のユーザーIDに紐づくチーム一覧を取得するAPIを呼ぶ　
  
  const route = useRoute();

  const teams = ref<Team[]>([]);
  const router = useRouter();
  const ownerId = Number(route.params.ownerId); //パラメーターのIDではなく、ログイン中のID(ローカルストレージかCookie)から取得するようにする　いらないかも？

  const filteredTeams = computed(() =>
  teams.value.filter(team => team.owner_id === ownerId)
);
  
  const fetchTeams = async () => {
    teams.value = await getTeams();
  };
  
  const createTeam = () => {
    router.push({ name: 'NewTeam', params: { ownerId } });//ここの次のページではオーナーIDは自分なので、パラメーターは必要なし
  };
  
  onMounted(fetchTeams);
</script>
  