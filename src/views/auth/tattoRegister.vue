<script setup>
import { ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { registerTatto } from "../../services/api";
import { toast } from "vue3-toastify";
import { tattoosSpecialities } from "../../utils/consts";
import { deleteEmptyValues, getApiErrorMessage } from "../../utils/functions";

const router = useRouter();

const verificationEmail = ref(false);

const registerTattooist = (e) => {
  const data = deleteEmptyValues(Object.fromEntries(new FormData(e.target)));

  registerTatto(data)
    .then((res) => {
      toast.success("Revisa tu correo para confirmar tu registro");
      verificationEmail.value = true;
    })
    .catch((error) => {
      console.error("Error al registrar el tatuador:", error);
      toast.error(getApiErrorMessage(error.response.data.message) || "Error al registrar el tatuador");
    });
};

const volver = () => {
  router.push("/");
};
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-black p-5">
    <div v-if="!verificationEmail" class="w-full max-w-md rounded-lg bg-[#1a1a1a] ring-neon p-10">
      <h2 class="mb-6 text-center text-2xl text-white">Registro de <span class="text-neon">Tatuador</span></h2>

      <form @submit.prevent="registerTattooist" class="space-y-4">
        <div>
          <label class="block text-white mb-1">Nombre*</label>
          <input name="name" type="text" required placeholder="Ingresa tu nombre"
            class="w-full rounded bg-[#333] p-2 text-white focus:border-[#00e676] focus:outline-none" />
        </div>

        <div>
          <label class="block text-white mb-1">Teléfono</label>
          <div class="flex gap-1">
            <label class="w-16 h-full m-0 rounded bg-[#333] p-3 text-white text-center">
              +57
            </label>
            <input name="number" type="tel" placeholder="Número de teléfono (opcional)"
              class="rounded bg-[#333] flex-1 p-2 text-white focus:border-[#00e676] focus:outline-none" />
          </div>
        </div>

        <div>
          <span class="text-neon text-xs">*Este correo tambien sera el de contacto para los clientes</span>
          <label class="block text-white mb-1">Correo Electrónico*</label>
          <input type="email" name="email" required placeholder="Ingresa tu correo"
            class="w-full rounded bg-[#333] p-2 text-white focus:border-[#00e676] focus:outline-none" />
        </div>

        <div>
          <label class="block text-white mb-1">Contraseña*</label>
          <input type="password" name="password" required placeholder="Ingresa tu contraseña"
            class="w-full rounded bg-[#333] p-2 text-white focus:border-[#00e676] focus:outline-none" />
        </div>

        <div>
          <label class="block text-white mb-1">Especialidad de tatuaje*</label>
          <select required name="specialty"
            class="w-full rounded bg-[#333] p-2 text-white focus:border-[#00e676] focus:outline-none">
            <option value="" disabled selected>Selecciona tu especialidad</option>
            <option class="bg-dark" v-for="specialty in tattoosSpecialities" :key="specialty" :value="specialty">
              {{ specialty }}
            </option>
            <option value="Otro">Otro</option>
          </select>
        </div>

        <!-- <div>
          <label class="block text-white mb-1">Ciudad</label>
          <select required name="city"
            class="w-full rounded bg-[#333] p-2 text-white focus:border-[#00e676] focus:outline-none">
            <option value="" disabled selected>Selecciona tu ciudad</option>
            <option class="bg-dark" v-for="ciudad in ciudades" :key="ciudad" :value="ciudad">{{ ciudad }}</option>
          </select>
        </div> -->

        <div>
          <label class="block text-white mb-1">Experiencia*</label>
          <input type="text" name="experience" required placeholder="Ingresa tu experiencia en años, ej: 5 años"
            class="w-full rounded bg-[#333] p-2 text-white focus:border-[#00e676] focus:outline-none" />
        </div>

        <div class="text-white text-center mb-5">
          <p>¿Ya tienes una cuenta?</p>
          <RouterLink to="/login" class="text-[#00c853] hover:text-[#00e676]">
            Inicia sesión
          </RouterLink>
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
    <div v-else class="w-full max-w-md rounded-lg bg-darker p-10">
      <h2 class="mb-6 text-center text-2xl text-neon">¡Registro exitoso!</h2>
      <p class="text-center text-white">Revisa tu correo para confirmar tu registro</p>
      <RouterLink to="/login" class="block text-center text-[#00c853] hover:text-[#00e676] mt-4 bg-dark p-2 rounded">
        Iniciar sesion
      </RouterLink>
    </div>
  </div>
</template>
