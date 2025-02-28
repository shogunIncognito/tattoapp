<script setup>
import { ref } from "vue";
import { RouterLink, useRouter } from "vue-router";

const router = useRouter();

const tattoos = ref([
    {
        id: 1,
        artist: {
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
        nombre: "Flor Mano",
        descripcion: "Tatuaje de una flor en la mano",
        foto: ["https://feelfarbig.com/wp-content/uploads/2022/09/backout_tattoo-09.jpg"],
    },
    {
        id: 1,
        artist: {
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
        nombre: "Flor Mano",
        descripcion: "Tatuaje de una flor en la mano",
        foto: ["https://th.bing.com/th/id/OIP.k0-gK6Z3PonaXJvKLoxqjgHaF-?rs=1&pid=ImgDetMain"],
    },
    {
        id: 1,
        artist: {
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
        nombre: "Flor Mano",
        descripcion: "Tatuaje de una flor en la mano",
        foto: ["https://th.bing.com/th/id/OIP.k0-gK6Z3PonaXJvKLoxqjgHaF-?rs=1&pid=ImgDetMain"],
    },
    {
        id: 1,
        artist: {
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
        nombre: "Flor Mano",
        descripcion: "Tatuaje de una flor en la mano",
        foto: ["https://th.bing.com/th/id/OIP.k0-gK6Z3PonaXJvKLoxqjgHaF-?rs=1&pid=ImgDetMain"],
    },
]);
</script>

<template>
    <div class="min-h-screen bg-black p-5 text-white">
        <div class="flex items-center gap-10">
            <RouterLink to="/" class="text-[#00c853] hover:text-[#00e676]">← Volver</RouterLink>
        </div>
        <h1 class="mb-6 text-center font-bold text-tatto">Tatuajes</h1>

        <div class="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            <div v-for="tattoo in tattoos" :key="tattoo.id"
                class="relative cursor-pointer break-inside-avoid overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition group"
                @click="router.push(`/artists/profile/${tattoo.id}`)">
                <img :src="tattoo.foto[0]" alt="Foto del tatuador"
                    class="w-full h-full object-cover rounded-lg transition group-hover:brightness-75" />

                <div class="absolute top-0 left-0 w-full transparent bg-dark p-4 opacity-80">
                    <h2 class="text-xl font-semibold">Tatuador: {{ tattoo.artist.nombre }}</h2>
                    <p class="font-bold opacity-60">Tipo: {{ tattoo.artist.especialidad }}</p>
                </div>

                <div class="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-4">
                    <h2 class="text-xl font-semibold">{{ tattoo.nombre }}</h2>
                    <p class="font-bold opacity-60">{{ tattoo.descripcion }}</p>
                    <RouterLink :to="'/artists/profile/' + tattoo.id"
                        class="mt-3 inline-block rounded bg-[#00c853] px-4 py-2 text-white transition hover:bg-[#00e676]">
                        Ver artista
                    </RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>
