<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";

const tatuadores = ref([
  {
    id: 1,
    nombre: "Carlos Ink",
    ciudad: "Villavicencio",
    instagram: "@carlos_ink",
    foto: "https://placehold.co/300",
  },
  {
    id: 2,
    nombre: "Tattoo Master",
    ciudad: "Bogotá",
    instagram: "@tattoo_master",
    foto: "https://placehold.co/300",
  },
  {
    id: 3,
    nombre: "Black Shadow",
    ciudad: "Medellín",
    instagram: "@black_shadow",
    foto: "https://placehold.co/300",
  },
]);
</script>

<template>
  <div class="min-h-screen bg-black p-5 text-white">
    <div class="flex items-center gap-10">
      <RouterLink to="/" class="text-[#00c853] hover:text-[#00e676]">← Volver</RouterLink>
    </div>
    <h1 class="mb-6 text-center text-3xl font-bold">Tatuadores</h1>
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div v-for="tatuador in tatuadores" :key="tatuador.id"
        class="rounded-lg bg-[#1a1a1a] p-5 shadow-lg hover:shadow-2xl transition">
        <img :src="tatuador.foto" alt="Foto del tatuador" class="w-full h-60 object-cover rounded-lg mb-4" />
        <h2 class="text-xl font-semibold">{{ tatuador.nombre }}</h2>
        <p class="font-bold opacity-60">{{ tatuador.instagram }}</p>
        <p class="text-gray-400">{{ tatuador.ciudad }}</p>
        <RouterLink :to="'/artists/profile/' + tatuador.id"
          class="mt-3 inline-block rounded bg-[#00c853] px-4 py-2 text-white transition hover:bg-[#00e676]">
          Ver más
        </RouterLink>
      </div>
    </div>
  </div>
</template>
