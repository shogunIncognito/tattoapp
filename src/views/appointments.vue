<script setup>
import FullCalendarComponent from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import esLocale from '@fullcalendar/core/locales/es'
import { Io5ArrowBackOutline } from 'vue-icons-plus/io5';
import { BsCalendarEvent } from 'vue-icons-plus/bs';
import { onMounted, ref } from 'vue';
import { deleteAppointment, getTattooistAppointments, getUserAppointments } from '../services/api';
import { useAuthStore } from '../store/useAuthStore';
import Spinner from '../components/Spinner.vue';
import { BiTrash } from 'vue-icons-plus/bi';
import { toast } from 'vue3-toastify';

const authStore = useAuthStore();

const appointments = ref([]);
const loading = ref(true);

const formatDate = (dateString) => {
    const date = new Date(dateString); // Asegurar que se interprete como UTC

    // Formatear la fecha en un formato legible (Ej: 10 de marzo de 2025)
    const formattedDate = date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Formatear la hora en formato de 24 horas (Ej: 14:30)
    const formattedTime = dateString.split('T')[1].split(':').slice(0, 2).join(':');

    return `${formattedDate} a las ${formattedTime}`;
};

const handleDeleteAppointment = (id) => {
    deleteAppointment(id)
    toast.success('Cita eliminada correctamente');
    appointments.value = appointments.value.filter(appointment => appointment._id !== id);
};

onMounted(async () => {
    try {
        const response = authStore.user.type === 'user'
            ? await getUserAppointments()
            : await getTattooistAppointments();

        appointments.value = response.data;
    } catch (err) {
        console.error('Error fetching appointments:', err);
    } finally {
        loading.value = false;
    }
});
</script>

<template>
    <div v-if="loading" class="p-4 h-screen text-white flex-col rounded-2xl shadow-lg flex items-center justify-center">
        <Spinner />
    </div>
    <div v-else class="p-4 text-white flex-col rounded-2xl shadow-lg flex">
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
                    <ul v-if="appointments.length > 0">
                        <li v-for="appointment in appointments" :key="appointment.id"
                            class="p-3 mb-2 rounded-lg flex shadow hover:bg-gray-600 transition"
                            :style="{ backgroundColor: appointment.color }">
                            <div>
                                <p class="text-lg font-medium text-gray-900">{{ appointment.title }}</p>
                                <p class="text-sm text-black">
                                    {{ formatDate(appointment.date) }}
                                </p>
                            </div>
                            <!-- // delete button -->
                            <button v-if="authStore.user?.type === 'tattooArtist'"
                                class="text-white ml-auto bg-red-500 p-2 rounded-lg mt-2"
                                @click="handleDeleteAppointment(appointment._id)">
                                <BiTrash size="20" />
                            </button>
                        </li>
                    </ul>
                    <p v-else class="text-center text-gray-400 md:mt-20">No hay citas programadas</p>
                </div>

                <!-- Calendario -->
                <div class="md:w-2/3 bg-gray-900 p-4 rounded-xl shadow">
                    <FullCalendarComponent class="text-white" :options="{
                        plugins: [dayGridPlugin],
                        initialView: 'dayGridMonth',
                        locale: esLocale,
                        timeZone: 'UTC',
                        eventTimeFormat: { hour: 'numeric', minute: '2-digit', meridiem: 'short' },
                        events: appointments.map(appointment => ({
                            title: appointment.title,
                            date: appointment.date,
                            color: appointment.color
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

/* Mejoras responsivas */
@media (max-width: 768px) {
    .fc .fc-toolbar-title {
        font-size: 1.2rem;
        /* Reducir tamaño del título en móvil */
    }

    .fc .fc-daygrid-day {
        font-size: 0.9rem;
        /* Ajustar el tamaño de los días */
    }
}
</style>
