<script setup>
import { onMounted, ref } from 'vue';
import { deleteTattooPost, getTattooistPosts } from '../../services/api';
import { toast } from 'vue3-toastify';
import { AiFillStar } from 'vue-icons-plus/ai';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import Spinner from '../Spinner.vue';
import { useAuthStore } from '../../store/useAuthStore';
import { CgAdd, CgTrash } from 'vue-icons-plus/cg';

const { tattooistId } = defineProps(['tattooistId'])

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const tattoos = ref([]);
const loading = ref(true);

const deleteTattoo = (tattooId) => {
    deleteTattooPost(tattooId)
        .then(() => {
            toast.success("Tatuaje eliminado correctamente");
            tattoos.value = tattoos.value.filter(tattoo => tattoo._id !== tattooId);
        })
        .catch((error) => {
            console.error("Error al eliminar el tatuaje:", error);
            toast.error("Error al eliminar el tatuaje");
        })
}

onMounted(() => {
    getTattooistPosts(tattooistId)
        .then((res) => {
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
    <div class="p-4">
        <h2 class="text-xl font-semibold mb-2">Portafolio</h2>

        <div v-if="loading" class="justify-center items-center flex w-full h-[14rem]">
            <Spinner />
        </div>
        <div v-else-if="tattoos.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div v-for="tattoo in tattoos" :key="tattoo._id" @click="router.push(`/artists/tattoos/${tattoo._id}`)"
                class="relative cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition group">
                <!-- // boton de eliminar tatuaje -->
                <div v-if="authStore.user?.type === 'tattooArtist' && route.path.startsWith('/profile')"
                    @click.stop="deleteTattoo(tattoo._id)"
                    class="absolute top-3 left-3 flex items-center h-10 w-10 rounded-full justify-center bg-red-500/70 text-white text-sm cursor-pointer">
                    <CgTrash size="21" class="text-white" />
                </div>
                <div
                    class="absolute top-3 right-3 flex items-center bg-black/70 px-3 py-1 rounded-full text-white text-sm">
                    <AiFillStar class="text-yellow-400 mr-1.5" size="18" />
                    <span class="font-bold">{{ tattoo.countLikes || 0 }}</span>
                </div>
                <img :src="tattoo.images[0].url" alt="Tatuaje realizado"
                    class="rounded-lg shadow-lg w-full object-cover" />
            </div>
            <!-- // añadir una card que sea para agregar un nuevo tatuaje -->
            <div v-if="authStore.user?.type === 'tattooArtist' && route.path.startsWith('/profile')"
                @click="router.push('/tattoos/create')"
                class="flex items-center justify-center min-h-[12rem] bg-[#00c853] hover:bg-[#00e677cc] text-white py-2 px-4 rounded-lg cursor-pointer">
                <CgAdd size="28" class="text-white" />
                <p class="ml-2">Agregar un tatuaje</p>
            </div>
        </div>
        <div v-else class="flex flex-col justify-center items-center">
            <p class="text-center mt-10 mb-5">No hay tatuajes en el portafolio</p>
            <button v-if="authStore.user.type === 'tattooArtist' && route.path.startsWith('/profile')"
                @click="router.push('/tattoos/create')"
                class="bg-[#00c853] hover:bg-[#00e676] text-white py-2 px-4 rounded-lg">Agregar un
                tatuaje
            </button>
        </div>
    </div>

</template>