<script setup>
import { ref } from 'vue';
import { AiFillEye, AiFillEyeInvisible } from 'vue-icons-plus/ai';
import { RouterLink, useRouter } from 'vue-router';
import { registerUser } from '../../services/api';
import { toast } from 'vue3-toastify';
import { getApiErrorMessage } from '../../utils/functions';

const router = useRouter();

const user = ref({
  name: '',
  email: '',
  password: '',
});

const showPassword = ref(false);
const verificationEmail = ref(false);

const handleRegisterUser = () => {
  registerUser(user.value)
    .then(() => {
      toast.success('Revisa tu correo para confirmar tu registro', {
        autoClose: 5000,
      });
      verificationEmail.value = true;
    })
    .catch((error) => {
      console.error('Error al registrar el usuario:', error);
      toast.error(getApiErrorMessage(error.response.data.message) || 'Error al registrar el usuario');
    });
};

const volver = () => {
  router.push('/');
};
</script>

<template>
  <div class="bg-black min-h-screen flex justify-center items-center p-5">
    <div v-if="!verificationEmail" class="bg-[#1a1a1a] ring-neon p-10 rounded-lg w-full max-w-md">
      <h2 class="text-white text-center mb-8 text-2xl">Registro de <span class="text-neon">Usuario</span></h2>

      <form @submit.prevent="handleRegisterUser">
        <div class="mb-5">
          <label for="name" class="block text-white mb-2 text-lg">Nombre</label>
          <input type="text" id="name" v-model="user.name" required placeholder="Ingresa tu nombre"
            class="w-full p-3 border border-[#333] rounded-md bg-[#333] text-white text-lg focus:outline-none focus:border-[#00e676]" />
        </div>

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
        </div>

        <div class="text-white text-center mb-5">
          <p>¿Ya tienes una cuenta?</p>
          <RouterLink to="/login" class="text-[#00c853] hover:text-[#00e676]">
            Inicia sesión
          </RouterLink>
        </div>

        <button type="submit"
          class="w-full p-3 bg-[#00c853] text-white rounded-md text-lg cursor-pointer transition hover:bg-[#555] hover:shadow-[0px_0px_10px_#33ff5850,0px_0px_40px_#33ff5850,0px_0px_60px_#33ff5850] mb-4">
          Registrarse
        </button>

        <button @click="volver" type="button"
          class="w-full p-3 bg-[#00c853] text-white rounded-md text-lg cursor-pointer transition hover:bg-[#555] hover:shadow-[0px_0px_10px_#33ff5850,0px_0px_40px_#33ff5850,0px_0px_60px_#33ff5850]">
          Volver
        </button>
      </form>
    </div>
    <div v-else class="w-full max-w-md rounded-lg bg-darker p-10">
      <h2 class="mb-6 text-center text-2xl text-neon">¡Registro exitoso!</h2>
      <p class="text-center text-white">Revisa tu correo para confirmar tu registro</p>
      <RouterLink to="/login" class="block text-center text-[#00c853] hover:text-[#00e676] mt-4 bg-dark p-2 rounded">
        Iniciar sesion
      </RouterLink>
    </div>
  </div>
</template>
