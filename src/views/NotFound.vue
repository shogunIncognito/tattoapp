<script setup lang="ts">
import { BiSad } from 'vue-icons-plus/bi';
import { Fa6FaceSadCry } from 'vue-icons-plus/fa6';
import { RouterLink } from 'vue-router';

</script>

<template>
    <div class="text-white justify-center flex items-center h-[80dvh] flex-col gap-1">
        <h2 class="text-2xl">Esta ruta no existe</h2>
        <BiSad class="text-neon w-10 h-10" />
        <RouterLink to="/" class="text-neon mt-5">Volver al inicio</RouterLink>
    </div>
</template>