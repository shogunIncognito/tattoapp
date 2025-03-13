<script setup>
import { onMounted, ref } from 'vue';
import { profileSettingFields, tattoosSpecialities } from '../utils/consts'
import { IoRemoveCircleOutline } from 'vue-icons-plus/io';
import { CgAdd } from 'vue-icons-plus/cg';
import { useRouter } from 'vue-router';
import { checkIfValidsSocialsURL, getApiErrorMessage } from '../utils/functions';
import { fetchUser, setUserPassword, updateProfileInfo, updateProfileName, updateProfileSocial } from '../services/api';
import Spinner from '../components/Spinner.vue';
import { toast } from 'vue3-toastify';
import ProfilePhotoBanner from '../components/profile/ProfilePhotoBanner.vue';
import { CiWarning } from 'vue-icons-plus/ci';

const router = useRouter();

const tattooist = ref(null);
const typeUser = ref(null);
const loading = ref(true);
const loadingUpdate = ref(false);

const password = ref('')

const toggleField = (key) => {
    // con un espacio en blanco se muestra el campo
    showFields.value[key] = " ";
};

const hideField = (key) => {
    showFields.value[key] = "";
};

const showFields = ref({
    instagram: "",
    facebook: "",
    twitter: "",
    tiktok: ""
})

const submitForm = async (e) => {
    loadingUpdate.value = true;
    const formValues = Object.fromEntries(new FormData(e.target));

    const updateOptions = {
        'user': () => updateProfileName({ name: formValues.name, password: formValues.password }),
        'tattooArtist': () => updateProfileInfo(formValues)
    }

    try {
        await updateOptions[typeUser.value]();
        toast.success('Información actualizada');
    }
    catch (error) {
        console.error('Error al actualizar la información:', error);
        toast.error(getApiErrorMessage(error.response.data.message) || 'Error al actualizar la información');
    }
    finally {
        loadingUpdate.value = false;
    };
};

const handleSocials = () => {
    const socials = showFields.value;

    const isValidSocials = checkIfValidsSocialsURL(socials)

    if (!isValidSocials.valid) return toast.error(isValidSocials.message)

    loadingUpdate.value = true;

    updateProfileSocial(socials)
        .then((res) => {
            toast.success('Redes sociales actualizadas');
        })
        .catch((error) => {
            console.error('Error al actualizar redes sociales:', error);
            toast.error(getApiErrorMessage(error.response.data.message) || 'Error al actualizar redes sociales');
        })
        .finally(() => {
            loadingUpdate.value = false;
        });
};

const handleSetPassword = () => {
    loadingUpdate.value = true;
    setUserPassword(tattooist.value._id, password.value)
        .then(() => {
            toast.success('Contraseña añadida');
            tattooist.value.password = true;
        })
        .catch((error) => {
            console.error('Error al añadir contraseña:', error);
            toast.error(getApiErrorMessage(error.response.data.message) || 'Error al añadir contraseña');
        })
        .finally(() => {
            loadingUpdate.value = false;
        });
}

onMounted(() => {
    fetchUser()
        .then((res) => {
            if (res.data.type === 'tattooArtist') {
                showFields.value = res.data.user.socialNetworks || {};
            }

            tattooist.value = res.data.user;
            typeUser.value = res.data.type;
            console.log(res.data.user); // check if password

        })
        .catch((error) => {
            console.error('Error al obtener el usuario:', error);
        })
        .finally(() => {
            loading.value = false;
        });
})

</script>

