<script setup>
import { ref } from 'vue';
import { BiSend } from 'vue-icons-plus/bi';
import { FiMessageCircle } from 'vue-icons-plus/fi';
import { useAuthStore } from '../store/useAuthStore';

const { tattooist } = defineProps(['tattooist'])

const authStore = useAuthStore();

const messages = ref([
    { text: `Hola, ¿te gustaria agendar una cita con ${tattooist.name}?`, sender: 'bot' },
    { text: '¿Que dia te gustaria agendar tu cita?', sender: 'bot' }
]);

const input = ref('');
const isOpen = ref(false);

const sendMessage = () => {
    if (!input.value.trim()) return;
    messages.value.push({ text: input.value, sender: 'user' });
    input.value = '';

    setTimeout(() => {
        messages.value.push({ text: 'Lo siento, soy un bot de prueba.', sender: 'bot' });
    }, 1000);
};
</script>

<template>
    <div v-if="authStore.user.type === 'user'" class="fixed bottom-6 right-6 z-40">
        <button @click="isOpen = !isOpen"
            class="p-3 flex items-center gap-2 bg-[#00c853] hover:bg-[#4feb90] rounded-full shadow-lg">
            <FiMessageCircle size="24" />
            Agendar cita con este artista
        </button>
    </div>

    <div v-if="isOpen"
        class="fixed bottom-20 right-9 md:w-96 w-80 ring-neon bg-[#1a1a1a] text-white p-1 rounded-lg shadow-lg z-50">
        <div class="flex flex-col h-96">
            <div class="flex-1 overflow-y-auto space-y-2 p-3">
                <div v-for="(msg, index) in messages" :key="index" class="p-3 rounded-lg max-w-xs"
                    :class="msg.sender === 'user' ? 'ml-auto bg-[#00c853] text-black' : 'bg-[#333333]'">
                    {{ msg.text }}
                </div>
            </div>
            <div class="flex items-center mt-4 bg-[#333333] p-2 m-2 rounded-lg">
                <input type="text"
                    class="flex-1 bg-transparent p-2 outline-none focus:border-[#00e676] border-2 border-transparent rounded-lg"
                    placeholder="Escribe un mensaje..." v-model="input" @keydown.enter="sendMessage" />
                <button @click="sendMessage" class="ml-2 p-2 bg-[#00c853] hover:bg-[#555555] rounded-lg">
                    <BiSend size="20" />
                </button>
            </div>
        </div>
    </div>
</template>
