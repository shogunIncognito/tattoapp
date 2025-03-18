<script setup lang="ts">
import { BsFacebook, BsInstagram, BsTwitterX, BsYoutube } from 'vue-icons-plus/bs';
import { RouterLink } from 'vue-router';

</script>

<template>
    <footer class="bg-black text-white py-8 mt-10 shadow-lg ring-neon">
        <div class="max-w-5xl mx-auto px-6 text-center">
            <!-- Redes sociales -->
            <div class="flex justify-center gap-4 mb-4">
                <a href="https://www.instagram.com/tatt_oiinkk/"
                    class="bg-gray-800 p-3 rounded-full hover:bg-green-500 transition">
                    <BsInstagram class="text-white" />
                </a>
                <a href="https://x.com/TattoInk" class="bg-gray-800 p-3 rounded-full hover:bg-green-500 transition">
                    <BsTwitterX class="text-white" />
                </a>
            </div>

            <!-- Enlaces -->
            <nav class="flex justify-center gap-6 mb-4">
                <RouterLink to="/" class="hover:text-green-500">Inicio</RouterLink>
                <RouterLink to="/artists" class="hover:text-green-500">Artistas</RouterLink>
                <RouterLink to="/tattoos" class="hover:text-green-500">Tatuajes</RouterLink>
                <RouterLink to="/contact" class="hover:text-green-500">Contáctanos</RouterLink>
            </nav>

            <!-- Copy -->
            <div class="border-t border-gray-700 pt-4 text-gray-500 text-sm">
                &copy; {{ new Date().getFullYear() }} Tattoo Ink. Todos los derechos reservados.
            </div>
        </div>
    </footer>
</template>