<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import { updateForgotPassword } from '../../services/api';

const route = useRoute();
const router = useRouter();
const password = ref('');
const confirmPassword = ref('');
const tokenToResetPassword = ref(null);

const handleUpdatePassword = () => {
    if (!password.value) {
        toast.error('Debes ingresar una contraseña');
        return;
    }

    if (password.value.length < 7) {
        toast.error('La contraseña debe tener al menos 7 caracteres');
        return;
    }

    if (!confirmPassword.value) {
        toast.error('Debes confirmar tu contraseña');
        return;
    }

    if (password.value !== confirmPassword.value) {
        toast.error('Las contraseñas no coinciden');
        return;
    }

    updateForgotPassword(tokenToResetPassword.value, password.value)
        .then(() => {
            toast.success('Contraseña actualizada correctamente');
            router.push('/login');
        })
        .catch((err) => {
            toast.error('Error al actualizar la contraseña');
        });
};

onMounted(() => {
    tokenToResetPassword.value = route.params.token;
})

</script>
<template>
    <div class="flex justify-center items-center h-[80dvh]">
        <form @submit.prevent="handleUpdatePassword" class="bg-darker rounded p-4 w-full max-w-md">
            <h2 class="text-center text-2xl mb-5 text-neon">Actualiza tu contraseña</h2>
            <p class="text-white mb-1">Ingresa tu nueva contraseña</p>
            <input type="password" placeholder="Ingresa tu nueva contraseña" v-model="password"
                class="w-full p-3 mb-2 border border-[#333] rounded-md bg-[#333] text-white text-lg focus:outline-none focus:border-[#00e676]" />

            <p class="text-white mb-1">Confirma tu contraseña</p>
            <input type="password" placeholder="Repite tu contraseña" v-model="confirmPassword"
                class="w-full p-3 border border-[#333] rounded-md bg-[#333] text-white text-lg focus:outline-none focus:border-[#00e676]" />
            <button
                class="w-full p-3 bg-[#00c853] text-white rounded-md text-lg cursor-pointer transition hover:bg-[#555] hover:shadow-[0px_0px_10px_#33ff5850,0px_0px_40px_#33ff5850,0px_0px_60px_#33ff5850] mt-5">
                Actualizar contraseña
            </button>
        </form>
    </div>
</template>