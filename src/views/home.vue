<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import carrusel1 from '@/assets/carrusel1.jpg';
import carrusel2 from '@/assets/carrusel2.jpg';

const imagenes = ref([carrusel1, carrusel2]);
const indiceActual = ref(0);
let intervalId = null;

const iniciarCarrusel = () => {
  intervalId = setInterval(() => {
    indiceActual.value = (indiceActual.value + 1) % imagenes.value.length;
  }, 5000);
};

const detenerCarrusel = () => {
  if (intervalId) clearInterval(intervalId);
};

onMounted(() => {
  document.body.classList.add('tattoo-home-page');
  iniciarCarrusel();
});

onBeforeUnmount(() => {
  document.body.classList.remove('tattoo-home-page');
  detenerCarrusel();
});
</script>

<template>
  <div class="tattoo-map-home">
    <!-- Carrusel con transiciones -->
    <div class="carrusel">
      <transition-group name="fade">
        <img v-for="(imagen, index) in imagenes" :key="imagen" v-show="indiceActual === index" :src="imagen"
          :alt="`Imagen carrusel ${index + 1}`" class="carrusel-imagen">
      </transition-group>
      <!-- Overlay gradiente -->
      <div class="carrusel-overlay"></div>
    </div>

    <!-- Contenido principal -->
    <main class="main-content flex-col">
      <h1 class="animate-title text-[4rem] md:text-[4rem]">Tatto <span class="text-neon">Ink</span></h1>
      <div class="content-wrapper m-2">
        <h1 class="animate-title text-[2.5rem] md:text-[3rem]">¿Quieres un tatuaje?</h1>
        <p class="animate-text">TE FACILITAMOS ENCONTRANDOLO, CON QUIÉN Y DONDE</p>
        <RouterLink to="/artists" class="main-button">
          EMPEZAR
        </RouterLink>

      </div>

      <!-- Elementos decorativos -->
      <div class="decorative-circle circle-1"></div>
      <div class="decorative-circle circle-2"></div>
    </main>
  </div>
</template>

<style>
.no-scroll {
  overflow: hidden;
  /* Deshabilita el scroll */
}

.tattoo-map-home {
  background-color: #000;
  color: #fff;
  font-family: Arial, sans-serif;
  height: 100vh;
  width: 100vw;
  position: relative;
  overflow: hidden;
  margin: 0;
  padding: 0;
}

.tattoo-map-home::-webkit-scrollbar {
  display: none;
}

/* Carrusel */
.carrusel {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.carrusel-imagen {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.5;
}

.carrusel-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8));
}

/* Animaciones del carrusel */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Contenido principal */
.main-content {
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  max-width: 800px;
}

.animate-text {
  display: inline-block;
  font-size: 20px;
  font-family: "Inter", sans-serif;
  font-weight: bold;
  margin-bottom: 20px;
  background: linear-gradient(90deg,
      #00e676 0%,
      #d7ccc8 20%,
      #00e676 40%,
      #d7ccc8 60%,
      #00e676 80%,
      #d7ccc8 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shine 15s linear infinite;
}

@keyframes shine {
  to {
    background-position: 200% center;
  }
}

/* Para asegurarnos que no hay conflictos con otras animaciones */
.animate-text {
  animation: none;
  /* Elimina cualquier otra animación */
  opacity: 1 !important;
}

.animate-text {
  animation: shine 15s linear infinite !important;
}


.animate-title {
  font-family: "Pirata One", serif;
  margin-bottom: 20px;
  opacity: 0;
  animation: fadeInUp 0.8s ease forwards;
}

.main-button {
  background-color: rgba(51, 51, 51, 0.8);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 15px 30px;
  font-size: 18px;
  cursor: pointer;
  margin-top: 20px;
  border-radius: 8px;
  box-shadow: 0 0 15px #33ff5850;
  transition: all 0.3s ease;
  opacity: 0;
  animation: fadeInUp 0.8s ease 0.4s forwards;
  backdrop-filter: blur(10px);
}

.main-button:hover {
  box-shadow:
    0px 0px 10px #33ff5850,
    0px 0px 40px #33ff5850,
    0px 0px 60px #33ff5850;
}

/* Elementos decorativos */
.decorative-circle {
  position: absolute;
  border-radius: 50%;
  filter: blur(40px);
  opacity: 0.3;
  animation: pulse 4s ease-in-out infinite;
}

.circle-1 {
  bottom: 10%;
  left: 10%;
  width: 200px;
  height: 200px;
  background: rgba(147, 51, 234, 0.3);
}

.circle-2 {
  top: 20%;
  right: 10%;
  width: 250px;
  height: 250px;
  background: rgba(59, 130, 246, 0.3);
  animation-delay: -2s;
}

/* Animaciones keyframes */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {

  0%,
  100% {
    transform: scale(1);
    opacity: 0.3;
  }

  50% {
    transform: scale(1.2);
    opacity: 0.5;
  }
}

/* Responsive */
@media (max-width: 768px) {
  .nav-container {
    width: 100%;
    padding: 0 10px;
  }

  nav ul {
    padding: 5px;
    gap: 5px;
  }

  .nav-item {
    padding: 6px 12px;
    font-size: 12px;
  }

  .animate-text {
    font-size: 18px;
  }
}

@media (max-width: 480px) {
  .nav-item {
    padding: 5px 10px;
    font-size: 11px;
  }
}
</style>