<template>
    <div class="min-h-screen flex items-center justify-center bg-black text-white p-4">
        <div v-if="loading" class="min-h-screen bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <Spinner />
        </div>
        <div v-else class="w-full max-w-3xl bg-[#1a1a1a] p-6 rounded-lg shadow-lg">
            <h2 class="text-2xl font-bold mb-6 text-center">Perfil</h2>
            <h3 class="text-xl font-semibold mb-4">Editar información</h3>

            <div class="space-y-4">
                <ProfilePhotoBanner :user="tattooist" />
                <div class="flex justify-between w-full gap-5">
                    <form v-if="typeUser === 'tattooArtist'" @submit.prevent="submitForm" class="w-full space-y-4">
                        <div v-for="(value, key) in profileSettingFields.tattooist" :key="key">
                            <label :for="key" class="block text-sm mb-2 font-medium text-white">{{ value }}</label>
                            <div v-if="key !== 'specialty'" class="flex items-center space-x-2">
                                <input :id="key" :name="key" v-model="tattooist[key]"
                                    :type="key === 'email' ? 'email' : 'text'"
                                    :required="['name', 'specialty', 'experience', 'email'].includes(key)"
                                    class="w-full p-2 bg-[#333333] text-white border border-transparent rounded focus:outline-none focus:border-[#00e676]" />
                            </div>
                            <div v-else>
                                <select :id="key" name="specialty" v-model="tattooist[key]"
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
                                <button type="submit" :disabled="loadingUpdate"
                                    class="px-4 py-2 bg-[#00c853] rounded hover:bg-[#1d9259] disabled:bg-[#606060] disabled:cursor-not-allowed">
                                    Actualizar datos
                                </button>
                            </div>
                        </div>
                    </form>

                    <!-- // formulario si no es tatuador, solamente puede cambiar el nombre y añadir contraseña si desea -->
                    <div v-else class="justify-between w-full gap-5">
                        <form @submit.prevent="submitForm" class="w-full space-y-4">
                            <div v-for="(value, key) in profileSettingFields.userData" :key="key">
                                <label :for="key" class="block text-sm mb-2 font-medium text-white">{{ value
                                    }}</label>
                                <div class="flex items-center space-x-2">
                                    <input :id="key" :name="key" v-model="tattooist[key]"
                                        :type="key === 'email' ? 'email' : 'text'"
                                        :required="['name', 'email'].includes(key)"
                                        class="w-full p-2 bg-[#333333] text-white border border-transparent rounded focus:outline-none focus:border-[#00e676]" />
                                </div>
                            </div>

                            <div>
                                <div class="flex gap-2 mt-6">
                                    <button @click="router.back()" type="button"
                                        class="px-4 py-2 bg-[#606060] rounded hover:bg-[#808080]">Volver</button>
                                    <button type="submit" :disabled="loadingUpdate"
                                        class="px-4 py-2 bg-[#00c853] justify-center items-center flex w-48 h-12 rounded hover:bg-[#1d9259] disabled:bg-[#606060] disabled:cursor-not-allowed">
                                        <Spinner v-if="loadingUpdate" class="w-8" />
                                        <span v-else>Actualizar datos</span>
                                    </button>
                                </div>
                            </div>
                        </form>

                        <form v-if="!tattooist.password" @submit.prevent="handleSetPassword"
                            class="w-full space-y-4 mt-6">
                            <hr />
                            <div>
                                <div class="flex items-center gap-2">
                                    <CiWarning class="w-6 h-6 text-orange-400" />
                                    <p class="text-xl font-semibold text-orange-400">Atencion</p>
                                </div>
                                <p>Si añades una contraseña, podrás iniciar sesión con tu email</p>
                            </div>

                            <div>
                                <label for="password"
                                    class="block text-sm mb-2 font-medium text-white">Contraseña</label>
                                <div>
                                    <input id="password" name="password" type="password" v-model="password"
                                        class="w-full p-2 bg-[#333333] text-white border border-transparent rounded focus:outline-none focus:border-[#00e676]" />
                                </div>
                            </div>
                            <div>
                                <div class="flex gap-2 mt-2">
                                    <button type="submit" :disabled="loadingUpdate"
                                        class="px-4 py-2 bg-[#00c853] justify-center items-center flex w-48 h-12 rounded hover:bg-[#1d9259] disabled:bg-[#606060] disabled:cursor-not-allowed">
                                        <Spinner v-if="loadingUpdate" class="w-8" />
                                        <span v-else>Agregar contraseña</span>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>


                    <form v-if="typeUser === 'tattooArtist'" @submit.prevent="handleSocials"
                        class="w-full space-y-4 justify-center">
                        <h3 class="text-neon">Redes sociales</h3>

                        <span>Ej. <span class="text-blue-300">https://www.facebook.com/jhon_doe</span></span>

                        <div v-for="(value, key) in profileSettingFields.userSocial" :key="key">
                            <div v-if="!showFields[key]"
                                class="flex items-center space-x-2 cursor-pointer text-[#00c853]"
                                @click="toggleField(key)">
                                <CgAdd class="w-5 h-5" />
                                <span>Agregar {{ value }}</span>
                            </div>
                            <div v-else>
                                <label :for="key" class="block text-sm font-medium text-white">{{ value }}</label>
                                <div class="relative items-center justify-center flex">
                                    <input :id="key" v-model="showFields[key]" type="text"
                                        class="w-full p-2 bg-[#333333] text-white border border-transparent rounded focus:outline-none focus:border-[#00e676]" />
                                    <IoRemoveCircleOutline class="w-5 h-5 cursor-pointer absolute right-4"
                                        @click="hideField(key)" />
                                </div>
                            </div>
                        </div>

                        <div>
                            <div class="flex justify-around mt-6">
                                <button type="submit" :disabled="loadingUpdate"
                                    class="px-4 py-2 bg-[#00c853] rounded hover:bg-[#1d9259] disabled:bg-[#606060] disabled:cursor-not-allowed">
                                    Actualizar redes
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
