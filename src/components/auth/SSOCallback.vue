<script setup>
import { AuthenticateWithRedirectCallback } from '@clerk/vue';
import Spinner from '../Spinner.vue';

</script>

<template>
    <div class="w-full h-screen bg-black bg-opacity-50 z-50 flex items-center justify-center">
        <Spinner />
    </div>
    <AuthenticateWithRedirectCallback />
</template>