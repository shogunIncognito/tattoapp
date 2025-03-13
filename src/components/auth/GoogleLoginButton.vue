<script setup>
import { useSignIn } from "@clerk/vue";
import { FcGoogle } from "vue-icons-plus/fc";

const { signIn, isLoaded } = useSignIn();

const loginWithGoogle = async () => {
    if (!isLoaded || !signIn) return;

    try {
        await signIn.value.authenticateWithRedirect({
            strategy: "oauth_google",
            redirectUrlComplete: '/',
            redirectUrl: '/',
        });
    } catch (error) {
        console.error("Error al iniciar sesión con Google:", error);
    }
};
</script>

<template>
    <div class="w-full">
        <button @click="loginWithGoogle"
            class="px-4 w-full h-12 items-center justify-center mb-4 py-2 flex gap-3 bg-gray-50 hover:bg-gray-100 rounded-md">
            <FcGoogle class="w-6 h-6" />
            Iniciar sesión con Google
        </button>
    </div>
</template>
