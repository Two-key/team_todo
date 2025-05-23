<script setup lang="ts">
import { logout } from "@/api/login";
import { useRouter } from 'vue-router';

const router = useRouter();

const logOut = async () => {
    try {
    await logout();
    router.push({ name: 'SignIn'})
}catch (error) {
    console.error('ログアウトに失敗しました', error)
}
}

</script>

<template>
    <div id="app">
        <button type ="submit" @click="logOut">ログアウト</button>
    </div>
</template>