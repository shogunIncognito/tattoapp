<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const usuario = ref({
  nombre: '',
  email: '',
  password: '',
});

const showPassword = ref(false);

const registrarUsuario = () => {
  console.log('Datos del usuario:', usuario.value);
};

const volver = () => {
  router.push('/');
};
</script>

<template>
  <div class="bg-black min-h-screen flex justify-center items-center p-5">
    <div class="bg-[#1a1a1a] p-10 rounded-lg w-full max-w-md">
      <h2 class="text-white text-center mb-8 text-2xl">Registro de Usuario</h2>

      <form @submit.prevent="registrarUsuario">
        <div class="mb-5">
          <label for="nombre" class="block text-white mb-2 text-lg">Nombre</label>
          <input type="text" id="nombre" v-model="usuario.nombre" required placeholder="Ingresa tu nombre"
            class="w-full p-3 border border-[#333] rounded-md bg-[#333] text-white text-lg focus:outline-none focus:border-[#00e676]" />
        </div>

        <div class="mb-5">
          <label for="email" class="block text-white mb-2 text-lg">Correo Electrónico</label>
          <input type="email" id="email" v-model="usuario.email" required placeholder="Ingresa tu correo"
            class="w-full p-3 border border-[#333] rounded-md bg-[#333] text-white text-lg focus:outline-none focus:border-[#00e676]" />
        </div>

        <div class="mb-5">
          <label for="password" class="block text-white mb-2 text-lg">Contraseña</label>
          <div class="relative">
            <input :type="showPassword ? 'text' : 'password'" id="password" v-model="usuario.password" required
              placeholder="Ingresa tu contraseña"
              class="w-full p-3 border border-[#333] rounded-md bg-[#333] text-white text-lg focus:outline-none focus:border-[#00e676]" />
          </div>
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
  </div>
</template>
