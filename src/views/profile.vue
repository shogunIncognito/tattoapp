<script setup>
import { onMounted, ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { fetchUser, getTattooistReviews } from "../services/api";
import Spinner from "../components/Spinner.vue";
import { BiSolidPencil } from "vue-icons-plus/bi";
import { FaFacebook, FaInstagram, FaTiktok } from "vue-icons-plus/fa";
import { Fa6XTwitter } from "vue-icons-plus/fa6";
import { deleteEmptyValues } from "../utils/functions";
import TattosPortfolio from "../components/commonProfile/TattosPortfolio.vue";
import { AiFillStar } from "vue-icons-plus/ai";
import { Io5ArrowBackOutline } from "vue-icons-plus/io5";
import Reviews from "../components/commonProfile/Reviews.vue";

const router = useRouter();

const tatooist = ref(null);
const loading = ref(true);
const reviews = ref([]);
const loadingReviews = ref(true);

onMounted(() => {
    fetchUser()
        .then((res) => {
            tatooist.value = res.data.user;
            getTattooistReviews(res.data.user._id)
                .then((res) => {
                    reviews.value = res.data;
                })
                .catch((error) => {
                    console.error("Error al obtener las reseñas:", error);
                })
                .finally(() => {
                    loadingReviews.value = false;
                });
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
    <div v-if="loading" class="w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center min-h-screen">
        <Spinner />
    </div>
    <div v-else class="min-h-screen bg-black p-5 text-white">
        <div class="flex items-center gap-10 mb-10">
            <button @click="router.back()" class="text-[#00c853] hover:text-[#00e676] flex items-center gap-2">
                <Io5ArrowBackOutline />
                Volver
            </button>
            <h1 class="text-3xl font-bold">Tu perfil</h1>
        </div>
        <div class="max-w-4xl mx-auto bg-[#1a1a1a] rounded-lg shadow-lg ring-neon">
            <div class="relative h-[17rem]">
                <img :src="tatooist.photoBackground?.url || 'https://www.cristianroldan.art/wp-content/uploads/2020/10/escaparate-pintado-a-mano-estudio-de-tatuaje.jpg'"
                    alt="banner del tatuador" class="w-full h-52 object-cover rounded border-b-4 border-white" />
                <img :src="tatooist.photoPerfil?.url || 'https://th.bing.com/th?id=OIF.xfLzb0EOnt2D%2bhjO2WcEpw&rs=1&pid=ImgDetMain'"
                    alt="Foto del tatuador"
                    class="w-40 bottom-1 left-4 absolute rounded-full h-40 object-cover border-4 border-white" />
            </div>
            <div class="p-5">
                <div class="flex justify-between gap-10">
                    <div class="flex items-center gap-4 mb-4">
                        <h1 class="text-3xl font-bold">{{ tatooist.name }}</h1>
                        <div v-if="reviews.averageQualification" class="flex gap-1.5">
                            <AiFillStar class="text-[#FFD700]" />
                            <span class="text-gray-300 font-bold">{{ reviews.averageQualification || 0 }}</span>
                        </div>
                    </div>
                    <RouterLink to="/profile/settings">
                        <BiSolidPencil class="text-[#00c853] text-4xl" />
                    </RouterLink>
                </div>

                <p v-if="tatooist.specialty && tatooist.specialty !== ''" class="text-gray-300 mb-2">
                    <strong>Especialidad:</strong> {{ tatooist.specialty }}
                </p>
                <p v-if="tatooist.experience && tatooist.experience !== ''" class="text-gray-300 mb-2">
                    <strong>Años de experiencia:</strong> {{ tatooist.experience }}
                </p>
                <p v-if="tatooist.address && tatooist.address !== ''" class="text-gray-300 mb-2">
                    <strong>Dirección:</strong> {{ tatooist.address }}
                </p>
                <p v-if="tatooist.schedule && tatooist.schedule !== ''" class="text-gray-300 mb-2">
                    <strong>Horario:</strong> {{ tatooist.schedule }}
                </p>
                <p v-if="tatooist.email && tatooist.email !== ''" class="text-gray-300 mb-4">
                    <strong>Correo:</strong> {{ tatooist.email }}
                </p>
                <p v-if="tatooist.description && tatooist.description !== ''" class="text-gray-300 mb-4">
                    <strong></strong> {{ tatooist.description }}
                </p>

                <div class="mb-4" v-if="Object.keys(deleteEmptyValues(tatooist.socialNetworks)).length > 0">
                    <h2 class="text-xl font-semibold mb-2 text-neon">Redes Sociales</h2>
                    <div class="flex gap-4">
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

                <TattosPortfolio :tattooistId="tatooist._id" />

                <!-- // reviews de los clientes -->
                <Reviews :reviews="reviews" />
            </div>
        </div>
    </div>
</template>
