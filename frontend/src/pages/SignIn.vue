<template>
    <div>
        <h2>ログイン</h2>
        <form @submit.prevent="submitForm">
        <div>
            <label for="email">メールアドレス:</label>
            <input type="email" id="email" v-model="signinUser.email" required>
        </div>
        <div>
            <label for="password">パスワード:</label>
            <input type="password" id="password" v-model="signinUser.password" required minlength="6">
        </div>
        <button type="submit" :disabled="isLoading">
                {{ isLoading ? 'ログイン中...' : 'ログイン' }}
        </button>
        <button type="button" @click="signUp" :disabled="isLoading">新規登録</button>
    </form>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { login } from '@/api/login';
import { useRouter } from 'vue-router';
import { getUsers, User } from '@/api/users'

const router = useRouter();
const signinUser = ref<Omit<User, 'id' | 'name' | 'created_at' | 'updated_at'>>({ email: '', password: '' });
const errorMessage = ref<string | null>(null);
const isLoading = ref(false);

const signUp = async () => {
    router.push({ name: 'SignUp'})
}

const submitForm = async () => {
    errorMessage.value = null;
    isLoading.value = true;
    
    try {
        const res = await login(signinUser.value.email, signinUser.value.password);
        
        const users = await getUsers();
        
        const matchedUser = users.find(user => user.email === signinUser.value.email);
        if (!matchedUser) {
            throw new Error('該当ユーザーが見つかりません');
        }

        const ownerId = matchedUser.id;
        console.log('ownerId:', ownerId);
        router.push({ name: 'Home', params: { ownerId } });
    } catch (error: any) {
        errorMessage.value = 'ログインに失敗しました。メールアドレスまたはパスワードが正しくありません。';
        console.error('ログインエラー:', error.response?.data || error.message);
    } finally {
        isLoading.value = false;
    }
};
</script>