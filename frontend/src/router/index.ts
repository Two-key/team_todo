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
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.withCredentials = true; 

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'SignIn',
        component: SignIn,
        meta: { requiresAuth: false },
    },
    {
        path: '/signup',
        name: 'SignUp',
        component: SignUp,
        meta: { requiresAuth: false },
    },
    {
        path: '/users/:ownerId/teams',
        name: 'Home',
        component: Home,
        props: true,
        meta: { requiresAuth: true },
    },
    {
        path: '/teams/:teamId/about',
        name: 'About',
        component: About,
        props: true,
        meta: { requiresAuth: true },
    },
    {
        path: '/users/:ownerId/new_team',
        name: 'NewTeam',
        component: NewTeam,
        meta: { requiresAuth: true },
    },
    {
        path: '/teams/:teamId/tasks/new',
        name: 'TaskCreate',
        component: TaskCreateForm,
        props: true,
        meta: { requiresAuth: true },
    },
    {
        path: '/teams/:teamId/tasks/:id/edit',
        name: 'TaskEdit',
        component: TaskEditForm,
        props: true,
        meta: { requiresAuth: true },
    },
    {
        path: '/teams',
        name: 'TeamList',
        component: TeamList,
        meta: { requiresAuth: true },
    },
    {
        path: '/teams/:id',
        name: 'TeamShow',
        component: TeamShow,
        props: true,
        meta: { requiresAuth: true },
    },
    {
        path: '/teams/new',
        name: 'TeamCreate',
        component: TeamCreateForm,
        meta: { requiresAuth: true },
    },
    {
        path: '/teams/:id/edit',
        name: 'TeamEdit',
        component: TeamEditForm,
        props: true,
        meta: { requiresAuth: true },
    },
    {
        path: '/users',
        name: 'UserList',
        component: UserList,
        meta: { requiresAuth: true },
    },
    {
        path: '/users/new',
        name: 'UserCreate',
        component: UserCreateForm,
        meta: { requiresAuth: true },
    },
    {
        path: '/users/:id/edit',
        name: 'UserEdit',
        component: UserEditForm,
        props: true,
        meta: { requiresAuth: true },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// ナビゲーションガード
router.beforeEach(async (to, from, next) => {
    const checkAuth = async () => {
        try {
            const response = await axios.get('/api/authentication/check', { withCredentials: true });
            return response.status === 200;
        } catch (error) {
            console.error('認証チェックエラー:', error);
            return false;
        }
    };

    if (to.path === '/') {
        const isAuthenticated = await checkAuth();
        if (isAuthenticated) {
            try {
                const response = await axios.get('/api/authentication/check', { withCredentials: true });
                const userId = response.data.user.id;
                next({ name: 'Home', params: { ownerId: userId } });
            } catch (error) {
                next({ name: 'SignIn' });
            }
        } else {
            next();
        }
    } else {
        if (to.meta.requiresAuth) {
            const isAuthenticated = await checkAuth();
            if (isAuthenticated) {
                next();
            } else {
                next({ name: 'SignIn' });
            }
        } else {
            next();
        }
    }
});

export default router;