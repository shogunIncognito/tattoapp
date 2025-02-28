<script setup>
import { onMounted, ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { fetchUser } from "../services/api";
import Spinner from "../components/Spinner.vue";
import { GrConfigure } from "vue-icons-plus/gr";
import { BiSolidPencil } from "vue-icons-plus/bi";

const router = useRouter();

const tatooist = ref(null);
const loading = ref(true);

onMounted(() => {
    const token = localStorage.getItem("token");
    fetchUser(token)
        .then((res) => {
            console.log("Usuario:", res.data);
            tatooist.value = res.data.tattooArtist;
        })
        .catch((error) => {
            console.error("Error al obtener el usuario:", error);
        })
        .finally(() => {
            loading.value = false;
        });
})
</script>

<template>
    <div v-if="loading"
        class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center">
        <Spinner />
    </div>
    <div v-else class="min-h-screen bg-black p-5 text-white">
        <div class="flex items-center gap-10 mb-10">
            <button @click="router.back()" class="text-[#00c853] hover:text-[#00e676]">← Volver</button>
            <h1 class="text-3xl font-bold">Perfil del Tatuador</h1>
        </div>
        <div class="max-w-4xl mx-auto bg-[#1a1a1a] p-6 rounded-lg shadow-lg">
            <div class="flex justify-between gap-10">
                <div class="flex items-center gap-4">
                    <h1 class="text-3xl font-bold mb-4">{{ tatooist.name }}</h1>
                    <img :src="tatooist.image || 'https://placehold.co/600x400'" alt="Foto del tatuador"
                        class="w-40 rounded-full h-40 object-cover" />
                </div>
                <RouterLink to="/profile/settings">
                    <BiSolidPencil class="text-[#00c853] text-4xl" />
                </RouterLink>
            </div>
            <p class="text-gray-400 mb-2"><strong>Especialidad:</strong> {{ tatooist.speciality }}</p>
            <p class="text-gray-400 mb-2"><strong>Años de experiencia:</strong> {{ tatooist.experience }}</p>
            <p class="text-gray-400 mb-2"><strong>Dirección:</strong> {{ tatooist.direccion }}</p>
            <p class="text-gray-400 mb-4"><strong>Horario:</strong> {{ tatooist.horario }}</p>

            <!-- <div class="mb-4">
                <h2 class="text-xl font-semibold mb-2">Redes Sociales</h2>
                <p v-if="tatooist.redes_sociales.instagram">Instagram: <a
                        :href="`https://instagram.com/${tatooist.redes_sociales.instagram.replace('@', '')}`"
                        target="_blank" class="text-[#00e676]">{{ tatooist.redes_sociales.instagram }}</a></p>
                <p v-if="tatooist.redes_sociales.facebook">Facebook: <span class="text-[#00e676]">{{
                    tatooist.redes_sociales.facebook }}</span></p>
            </div> -->

            <div>
                <h2 class="text-xl font-semibold mb-2">Portafolio</h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <img v-for="(imagen, index) in tatooist.portafolio" :key="index" :src="imagen"
                        alt="Tatuaje realizado" class="rounded-lg shadow-lg w-full h-40 object-cover" />
                </div>
            </div>
        </div>
    </div>
</template>
