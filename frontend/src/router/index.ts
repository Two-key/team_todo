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
import SignUp from '@/pages/SignUp.vue';
import SignIn from '@/pages/SignIn.vue';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'SignIn',
        component: SignIn,
    },
    {
        path: '/signup',
        name: 'SignUp',
        component: SignUp,
    },
    {
        path: '/users/:ownerId/teams',
        name: 'Home',
        component: Home,
        props: true,
    },
    {
        path: '/teams/:teamId/about',
        name: 'About',
        component: About,
        props: true,
    },
    {
        path: '/users/:ownerId/new_team',
        name: 'NewTeam',
        component: NewTeam,
    },
    {
        path: '/teams/:teamId/tasks/new',
        name: 'TaskCreate',
        component: TaskCreateForm,
        props: true,
    },
    {
        path: '/teams/:teamId/tasks/:id/edit',
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
        props: true,
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