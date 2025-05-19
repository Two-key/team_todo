import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import Home from '@/pages/Home.vue';
import UserList from '@/components/user/UserList.vue';
import UserCreateForm from '@/components/user/UserCreateForm.vue';
import UserEditForm from '@/components/user/UserEditForm.vue';
import TeamList from '@/components/team/TeamList.vue';
import TeamCreateForm from '@/components/team/TeamCreateForm.vue';
import TeamShow from '@/components/team/TeamShow.vue';
import TeamEditForm from '@/components/team/TeamEditForm.vue';
import TaskCreateForm from '@/components/task/TaskCreateForm.vue';
import TaskEditForm from '@/components/task/TaskEditForm.vue';
import About from '@/pages/About.vue';
import NewTeam from '@/pages/NewTeam.vue';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/about/:id',
        name: 'About',
        component: About,
    },
    {
        path: '/new_team',
        name: 'NewTeam',
        component: NewTeam,
    },
    {
        path: '/tasks/new',
        name: 'TaskCreate',
        component: TaskCreateForm,
    },
    {
        path: '/tasks/:id/edit',
        name: 'TaskEdit',
        component: TaskEditForm,
        props: true,
    },
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