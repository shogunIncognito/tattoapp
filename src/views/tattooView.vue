<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getTattooPostById, likeTattooPost, unlikeTattooPost } from "../services/api";
import { toast } from "vue3-toastify";
import { Io5ChevronBackOutline, Io5ChevronForwardOutline } from "vue-icons-plus/io5";
import Spinner from "../components/Spinner.vue";
import { AiFillStar, AiOutlineStar } from "vue-icons-plus/ai";
import { useAuthStore } from "../store/useAuthStore";

const route = useRoute();
const router = useRouter();

const tattoo = ref(null);
const loading = ref(true);

const authStore = useAuthStore();

const currentIndex = ref(0);

const nextImage = () => {
    currentIndex.value = (currentIndex.value + 1) % tattoo.value.images.length;
};

const prevImage = () => {
    currentIndex.value = (currentIndex.value - 1 + tattoo.value.images.length) % tattoo.value.images.length;
};

const userHasLiked = (tattoo) => {
    if (!authStore.user) return false;
    return tattoo.likes.includes(authStore.user.user._id);
};

const handleLike = (tattoToHandle) => {
    if (!authStore.user) {
        toast.error("Debes iniciar sesión para dar like");
        return;
    }

    if (userHasLiked(tattoToHandle)) {
        unlikeTattooPost(tattoToHandle._id)
        tattoo.value = {
            ...tattoo.value,
            countLikes: tattoo.value.countLikes - 1,
            likes: tattoo.value.likes.filter((like) => like !== authStore.user.user._id)
        }
    } else {
        likeTattooPost(tattoToHandle._id)
        tattoo.value = {
            ...tattoo.value,
            countLikes: tattoo.value.countLikes + 1,
            likes: [...tattoo.value.likes, authStore.user.user._id]
        }
    }
};


onMounted(() => {
    getTattooPostById(route.params.id)
        .then((res) => {
            tattoo.value = res.data;
        })
        .catch((error) => {
            console.error("Error al obtener el tatuaje:", error);
            toast.error("Error al obtener el tatuaje");
        })
        .finally(() => {
            loading.value = false;
        });
})
</script>

<template>
    <div v-if="loading" class="min-h-screen bg-black bg-opacity-50 z-50 flex items-center justify-center">
        <Spinner />
    </div>
    <div v-else-if="!tattoo" class="min-h-screen bg-black text-white flex items-center justify-center p-6">
        <div class="flex flex-col items-center">
            <h1 class="text-3xl font-bold">Tatuaje no encontrado</h1>
            <button @click="router.back()"
                class="mt-4 bg-[#00c853] text-white px-4 py-2 rounded transition hover:bg-[#00e676]">
                Volver
            </button>
        </div>
    </div>
    <div v-else class="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
        <!-- Contenedor principal -->
        <div class="w-full max-w-4xl bg-darker p-6 rounded-lg shadow-lg">
            <!-- Carrusel de imágenes -->
            <div class="relative w-full overflow-hidden rounded-lg">
                <img :src="tattoo.images[currentIndex].url" alt="Tatuaje"
                    class="w-full object-cover rounded-lg transition duration-300">

                <!-- Botones de navegación del carrusel -->
                <button @click="prevImage"
                    class="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full">
                    <Io5ChevronBackOutline />
                </button>
                <button @click="nextImage"
                    class="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full">
                    <Io5ChevronForwardOutline />
                </button>
            </div>

            <!-- Información del tatuaje -->
            <div class="mt-4">
                <p class="mt-2 text-gray-300">{{ tattoo.description }}</p>

                <!-- Likes -->
                <div class="mt-3 flex items-center space-x-2 w-fit cursor-pointer" @click="handleLike(tattoo)">
                    <AiFillStar v-if="userHasLiked(tattoo)" class="text-yellow-400" />
                    <AiOutlineStar v-else class="text-yellow-400" />
                    <span class="text-lg font-bold">{{ tattoo.countLikes }}</span>
                </div>
            </div>

            <!-- Información del tatuador -->
            <div class="mt-6 p-4 bg-[#333333] rounded-lg">
                <h2 class="text-lg font-semibold">Tatuador: {{ tattoo.TattooArtist.name }}</h2>
                <p class="text-gray-400">Especialidad: {{ tattoo.TattooArtist.specialty }}</p>
                <RouterLink :to="'/artists/profile/' + tattoo.TattooArtist._id"
                    class="mt-3 inline-block bg-[#00c853] text-white px-4 py-2 rounded transition hover:bg-[#555555]">
                    Ver perfil
                </RouterLink>
            </div>

            <!-- Botones de acción -->
            <div class="mt-6 flex justify-between">
                <button @click="router.back()"
                    class="bg-[#606060] text-white px-4 py-2 rounded transition hover:bg-[#808080]">
                    Volver
                </button>
            </div>
        </div>
    </div>
</template>
