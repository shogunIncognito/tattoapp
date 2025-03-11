<script setup>
import FullCalendarComponent from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import esLocale from '@fullcalendar/core/locales/es'
import { Io5ArrowBackOutline } from 'vue-icons-plus/io5';
import { BsCalendarEvent } from 'vue-icons-plus/bs';
import { onMounted } from 'vue';
import ChatIA from '../components/ChatIA.vue';

const citas = [
    { id: 1, cliente: 'Juan Pérez', fecha: '2025-03-10T14:30:00', hora: '10:00 AM' },
    { id: 2, cliente: 'María López', fecha: '2025-03-15T14:30:00', hora: '10:00 AM' },
    { id: 3, cliente: 'Pedro Ramírez', fecha: '2025-03-20T14:30:00', hora: '10:00 AM' },
    { id: 4, cliente: 'Ana Martínez', fecha: '2025-03-25T14:30:00', hora: '10:00 AM' },
    { id: 5, cliente: 'José Rodríguez', fecha: '2025-03-30T14:30:00', hora: '10:00 AM' },
    { id: 6, cliente: 'samuel', fecha: '2025-03-30T14:30:00', hora: '10:00 AM' },
];

onMounted(() => {
    // get appointments from the API
})
</script>

<template>
    <div class="p-4 h-screen text-white flex-col rounded-2xl shadow-lg flex">
        <div class="items-center gap-10 mb-10 md:flex hidden">
            <RouterLink to="/" class="text-[#00c853] hover:text-[#00e676] flex items-center gap-2">
                <Io5ArrowBackOutline />
                Volver
            </RouterLink>
        </div>
        <div class="flex justify-center md:mt-0 items-center flex-col gap-4">
            <div class="flex flex-col md:flex-row gap-4">
                <!-- Lista de citas -->
                <div class="md:w-1/3 bg-gray-800 p-4 rounded-xl shadow">
                    <h2 class="text-xl font-semibold mb-4 border-b border-gray-600 flex items-center gap-3 pb-2">
                        <BsCalendarEvent class="text-neon" />
                        Citas Programadas
                    </h2>
                    <ul v-if="citas.length > 0">
                        <li v-for="cita in citas" :key="cita.id"
                            class="p-3 mb-2 bg-gray-700 rounded-lg shadow hover:bg-gray-600 transition">
                            <p class="text-lg font-medium">{{ cita.cliente }}</p>
                            <p class="text-sm text-gray-300">{{ cita.fecha }} - {{ cita.hora }}</p>
                        </li>
                    </ul>
                    <p v-else class="text-center text-gray-400 mt-20">No hay citas programadas</p>
                </div>

                <!-- Calendario -->
                <div class="md:w-2/3 bg-gray-900 p-4 rounded-xl shadow">
                    <FullCalendarComponent class="text-white" :options="{
                        plugins: [dayGridPlugin],
                        initialView: 'dayGridMonth',
                        locale: esLocale,
                        events: citas.map(cita => ({
                            title: cita.cliente,
                            date: cita.fecha,
                            color: '#4ade80' // Verde para destacar eventos
                        })),
                        height: 'auto'
                    }" />
                </div>
            </div>
        </div>
    </div>
</template>

<style>
/* Corregir el color del header de los días */
.fc .fc-col-header-cell {
    background-color: #1f2937 !important;
    color: white !important;
    border: 1px solid #374151;
}
</style>
