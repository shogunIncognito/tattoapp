<script setup>
import { onMounted, ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { getTattooArtists } from "../services/api";
import Spinner from "../components/Spinner.vue";
import { toast } from "vue3-toastify";
import { Io5ArrowBackOutline } from "vue-icons-plus/io5";
import { placeholderUserImage } from "../utils/consts";

const router = useRouter();

const tattooists = ref([]);
const loading = ref(true);

onMounted(() => {
  getTattooArtists()
    .then((response) => {
      tattooists.value = response.data;
    })
    .catch((error) => {
      console.error("Error al obtener los tatuadores:", error);
      toast.error("Error al obtener los tatuadores");
    })
    .finally(() => {
      loading.value = false;
    })
})
</script>

<template>
  <div class="min-h-screen bg-black p-5 text-white">
    <div class="flex items-center gap-10">
      <RouterLink to="/" class="text-[#00c853] hover:text-[#00e676] flex items-center gap-2">
        <Io5ArrowBackOutline />
        Volver
      </RouterLink>
    </div>
    <h1 class="mb-6 text-center font-bold text-tatto">Tatuadores</h1>

    <div v-if="loading" class="justify-center items-center flex w-full h-[27rem]">
      <Spinner />
    </div>
    <div v-else class="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
      <div v-for="tattooist in tattooists" :key="tattooist._id"
        class="relative cursor-pointer break-inside-avoid overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition group"
        @click="router.push(`/artists/profile/${tattooist._id}`)">
        <img :src="tattooist.photoPerfil?.url || placeholderUserImage" alt="Foto del tatuador"
          class="w-full h-full object-cover rounded-lg transition group-hover:brightness-75" />

        <div class="right-0 top-0 absolute bg-dark p-2 text-white rounded-tl-lg rounded-br-lg">
          {{ tattooist.specialty }}
        </div>

        <div class="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-4">
          <h2 class="text-xl font-semibold">{{ tattooist.name }}</h2>
          <!-- <p class="font-bold opacity-60">{{ tattooist.instagram }}</p> -->
          <p class="text-gray-400">{{ tattooist.experience }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
