<template>
    <div>
      <h1>ユーザー一覧</h1>
      <ul>
        <li v-for="user in users" :key="user.id">
          <button @click="loginUser(user.id)">
          {{ user.name }} ({{ user.email }})
          </button>
          <button @click="editUser(user.id)">編集</button>
          <button @click="deleteUserById(user.id)">削除</button>
        </li>
      </ul>
      <button @click="fetchUsers">更新</button>
      <router-link to="/users/new">新しいユーザーを追加</router-link>
    </div>
</template>
  
<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { getUsers, deleteUser, User } from '@/api/users';
  
  const users = ref<User[]>([]);
  const router = useRouter();
  
  const fetchUsers = async () => {
    console.log('fetchUsers 実行');
    users.value = await getUsers();
  };

  const loginUser = (id: number) => {
    router.push({ name: 'Home', params: { id } });
  }
  
  const editUser = (id: number) => {
    router.push({ name: 'UserEdit', params: { id } });
  };
  
  const deleteUserById = async (id: number) => {
    if (confirm('本当にこのユーザーを削除しますか？')) {
      try {
        await deleteUser(id);
        await fetchUsers();
      } catch (error) {
        console.error('ユーザーの削除に失敗しました:', error);
        alert('ユーザーの削除に失敗しました。');
      }
    }
  };
  
  onMounted(fetchUsers);
  
</script>
  