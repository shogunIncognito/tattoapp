<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const router = useRoute();

const verified = ref(false);

onMounted(() => {
    console.log(router.params);
    setTimeout(() => {
        verified.value = true;
    }, 2000);
});

</script>

<template>
    <div class="flex justify-center items-center h-screen">
        <h2 v-if="!verified" class="text-white">Cargando</h2>
        <div v-else class="bg-dark text-white p-4 rounded-lg shadow-lg text-center">
            <h1>Correo validado correctamente</h1>
            <p class="text-neon">Iniciar sesion</p>
        </div>
    </div>
</template>