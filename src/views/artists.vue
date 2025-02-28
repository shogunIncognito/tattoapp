<script setup>
import { ref } from "vue";
import { RouterLink, useRouter } from "vue-router";

const router = useRouter();

const tatuadores = ref([
  {
    id: 1,
    nombre: "Carlos Ink",
    ciudad: "Villavicencio",
    instagram: "@carlos_ink",
    especialidad: "Realismo",
    experiencia: 10,
    direccion: "Calle 123 #45-67, Villavicencio",
    horario: "Lunes - Viernes: 10 AM - 7 PM",
    foto: "https://th.bing.com/th/id/OIP.Bboy_Os1bmV4bJH-LP3FZwHaE8?rs=1&pid=ImgDetMain",
  },
  {
    id: 2,
    nombre: "Tattoo Master",
    ciudad: "Bogotá",
    instagram: "@tattoo_master",
    especialidad: "Realismo",
    experiencia: 10,
    direccion: "Calle 123 #45-67, Villavicencio",
    horario: "Lunes - Viernes: 10 AM - 7 PM",
    foto: "https://cdn2.telediario.mx/uploads/media/2023/01/31/cesar-eduardo-porras-gonzalez-conocido.jpg",
  },
  {
    id: 1,
    nombre: "Carlos Ink",
    ciudad: "Villavicencio",
    instagram: "@carlos_ink",
    especialidad: "Realismo",
    experiencia: 10,
    direccion: "Calle 123 #45-67, Villavicencio",
    horario: "Lunes - Viernes: 10 AM - 7 PM",
    foto: "https://th.bing.com/th/id/OIP.Bboy_Os1bmV4bJH-LP3FZwHaE8?rs=1&pid=ImgDetMain",
  },
  {
    id: 2,
    nombre: "Tattoo Master",
    ciudad: "Bogotá",
    instagram: "@tattoo_master",
    especialidad: "Realismo",
    experiencia: 10,
    direccion: "Calle 123 #45-67, Villavicencio",
    horario: "Lunes - Viernes: 10 AM - 7 PM",
    foto: "https://cdn2.telediario.mx/uploads/media/2023/01/31/cesar-eduardo-porras-gonzalez-conocido.jpg",
  },
  {
    id: 3,
    nombre: "Black Shadow",
    ciudad: "Medellín",
    instagram: "@black_shadow",
    especialidad: "Realismo",
    experiencia: 10,
    direccion: "Calle 123 #45-67, Villavicencio",
    horario: "Lunes - Viernes: 10 AM - 7 PM",
    foto: "https://th.bing.com/th/id/OIP.Bboy_Os1bmV4bJH-LP3FZwHaE8?rs=1&pid=ImgDetMain",
  },
  {
    id: 3,
    nombre: "Black Shadow",
    ciudad: "Medellín",
    instagram: "@black_shadow",
    especialidad: "Realismo",
    experiencia: 10,
    direccion: "Calle 123 #45-67, Villavicencio",
    horario: "Lunes - Viernes: 10 AM - 7 PM",
    foto: "https://th.bing.com/th/id/OIP.Bboy_Os1bmV4bJH-LP3FZwHaE8?rs=1&pid=ImgDetMain",
  },
  {
    id: 4,
    nombre: "Ink Vision",
    ciudad: "Cali",
    instagram: "@ink_vision",
    especialidad: "Realismo",
    experiencia: 10,
    direccion: "Calle 123 #45-67, Villavicencio",
    horario: "Lunes - Viernes: 10 AM - 7 PM",
    foto: "https://th.bing.com/th/id/OIP.9Krdd5nRzjjE2ikQ60zhUwAAAA?rs=1&pid=ImgDetMain",
  },
  {
    id: 5,
    nombre: "Ink Vision",
    ciudad: "Cali",
    instagram: "@ink_vision",
    especialidad: "Realismo",
    experiencia: 10,
    direccion: "Calle 123 #45-67, Villavicencio",
    horario: "Lunes - Viernes: 10 AM - 7 PM",
    foto: "https://th.bing.com/th/id/OIP.9Krdd5nRzjjE2ikQ60zhUwAAAA?rs=1&pid=ImgDetMain",
  },
]);
</script>

<template>
  <div class="min-h-screen bg-black p-5 text-white">
    <div class="flex items-center gap-10">
      <RouterLink to="/" class="text-[#00c853] hover:text-[#00e676]">← Volver</RouterLink>
    </div>
    <h1 class="mb-6 text-center font-bold text-tatto">Tatuadores</h1>

    <div class="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
      <div v-for="tatuador in tatuadores" :key="tatuador.id"
        class="relative cursor-pointer break-inside-avoid overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition group"
        @click="router.push(`/artists/profile/${tatuador.id}`)">
        <img :src="tatuador.foto" alt="Foto del tatuador"
          class="w-full h-full object-cover rounded-lg transition group-hover:brightness-75" />

        <div class="right-0 top-0 absolute bg-dark p-2 text-white rounded-tl-lg rounded-br-lg">
          {{ tatuador.especialidad }}
        </div>

        <div class="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-4">
          <h2 class="text-xl font-semibold">{{ tatuador.nombre }}</h2>
          <p class="font-bold opacity-60">{{ tatuador.instagram }}</p>
          <p class="text-gray-400">{{ tatuador.direccion }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
