<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import { toast } from 'vue3-toastify';
import { sendForgotPasswordEmail } from '../../services/api';

const email = ref('');
const emailSended = ref(false);

const handleForgotPassword = () => {
    if (!email.value) {
        toast.error('Debes ingresar un correo electrónico');
        return;
    }

    // check if email is valid using regex
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        toast.error('Debes ingresar un correo electrónico válido');
        return;
    }

    sendForgotPasswordEmail(email.value)
        .then(() => {
            toast.success('Correo enviado correctamente');
            emailSended.value = true;
        })
        .catch(() => {
            toast.error('Correo no valido');
        });

};
</script>
<template>
    <div class="flex justify-center items-center h-[80dvh]">
        <form v-if="!emailSended" @submit.prevent="handleForgotPassword" class="bg-darker rounded p-4 w-full max-w-md">
            <h2 class="text-center text-2xl mb-5 text-neon">Recuperar contraseña</h2>
            <p class="text-white text-center mb-5">Ingresa tu correo electrónico para recuperar tu contraseña</p>
            <input type="text" placeholder="Ingresa tu correo" v-model="email"
                class="w-full p-3 border border-[#333] rounded-md bg-[#333] text-white text-lg focus:outline-none focus:border-[#00e676]" />
            <button
                class="w-full p-3 bg-[#00c853] text-white rounded-md text-lg cursor-pointer transition hover:bg-[#555] hover:shadow-[0px_0px_10px_#33ff5850,0px_0px_40px_#33ff5850,0px_0px_60px_#33ff5850] mt-5">
                Enviar
            </button>
        </form>
        <div v-else class="bg-darker rounded p-4 w-full max-w-md">
            <h2 class="text-center text-2xl mb-5 text-neon">¡Listo!</h2>
            <p class="text-white text-center">Hemos enviado un correo a <span class="text-neon">{{ email
            }}</span> con las instrucciones para recuperar tu contraseña</p>
            <RouterLink to="/login" class="text-center block text-neon mt-5">Volver al inicio de sesión</RouterLink>
        </div>
    </div>
</template>