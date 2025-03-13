<script setup>
import { ref } from 'vue';
import { AiFillEye, AiFillEyeInvisible } from 'vue-icons-plus/ai';
import { RouterLink, useRouter } from 'vue-router';
import { login } from '../../services/api';
import { toast } from 'vue3-toastify';
import { getApiErrorMessage } from '../../utils/functions';
import { useAuthStore } from '../../store/useAuthStore';
import GoogleLoginButton from '../../components/auth/GoogleLoginButton.vue';

const router = useRouter();
const { setSession } = useAuthStore();

const user = ref({
    email: '',
    password: '',
});

const showPassword = ref(false);

const handleLogin = () => {
    login(user.value)
        .then(async (res) => {
            toast.success('Inicio de sesión exitoso');

            await setSession(res.data.token);

            router.push('/');
        })
        .catch((error) => {
            console.error('Error al iniciar el usuario:', error);
            toast.error(getApiErrorMessage(error.response.data.message) || 'Error al iniciar sesión', {
                autoClose: 5000,
            });
        });
};

const volver = () => {
    router.push('/');
};
</script>

<template>
    <div class="bg-black min-h-screen flex-col flex justify-center items-center p-5">
        <h1 class="text-tatto text-white mb-5 text-[3.2rem]">Tattoo <span class="text-neon">Ink</span></h1>
        <div class="bg-[#1a1a1a] p-10 rounded-lg w-full max-w-md ring-neon">
            <h2 class="text-white text-center mb-8 text-2xl">
                Iniciar
                <span class="text-neon">sesión</span>
            </h2>

            <form @submit.prevent="handleLogin">
                <div class="mb-5">
                    <label for="email" class="block text-white mb-2 text-lg">Correo Electrónico</label>
                    <input type="email" id="email" v-model="user.email" required placeholder="Ingresa tu correo"
                        class="w-full p-3 border border-[#333] rounded-md bg-[#333] text-white text-lg focus:outline-none focus:border-[#00e676]" />
                </div>

                <div class="mb-5">
                    <label for="password" class="block text-white mb-2 text-lg">Contraseña</label>
                    <div class="relative flex items-center">
                        <input :type="showPassword ? 'text' : 'password'" id="password" v-model="user.password" required
                            placeholder="Ingresa tu contraseña"
                            class="w-full p-3 pr-12 border border-[#333] rounded-md bg-[#333] text-white text-lg focus:outline-none focus:border-[#00e676]" />
                        <span class="absolute right-3 cursor-pointer" @click="showPassword = !showPassword">
                            <AiFillEye v-if="showPassword" class="text-white" />
                            <AiFillEyeInvisible v-else class="text-white" />
                        </span>
                    </div>
                    <div class="text-neon w-full my-2 ml-2">
                        <RouterLink to="/forgot-password" class="text-neon hover:text-[#00e676]">
                            ¿Olvidaste tu contraseña?
                        </RouterLink>
                    </div>
                </div>

                <div class="text-white text-center mb-5">
                    <p>¿No tienes cuenta? Registrate como</p>
                    <RouterLink to="/register-tatto" class="text-[#00c853] hover:text-[#00e676]">
                        Tatuador
                    </RouterLink>
                    <span>o</span>
                    <RouterLink to="/register-user" class="text-[#00c853] hover:text-[#00e676]">
                        Usuario
                    </RouterLink>
                </div>

                <button type="submit"
                    class="w-full p-3 bg-[#00c853] text-white rounded-md text-lg cursor-pointer transition hover:bg-[#555] hover:shadow-[0px_0px_10px_#33ff5850,0px_0px_40px_#33ff5850,0px_0px_60px_#33ff5850] mb-4">
                    Iniciar sesión
                </button>
            </form>
            <GoogleLoginButton />
        </div>
    </div>
</template>
