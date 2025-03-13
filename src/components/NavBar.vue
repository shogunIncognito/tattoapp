<script setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/useAuthStore';
import { commonRoutes, loggedRoutes } from '../utils/consts';
import { BiExit, BiMenu } from 'vue-icons-plus/bi';
import { computed, ref } from 'vue';
import { toast } from 'vue3-toastify';
import { useClerk } from '@clerk/vue';

const router = useRouter();
const authStore = useAuthStore();
const isOpen = ref(false);
const clerk = useClerk();
const appRoutes = computed(() =>
    !authStore.user
        ? commonRoutes
        : authStore.user.type === 'tattooArtist'
            ? loggedRoutes.tattooistRoutes
            : loggedRoutes.userRoutes
);

const handleLogout = () => {
    authStore.deleteSession();
    clerk.value.signOut({ redirectUrl: undefined });
    router.push('/');
};
</script>

<template>
    <nav class="w-full fixed z-50 bg-opacity-50 backdrop-blur-md p-2 ring-neon">
        <div class="flex justify-center md:justify-center px-4 min-h-8">
            <button class="md:hidden text-white text-lg" @click="isOpen = !isOpen">
                <BiMenu />
            </button>
            <ul :class="{ 'hidden md:flex': !isOpen }"
                class="flex flex-col md:flex-row gap-4 list-none m-0 bg-black/90 md:bg-transparent absolute md:relative top-12 md:top-0 left-0 w-full md:w-auto p-4 md:p-0 md:justify-center">
                <li v-for="item in appRoutes" :key="item.name"
                    :class="{ 'bg-white/15 border border-white/30': $route.path === item.route }"
                    @click="router.push(item.route); isOpen = false"
                    class="cursor-pointer px-4 py-2 rounded-full text-white text-sm transition-all duration-300 border border-transparent hover:bg-white/10 hover:border-white/20">
                    {{ item.name }}
                </li>
                <li v-if="authStore.user" @click="handleLogout(); isOpen = false"
                    class="cursor-pointer z-20 px-4 py-2 rounded-full text-white text-sm transition-all duration-300 border border-transparent hover:bg-white/10 hover:border-white/20">
                    <BiExit />
                </li>
            </ul>
        </div>
    </nav>
</template>