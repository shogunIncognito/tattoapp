<script setup>
import { AiFillStar } from 'vue-icons-plus/ai';

const { reviews } = defineProps(['reviews']);
</script>
<template>
    <div class="p-4">
        <h2 class="text-xl font-semibold mb-2">Reseñas</h2>
        <div v-if="reviews.Qualifications?.length > 0" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div v-for="review in reviews.Qualifications" class="bg-dark rounded-lg shadow-lg p-4 ring-neon">
                <div class="flex items-center gap-4">
                    <img :src="review.user.photoPerfil?.url || 'https://static.vecteezy.com/system/resources/previews/036/594/092/original/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg'"
                        alt="Foto del usuario" class="w-12 h-12 object-cover rounded-full" />
                    <div>
                        <h3 class="text-lg font-semibold">{{ review.user.name }}</h3>
                        <div class="flex items
                                    -center gap-1">
                            <AiFillStar v-for="i in 5" :key="i" class="text-2xl"
                                :color="i <= review.qualification ? '#FFD700' : '#C0C0C0'" />
                        </div>
                    </div>
                </div>
                <p class="text-gray-300 mt-4">{{ review.comment }}</p>
            </div>
        </div>
        <div v-else class="text-center">No hay reseñas de este tatuador aún</div>
    </div>
</template>
