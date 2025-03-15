import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../store/useAuthStore';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/home.vue'),
        meta: { hideSidebar: true }
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/auth/login.vue'),
    },
    {
        path: '/register-tatto',
        name: 'Registro',
        component: () => import('../views/auth/tattoRegister.vue'),
    },
    {
        path: '/register-user',
        name: 'RegistroUsuario',
        component: () => import('../views/auth/userRegister.vue'),
    },
    {
        path: '/validate-email/:token/',
        name: 'validateEmail',
        component: () => import('../views/auth/validateEmail.vue'),
    },
    {
        path: '/contact',
        name: 'contactenos',
        component: () => import('../views/contact.vue'),
    },
    {
        path: '/artists',
        name: 'artists',
        component: () => import('../views/artists.vue'),
    },
    {
        path: '/artists/profile/:id',
        name: 'tattoArtistProfile',
        component: () => import('../views/tattoArtistProfile.vue'),
    },
    {
        path: '/profile',
        name: 'profile',
        component: () => import('../views/profile.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/profile/settings',
        name: 'settings',
        component: () => import('../views/profileSettings.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/tattoos',
        name: 'tattoos',
        component: () => import('../views/tattoos.vue'),
    },
    {
        path: '/artists/tattoos/:id',
        name: 'tattoView',
        component: () => import('../views/tattooView.vue'),
    },
    {
        path: '/tattoos/create',
        name: 'createTattoo',
        component: () => import('../views/createTattoo.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/appointments',
        name: 'tattooistAppointments',
        component: () => import('../views/appointments.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/forgot-password',
        name: 'forgotPassword',
        component: () => import('../views/auth/forgotPassword.vue'),
    },
    {
        path: '/forgot-password/:token',
        name: 'resetPassword',
        component: () => import('../views/auth/forgotPasswordUpdate.vue'),
    },
    {
        path: '/sso-callback',
        name: 'ssoCallback',
        component: () => import('../components/auth/SSOCallback.vue'),
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('../views/NotFound.vue'),
    }
];

// Crear el enrutador
const router = createRouter({
    history: createWebHistory(), // Usa process.env.BASE_URL para Vue CLI
    routes,
});


router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()

    if (to.meta.requiresAuth && !authStore.token) {
        next('/login')
    } else if (['/login', '/register-user', '/register-tatto'].includes(to.path) && authStore.token) {
        next('/')
    } else {
        next()
    }
})


export default router;
