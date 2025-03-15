<script setup>
import { TbPencilDiscount } from 'vue-icons-plus/tb';
import { updateProfileBanner, updateProfilePhoto } from '../../services/api';
import { toast } from 'vue3-toastify';

const { user } = defineProps(['user']);
const emit = defineEmits(['update-image']);

const handleImageToUpload = async (file, type) => {
    if (!file) return;

    try {
        const formData = new FormData();
        formData.append(type, file);

        const optionsUpdate = {
            'profilePhoto': () => updateProfilePhoto(formData),
            'backgroundPhoto': () => updateProfileBanner(formData),
        };

        const { data } = await optionsUpdate[type]();

        const newImage = type === 'profilePhoto' ? data.photoPerfil.url : data.photoBackground.url;

        emit('update-image', { type, url: newImage });

        toast.success('Imagen actualizada correctamente');
    } catch (error) {
        console.error('Error al actualizar la imagen:', error);
    }
};

const handleFileChange = (event, type) => {
    const file = event.target.files[0];
    if (file) {
        handleImageToUpload(file, type);
    }
};

</script>

<template>
    <div class="relative h-[17rem]">
        <div class="relative group">
            <img :src="user.photoBackground?.url || 'https://www.cristianroldan.art/wp-content/uploads/2020/10/escaparate-pintado-a-mano-estudio-de-tatuaje.jpg'"
                alt="banner del tatuador" class="w-full h-52 object-cover rounded" />
            <label
                class="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <TbPencilDiscount class="w-8 h-8 text-white" />
                <input type="file" accept="image/*" class="hidden"
                    @change="(e) => handleFileChange(e, 'backgroundPhoto')" />
            </label>
        </div>
        <div class="absolute bottom-1 left-4">
            <div class="relative group">
                <img :src="user.photoPerfil?.url || user.profileImageGoogle || 'https://th.bing.com/th?id=OIF.xfLzb0EOnt2D%2bhjO2WcEpw&rs=1&pid=ImgDetMain'"
                    alt="Foto del tatuador" class="w-40 h-40 object-cover rounded-full border-4 border-white" />
                <label
                    class="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-full">
                    <TbPencilDiscount class="w-8 h-8 text-white" />
                    <input type="file" accept="image/*" class="hidden"
                        @change="(e) => handleFileChange(e, 'profilePhoto')" />
                </label>
            </div>
        </div>
    </div>
</template>
