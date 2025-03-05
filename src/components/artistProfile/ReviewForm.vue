<script setup>
import { AiFillStar } from 'vue-icons-plus/ai';
import { useAuthStore } from '../../store/useAuthStore';
import { toast } from 'vue3-toastify';
import { apiResponses } from '../../utils/apiResponses';
import { createTattooistReview, updateTattooistReview } from '../../services/api';
import { onMounted, ref } from 'vue';

const { reviews, tattooistId } = defineProps(['reviews', 'tattooistId']);

const authStore = useAuthStore();

const newReview = ref({
    qualification: 0,
    comment: "",
});

const userReview = ref(null)

const setRating = (value) => {
    newReview.value.qualification = value;
};

const addReview = () => {
    if (newReview.value.qualification === 0) {
        toast.error("Debes seleccionar una calificación");
        return;
    }

    createTattooistReview(tattooistId, newReview.value)
        .then((res) => {
            toast.success("Reseña creada");
            const newReview = {
                ...res.data,
                user: authStore.user.user,
            };
            reviews.Qualifications.push(newReview);
        })
        .catch((error) => {
            console.error("Error al crear la reseña:", error);
            toast.error(apiResponses[error.response.data.message] || "Error al crear la reseña");
        });
};

const updateReview = () => {
    if (newReview.value.qualification === 0) {
        toast.error("Debes seleccionar una calificación");
        return;
    }

    updateTattooistReview(userReview.value._id, newReview.value)
        .then((res) => {
            toast.success("Reseña actualizada");
            reviews.Qualifications = reviews.Qualifications.map((review) => {
                if (review._id === userReview.value._id) {
                    return res.data;
                }
                return review;
            });
        })
        .catch((error) => {
            console.error("Error al actualizar la reseña:", error);
            toast.error(apiResponses[error.response.data.message] || "Error al actualizar la reseña");
        });
}

onMounted(() => {
    const existUserReview = reviews.Qualifications.find((review) => review.user._id === authStore.user?.user._id);

    if (existUserReview) {
        userReview.value = existUserReview;
        newReview.value = {
            qualification: existUserReview.qualification,
            comment: existUserReview.comment,
        };
    }
})
</script>

<template>
    <div v-if="authStore.user && authStore.user.type === 'user'" class="mt-6 p-4 bg-[#1a1a1a] rounded-lg shadow-lg">
        <h3 v-if="userReview" class="text-lg font-semibold mb-2">Actualiza tu reseña</h3>
        <h3 v-else class="text-lg font-semibold mb-2">Deja tu reseña</h3>

        <!-- Estrellas de calificación -->
        <div class="mb-3 flex">
            <AiFillStar v-for="i in 5" :key="i" class="text-2xl cursor-pointer" @click="setRating(i)"
                :color="i <= newReview.qualification ? '#FFD700' : '#C0C0C0'" />
        </div>

        <!-- Comentario -->
        <div class="flex gap-3">
            <img :src="authStore.user.user?.photoPerfil?.url || 'https://static.vecteezy.com/system/resources/previews/036/594/092/original/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg'"
                alt="Foto del usuario" class="w-12 h-12 object-cover rounded-full mt-2" />
            <textarea v-model="newReview.comment" rows="3" placeholder="Escribe tu experiencia..."
                class="w-full p-2 bg-[#333333] border-2 border-transparent focus:border-[#00e676] text-white rounded-lg outline-none mb-3"></textarea>
        </div>


        <!-- Botón para enviar -->
        <button v-if="userReview" @click="updateReview"
            class="bg-[#00c853] text-white px-4 py-2 rounded transition hover:bg-[#555555]">
            Actualizar Reseña
        </button>
        <button v-else @click="addReview"
            class="bg-[#00c853] text-white px-4 py-2 rounded transition hover:bg-[#555555]">
            Enviar Reseña
        </button>
    </div>
</template>