<script setup>
import { onMounted, ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { getTattooPosts } from "../services/api";
import Spinner from "../components/Spinner.vue";
import { toast } from "vue3-toastify";

const router = useRouter();

const tattoos = ref([]);
const loading = ref(true)

onMounted(() => {
    getTattooPosts()
        .then((res) => {
            console.log(res.data);
            tattoos.value = res.data;
        })
        .catch((error) => {
            console.error("Error al obtener los tatuajes:", error);
            toast.error("Error al obtener los tatuajes");
        })
        .finally(() => {
            loading.value = false;
        })
})
</script>

<template>
    <div class="min-h-screen bg-black p-5 text-white">
        <div class="flex items-center gap-10">
            <RouterLink to="/" class="text-[#00c853] hover:text-[#00e676]">← Volver</RouterLink>
        </div>
        <h1 class="mb-6 text-center font-bold text-tatto">Tatuajes</h1>

        <div v-if="loading" class="justify-center items-center flex w-full h-[27rem]">
            <Spinner />
        </div>
        <div v-else class="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            <div v-for="tattoo in tattoos" :key="tattoo._id"
                class="relative cursor-pointer break-inside-avoid overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition group">

                <!-- Imagen del tatuaje -->
                <img :src="tattoo.images[1].url" alt="Foto del tatuaje"
                    @click="router.push(`/artists/profile/${tattoo._id}`)"
                    class="w-full h-full object-cover rounded-lg transition group-hover:brightness-75 min-h-[300px]">

                <!-- Información del tatuador -->
                <div class="absolute top-0 left-0 w-full bg-black/60 p-4">
                    <h2 class="text-md font-semibold text-white">Tatuador: {{ tattoo.TattooArtist.name }}</h2>
                    <p class="font-bold text-sm text-gray-300">Tipo: {{ tattoo.TattooArtist.specialty }}</p>
                </div>

                <!-- Indicador de likes o estrellas -->
                <div
                    class="absolute top-3 right-3 flex items-center bg-black/70 px-3 py-1 rounded-full text-white text-sm">
                    <span class="mr-1">⭐</span>
                    <span class="font-bold">{{ tattoo.countLikes || 0 }}</span>
                </div>

                <!-- Información del tatuaje -->
                <div class="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-4">
                    <h2 class="text-xl font-semibold text-white">{{ tattoo.nombre }}</h2>
                    <RouterLink :to="'/artists/profile/' + tattoo.TattooArtist._id"
                        class="mt-3 inline-block rounded bg-[#00c853] px-4 py-2 text-white transition hover:bg-[#00e676]">
                        Ver artista
                    </RouterLink>
                </div>
            </div>

        </div>
    </div>
</template>
