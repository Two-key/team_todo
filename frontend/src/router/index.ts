import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import UserList from '@/components/UserList.vue';
import UserCreateForm from '@/components/UserCreateForm.vue';
import UserEditForm from '@/components/UserEditForm.vue';
import TeamList from '@/components/TeamList.vue';
import TeamCreateForm from '@/components/TeamCreateForm.vue';
import TeamShow from '@/components/TeamShow.vue';
import TeamEditForm from '@/components/TeamEditForm.vue';

const routes: RouteRecordRaw[] = [
    {
        path: '/teams',
        name: 'TeamList',
        component: TeamList,
    },
    {
        path: '/teams/:id',
        name: 'TeamShow',
        component: TeamShow,
    },
    {
        path: '/teams/new',
        name: 'TeamCreate',
        component: TeamCreateForm,
    },
    {
        path: '/teams/:id/edit',
        name: 'TeamEdit',
        component: TeamEditForm,
        props: true,
    },
    {
        path: '/users',
        name: 'UserList',
        component: UserList,
    },
    {
        path: '/users/new',
        name: 'UserCreate',
        component: UserCreateForm,
    },
    {
        path: '/users/:id/edit',
        name: 'UserEdit',
        component: UserEditForm,
        props: true,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;