<script setup>
import { onMounted, ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { fetchUser } from "../services/api";
import Spinner from "../components/Spinner.vue";
import { BiSolidPencil } from "vue-icons-plus/bi";
import { FaFacebook, FaInstagram, FaTiktok, FaTwitter } from "vue-icons-plus/fa";
import { Fa6XTwitter } from "vue-icons-plus/fa6";

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
            <h1 class="text-3xl font-bold">Tu perfil</h1>
        </div>
        <div class="max-w-4xl mx-auto bg-[#1a1a1a] rounded-lg shadow-lg">
            <div class="relative h-[17rem]">
                <img :src="tatooist.image || 'https://www.cristianroldan.art/wp-content/uploads/2020/10/escaparate-pintado-a-mano-estudio-de-tatuaje.jpg'"
                    alt="banner del tatuador" class="w-full h-52 object-cover rounded" />
                <img :src="tatooist.image || 'https://th.bing.com/th?id=OIF.xfLzb0EOnt2D%2bhjO2WcEpw&rs=1&pid=ImgDetMain'"
                    alt="Foto del tatuador" class="w-40 bottom-1 left-4 absolute rounded-full h-40 object-cover" />
            </div>
            <div class="p-5">
                <div class="flex justify-between gap-10">
                    <div>
                        <h1 class="text-3xl font-bold mb-4">{{ tatooist.name }}</h1>
                    </div>
                    <RouterLink to="/profile/settings">
                        <BiSolidPencil class="text-[#00c853] text-4xl" />
                    </RouterLink>
                </div>
                <p class="text-gray-300 mb-2"><strong>Especialidad:</strong> {{ tatooist.specialty }}</p>
                <p class="text-gray-300 mb-2"><strong>Años de experiencia:</strong> {{ tatooist.experience }}</p>
                <p class="text-gray-300 mb-2"><strong>Dirección:</strong> {{ tatooist.direccion }}</p>
                <p class="text-gray-300 mb-4"><strong>Horario:</strong> {{ tatooist.description }}</p>
                <p class="text-gray-300 mb-4"><strong>Correo:</strong> {{ tatooist.email }}</p>

                <div class="mb-4">
                    <h2 class="text-xl font-semibold mb-2 text-neon">Redes Sociales</h2>
                    <div v-if="tatooist.socialNetworks" class="flex gap-4">
                        <a v-if="tatooist.socialNetworks.facebook" :href="tatooist.socialNetworks.facebook"
                            target="_blank">
                            <FaFacebook class="hover:text-[#1877f2] text-2xl transition-colors" />
                        </a>
                        <a v-if="tatooist.socialNetworks.instagram" :href="tatooist.socialNetworks.instagram"
                            target="_blank">
                            <FaInstagram class="hover:text-[#e1306c] text-2xl transition-colors" />
                        </a>
                        <a v-if="tatooist.socialNetworks.twitter" :href="tatooist.socialNetworks.twitter"
                            target="_blank">
                            <Fa6XTwitter class="hover:text-[#1da1f2] text-2xl transition-colors" />
                        </a>
                        <a v-if="tatooist.socialNetworks.tiktok" :href="tatooist.socialNetworks.tiktok" target="_blank">
                            <FaTiktok class="hover:text-gray-400 text-2xl transition-colors" />
                        </a>
                    </div>
                </div>

                <div class="p-4">
                    <h2 class="text-xl font-semibold mb-2">Portafolio</h2>
                    <div v-if="tatooist.portfolio?.length > 0"
                        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        <img v-for="(imagen, index) in tatooist.portafolio" :key="index" :src="imagen"
                            alt="Tatuaje realizado" class="rounded-lg shadow-lg w-full h-40 object-cover" />
                    </div>
                    <div v-else class="flex flex-col justify-center items-center">
                        <p class="text-center mt-10 mb-5">No hay tatuajes en el portafolio</p>
                        <button class="bg-[#00c853] hover:bg-[#00e676] text-white py-2 px-4 rounded-lg">Agregar un
                            tatuaje</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
