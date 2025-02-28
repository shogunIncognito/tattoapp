<script setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/useAuthStore';
import { commonRoutes, loggedRoutes } from '../utils/consts';
import { BiExit } from 'vue-icons-plus/bi';
import { computed, ref, watch } from 'vue';
import { toast } from 'vue3-toastify';

const router = useRouter();
const authStore = useAuthStore();

const appRoutes = computed(() => !authStore.user ? commonRoutes : authStore.user.type === 'tattooArtist' ? loggedRoutes.tattooistRoutes : loggedRoutes.userRoutes);

const handleLogout = () => {
    authStore.deleteSession();
    toast.success('Sesión cerrada', { autoClose: 1500 });
    router.push('/');
}

</script>
<template>
    <nav class="nav-container">
        <div class="nav-content ring-neon">
            <ul>
                <li v-for="item in appRoutes" :key="item.name" :class="{ active: $route.path === item.route }"
                    @click="router.push(item.route)" class="nav-item">
                    {{ item.name }}
                </li>
                <li v-if="authStore.user" @click="handleLogout" class="nav-item">
                    <BiExit />
                </li>
            </ul>
        </div>
    </nav>
</template>

<style>
/* Navegación moderna y translúcida */
.nav-content {
    width: 100%;
    z-index: 1000;
    position: fixed;
    backdrop-filter: blur(20px);
    padding: 8px 15px;
}

nav ul {
    list-style-type: none;
    display: flex;
    gap: 15px;
    padding: 0;
    margin: 0;
    justify-content: center;
}

.nav-item {
    cursor: pointer;
    padding: 8px 16px;
    border-radius: 20px;
    font-size: 14px;
    transition: all 0.3s ease;
    color: rgba(255, 255, 255);
    background: transparent;
    position: relative;
    white-space: nowrap;
    border: 1px solid transparent;
}

.nav-item:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: #fff;
    border-color: rgba(255, 255, 255, 0.2);
}

.nav-item.active {
    background-color: rgba(255, 255, 255, 0.15);
    color: #fff;
    border-color: rgba(255, 255, 255, 0.3);
}
</style>