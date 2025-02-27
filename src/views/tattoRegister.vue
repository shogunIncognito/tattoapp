<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const tatuador = ref({
  nombre: "",
  telefono: "",
  email: "",
  password: "",
  ciudad: "",
  instagram: "",
});

const ciudades = ref(["Villavicencio"]);

const registrarTatuador = () => {
  console.log("Datos del tatuador:", tatuador.value);
};

const volver = () => {
  router.push("/");
};
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-black p-5">
    <div class="w-full max-w-md rounded-lg bg-[#1a1a1a] p-10">
      <h2 class="mb-6 text-center text-2xl text-white">Registro de Tatuador</h2>

      <form @submit.prevent="registrarTatuador" class="space-y-4">
        <div>
          <label class="block text-white mb-1">Nombre</label>
          <input type="text" v-model="tatuador.nombre" required placeholder="Ingresa tu nombre"
            class="w-full rounded bg-[#333] p-2 text-white focus:border-[#00e676] focus:outline-none" />
        </div>

        <div>
          <label class="block text-white mb-1">Teléfono</label>
          <div class="flex gap-1">
            <label class="w-16 h-full m-0 rounded bg-[#333] p-3 text-white text-center">
              +57
            </label>
            <input type="tel" v-model="tatuador.telefono" placeholder="Número de teléfono (opcional)"
              class="rounded bg-[#333] p-2 text-white focus:border-[#00e676] focus:outline-none" />
          </div>
        </div>

        <div>
          <label class="block text-white mb-1">Correo Electrónico</label>
          <input type="email" v-model="tatuador.email" required placeholder="Ingresa tu correo"
            class="w-full rounded bg-[#333] p-2 text-white focus:border-[#00e676] focus:outline-none" />
        </div>

        <div>
          <label class="block text-white mb-1">Instagram</label>
          <input type="text" v-model="tatuador.instagram" required placeholder="Usuario de Instagram"
            class="w-full rounded bg-[#333] p-2 text-white focus:border-[#00e676] focus:outline-none" />
        </div>

        <div>
          <label class="block text-white mb-1">Contraseña</label>
          <input type="password" v-model="tatuador.password" required placeholder="Ingresa tu contraseña"
            class="w-full rounded bg-[#333] p-2 text-white focus:border-[#00e676] focus:outline-none" />
        </div>

        <div>
          <label class="block text-white mb-1">Ciudad</label>
          <select v-model="tatuador.ciudad" required
            class="w-full rounded bg-[#333] p-2 text-white focus:border-[#00e676] focus:outline-none">
            <option value="" disabled selected>Selecciona tu ciudad</option>
            <option v-for="ciudad in ciudades" :key="ciudad" :value="ciudad">{{ ciudad }}</option>
          </select>
        </div>

        <button type="submit"
          class="w-full rounded bg-[#00c853] p-3 text-white transition hover:bg-[#555] hover:shadow-lg">
          Registrarse
        </button>
        <button type="button" @click="volver"
          class="w-full mt-2 rounded bg-gray-600 p-3 text-white transition hover:bg-gray-500">
          Volver
        </button>
      </form>
    </div>
  </div>
</template>
