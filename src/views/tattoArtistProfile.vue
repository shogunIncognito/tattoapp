<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const tatuador = ref({
    id: 1,
    nombre: "Carlos Ink",
    image: 'https://img.freepik.com/premium-photo/photo-young-man-barbershop-getting-his-hair-trimmed_747552-2444.jpg',
    especialidad: "Realismo",
    experiencia: 10,
    redes_sociales: {
        instagram: "@carlos_ink",
        facebook: "Carlos Ink Tattoo",
    },
    portafolio: [
        "https://3.bp.blogspot.com/-R_TcTfrUONM/WeenHyNcVtI/AAAAAAAAdQM/UmDQtnBXowk22AiuA3ZKy5HSuHqJ8SMcgCLcBGAs/s1600/tatuajes+mejores.jpg",
        "https://nextluxury.com/wp-content/uploads/black-and-grey-shaded-male-moth-leg-sleeve-tattoo-ideas.jpg",
        "https://outsons.com/wp-content/uploads/2022/07/Clock-Rose-And-Butterfly-Tattoo-Designs-768x960.jpg",
    ],
    direccion: "Calle 123 #45-67, Villavicencio",
    horario: "Lunes - Viernes: 10 AM - 7 PM",
});
</script>

<template>
    <div class="min-h-screen bg-black p-5 text-white">
        <div class="flex items-center gap-10">
            <button @click="router.back()" class="text-[#00c853] hover:text-[#00e676]">← Volver</button>
            <h1 class="text-3xl font-bold">Perfil del Tatuador</h1>
        </div>
        <div class="max-w-4xl mx-auto bg-[#1a1a1a] p-6 rounded-lg shadow-lg">
            <div class="flex items-center gap-10">
                <h1 class="text-3xl font-bold mb-4">{{ tatuador.nombre }}</h1>
                <img :src="tatuador.image" alt="Foto del tatuador" class="w-40 rounded-full h-40 object-cover" />
            </div>
            <h1>ID: {{ $route.params.id }}</h1>
            <p class="text-gray-400 mb-2"><strong>Especialidad:</strong> {{ tatuador.especialidad }}</p>
            <p class="text-gray-400 mb-2"><strong>Años de experiencia:</strong> {{ tatuador.experiencia }}</p>
            <p class="text-gray-400 mb-2"><strong>Dirección:</strong> {{ tatuador.direccion }}</p>
            <p class="text-gray-400 mb-4"><strong>Horario:</strong> {{ tatuador.horario }}</p>

            <div class="mb-4">
                <h2 class="text-xl font-semibold mb-2">Redes Sociales</h2>
                <p v-if="tatuador.redes_sociales.instagram">Instagram: <a
                        :href="`https://instagram.com/${tatuador.redes_sociales.instagram.replace('@', '')}`"
                        target="_blank" class="text-[#00e676]">{{ tatuador.redes_sociales.instagram }}</a></p>
                <p v-if="tatuador.redes_sociales.facebook">Facebook: <span class="text-[#00e676]">{{
                    tatuador.redes_sociales.facebook }}</span></p>
            </div>

            <div>
                <h2 class="text-xl font-semibold mb-2">Portafolio</h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <img v-for="(imagen, index) in tatuador.portafolio" :key="index" :src="imagen"
                        alt="Tatuaje realizado" class="rounded-lg shadow-lg w-full h-40 object-cover" />
                </div>
            </div>
        </div>
    </div>
</template>
