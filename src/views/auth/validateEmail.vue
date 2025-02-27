<script setup>
import { onMounted, ref } from 'vue';
import { AiFillCheckCircle } from 'vue-icons-plus/ai';
import { RouterLink, useRoute } from 'vue-router';
import Spinner from '@/components/Spinner.vue';

const router = useRoute();
const verified = ref(false);

onMounted(() => {
    console.log(router.params);
    setTimeout(() => {
        verified.value = true;
        console.log('Correo ' + router.params.token + ' validado correctamente');
    }, 2000);
});
</script>

<template>
    <div class="flex justify-center items-center h-screen">
        <Spinner v-if="!verified" class="text-neon" size="40" />
        <div v-else
            class="bg-darker text-white p-4 rounded-lg shadow-lg text-center justify-center items-center flex flex-col gap-3">
            <AiFillCheckCircle class="text-neon" size="40" />
            <h1>Correo validado correctamente</h1>
            <RouterLink to="/" class="text-neon p-2 bg-dark rounded">Iniciar sesión</RouterLink>
        </div>
    </div>
</template>