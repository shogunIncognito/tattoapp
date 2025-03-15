<script setup>
import { useAuthStore } from './store/useAuthStore';
import Spinner from './components/Spinner.vue'
import { onMounted, ref, watch } from 'vue';
import NavBar from './components/NavBar.vue';
import Footer from './components/Footer.vue';
import { useClerk, useUser } from '@clerk/vue';
import { getGoogleSession } from './services/api';
import { toast } from 'vue3-toastify';
import { getApiErrorMessage } from './utils/functions';

const authStore = useAuthStore();
const isReady = ref(false);

onMounted(async () => {
  const token = localStorage.getItem('token');
  await authStore.setSession(token)
  isReady.value = true;
});

// handle google session login
const user = useUser();
const clerk = useClerk()

watch(user.user, async (newValue) => {
  try {
    if (!newValue) return;
    isReady.value = false;

    const { data } = await getGoogleSession({ name: newValue.fullName, email: newValue.primaryEmailAddress.emailAddress, profileImageGoogle: newValue.imageUrl });
    await authStore.setSession(data.token);
  } catch (error) {
    toast.error(getApiErrorMessage(error.response.data.message) || 'Error al iniciar sesión', {
      autoClose: 3000,
    });
    setTimeout(() => {
      clerk.value.signOut();
    }, 3000);
  }
  finally {
    isReady.value = true;
  }

});

</script>

<template>
  <div id="app">
    <NavBar v-if="isReady" />
    <div v-if="!isReady"
      class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <Spinner />
    </div>
    <router-view class="pt-20" v-else>
    </router-view>
    <Footer v-if="isReady" />
  </div>
</template>


<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Pirata+One&family=Playfair+Display+SC:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&display=swap');

* {
  box-sizing: border-box;
  margin: 0%;
  padding: 0;
}

label {
  margin: 0;
}

html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  background-color: #000;
}

#app {
  width: 100%;
  min-height: 100vh;
  background-color: #000;
}
</style>
