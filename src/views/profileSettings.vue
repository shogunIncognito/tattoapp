<script setup>
import { ref } from 'vue';
import { profileSettingFields, tattoosSpecialities } from '../utils/consts'
import { IoRemoveCircleOutline } from 'vue-icons-plus/io';
import { CgAdd } from 'vue-icons-plus/cg';
import { useRouter } from 'vue-router';
import { deleteEmptyValues } from '../utils/functions';
import { updateProfileSocial } from '../services/api';

const router = useRouter();

const form = ref({
    name: 'Juan Pérez',
    specialty: 'Gotico',
    experience: '5 años',
    email: 'juanperez@example.com',
    socialNetworks: {
        instagram: 'https://www.instagram.com/jhon_doe',
        facebook: 'https://www.facebook.com/jhon_doe',
        twitter: 'https://www.twitter.com/jhon_doe',
        tiktok: ''
    },
    address: 'Ciudad de México',
    description: 'Apasionado por la tecnología y el desarrollo web.'
});

const toggleField = (key) => {
    // con un espacio en blanco se muestra el campo
    showFields.value[key] = " ";
};

const hideField = (key) => {
    showFields.value[key] = "";
};

const showFields = ref(form.value.socialNetworks || {
    instagram: "",
    facebook: "",
    twitter: "",
    tiktok: ""
})

const submitForm = () => {
    console.log('Perfil actualizado:', form.value);
};

const handleSocials = () => {
    const socials = deleteEmptyValues(form.value.socialNetworks);
    const token = localStorage.getItem('token');

    updateProfileSocial(token, socials)
        .then((res) => {
            console.log('Redes sociales actualizadas:', res.data);
        })
        .catch((error) => {
            console.error('Error al actualizar redes sociales:', error);
        });
};

</script>

<template>
    <div class="min-h-screen flex items-center justify-center bg-black text-white p-4">
        <div class="w-full max-w-3xl bg-[#1a1a1a] p-6 rounded-lg shadow-lg">
            <h2 class="text-2xl font-bold mb-6 text-center">Perfil</h2>
            <h3 class="text-xl font-semibold mb-4">Editar información</h3>

            <form @submit.prevent="submitForm" class="space-y-4">
                <div class="flex justify-between w-full gap-5">
                    <div class="w-full space-y-4">
                        <div v-for="(value, key) in profileSettingFields.userData" :key="key">
                            <label :for="key" class="block text-sm mb-2 font-medium text-white">{{ value }}</label>
                            <div v-if="key !== 'specialty'" class="flex items-center space-x-2">
                                <input :id="key" v-model="form[key]" :type="key === 'email' ? 'email' : 'text'"
                                    :required="['name', 'specialty', 'experience', 'email'].includes(key)"
                                    class="w-full p-2 bg-[#333333] text-white border border-transparent rounded focus:outline-none focus:border-[#00e676]" />
                            </div>
                            <div v-else>
                                <select :id="key" v-model="form[key]"
                                    class="w-full p-2 bg-[#333333] text-white border border-transparent rounded focus:outline-none focus:border-[#00e676]">
                                    <option v-for="specialty in tattoosSpecialities" :key="specialty"
                                        :value="specialty">
                                        {{ specialty }}
                                    </option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <div class="flex gap-2 mt-6">
                                <button @click="router.back()" type="button"
                                    class="px-4 py-2 bg-[#606060] rounded hover:bg-[#808080]">Volver</button>
                                <button type="submit"
                                    class="px-4 py-2 bg-[#00c853] rounded hover:bg-[#555555]">Actualizar datos</button>
                            </div>
                        </div>
                    </div>

                    <div class="w-full space-y-4 justify-center">
                        <h3 class="text-neon">Redes sociales</h3>

                        <span>Ej. <span class="text-blue-300">https://www.facebook.com/jhon_doe</span></span>

                        <div v-for="(value, key) in profileSettingFields.userSocial" :key="key">
                            <div v-if="!showFields[key]"
                                class="flex items center space-x-2 cursor-pointer text-[#00c853]"
                                @click="toggleField(key)">
                                <CgAdd class="w-5 h-5" />
                                <span>Agregar {{ value }}</span>
                            </div>
                            <div v-else>
                                <label :for="key" class="block text-sm font-medium text-white">{{ value }}</label>
                                <div class="relative items-center justify-center flex">
                                    <input :id="key" v-model="form.socialNetworks[key]" type="text"
                                        class="w-full p-2 bg-[#333333] text-white border border-transparent rounded focus:outline-none focus:border-[#00e676]" />
                                    <IoRemoveCircleOutline class="w-5 h-5 cursor-pointer absolute right-4"
                                        @click="hideField(key)" />
                                </div>
                            </div>
                        </div>

                        <div>
                            <div class="flex justify-around mt-6">
                                <button type="button" @click="handleSocials"
                                    class="px-4 py-2 bg-[#00c853] rounded hover:bg-[#555555]">Actualizar redes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
