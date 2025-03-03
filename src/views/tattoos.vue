<script setup>
import { onMounted, ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { getTattooPosts } from "../services/api";

const router = useRouter();

const tattoos = ref([]);

onMounted(() => {
    getTattooPosts().then((res) => {
        console.log(res.data);
        tattoos.value = res.data;
    });
})
</script>

<template>
    <div class="min-h-screen bg-black p-5 text-white">
        <div class="flex items-center gap-10">
            <RouterLink to="/" class="text-[#00c853] hover:text-[#00e676]">← Volver</RouterLink>
        </div>
        <h1 class="mb-6 text-center font-bold text-tatto">Tatuajes</h1>

        <div class="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            <div v-for="tattoo in tattoos" :key="tattoo._id"
                class="relative cursor-pointer break-inside-avoid overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition group"
                @click="router.push(`/artists/profile/${tattoo._id}`)">
                <img :src="tattoo.images[1].url" alt="Foto del tatuaje"
                    class="w-full h-full object-cover rounded-lg transition group-hover:brightness-75 min-h-[300px]">

                <div class="absolute top-0 left-0 w-full transparent bg-dark p-4 opacity-80">
                    <h2 class="text-xl font-semibold">Tatuador: {{ tattoo.TattooArtist.name }}</h2>
                    <p class="font-bold opacity-60">Tipo: {{ tattoo.TattooArtist.specialty }}</p>
                </div>

                <div class="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-4">
                    <h2 class="text-xl font-semibold">{{ tattoo.nombre }}</h2>
                    <p class="font-bold opacity-60">{{ tattoo.description }}</p>
                    <RouterLink :to="'/artists/profile/' + tattoo.TattooArtist"
                        class="mt-3 inline-block rounded bg-[#00c853] px-4 py-2 text-white transition hover:bg-[#00e676]">
                        Ver artista
                    </RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>
