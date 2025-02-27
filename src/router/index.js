import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/home.vue'),
        meta: { hideSidebar: true }
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
        path: '/contact',
        name: 'contactenos',
        component: () => import('../views/Contact.vue'),
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
        path: '/validate-email/:token/',
        name: 'validateEmail',
        component: () => import('../views/auth/validateEmail.vue'),
    }
];

// Crear el enrutador
const router = createRouter({
    history: createWebHistory(), // Usa process.env.BASE_URL para Vue CLI
    routes,
});

export default router;
