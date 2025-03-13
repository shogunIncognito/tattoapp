<script setup>
import { ref } from "vue";
import { createTattooPost } from "../services/api";
import { toast } from "vue3-toastify";
import { BsFileImage } from "vue-icons-plus/bs";
import Spinner from "../components/Spinner.vue";
import { getApiErrorMessage } from "../utils/functions";

// Estado del formulario
const description = ref("");
const images = ref([]); // Aquí se almacenan los archivos
const previewImages = ref([]); // Aquí se guardan las previsualizaciones
const loading = ref(false);

// Referencia al input de archivos oculto
const fileInput = ref(null);

// Función para abrir el selector de archivos
const openFilePicker = () => {
    fileInput.value.click();
};

// Función para manejar la selección de imágenes
const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);

    // Agregar nuevas imágenes sin reemplazar las anteriores
    images.value = [...images.value, ...files];

    // Generar previsualizaciones
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    previewImages.value = [...previewImages.value, ...newPreviews];
};

// Función para eliminar una imagen específica
const removeImage = (index) => {
    images.value.splice(index, 1);
    previewImages.value.splice(index, 1);
};

// Función para enviar los datos al backend
const submitTattoo = async () => {
    if (!description.value || images.value.length === 0) {
        toast.warning("Por favor, completa todos los campos.");
        return;
    }

    loading.value = true;

    const formData = new FormData();
    formData.append("description", description.value);

    images.value.forEach((image) => {
        formData.append("images", image);
    });

    createTattooPost(formData)
        .then(() => {
            toast.success("Tatuaje creado correctamente.");
            description.value = "";
            images.value = [];
            previewImages.value = [];
        })
        .catch((error) => {
            console.error("Error al enviar el tatuaje:", error);
            toast.error(getApiErrorMessage(error.response.data.message) || "Hubo un error al enviar el tatuaje.");
        })
        .finally(() => {
            loading.value = false;
        });

};
</script>

<template>
    <div class="min-h-screen bg-[#000000] flex justify-center items-center p-6">
        <div class="bg-[#1a1a1a] p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 class="text-2xl font-semibold text-white mb-4">Crear Nuevo Tatuaje</h2>

            <!-- Descripción -->
            <label class="block text-white mb-2">Descripción:</label>
            <textarea v-model="description" placeholder="Describe el tatuaje..."
                class="w-full p-3 bg-[#333333] border-2 border-transparent focus:border-[#00e676] text-white rounded-lg outline-none mb-4"></textarea>

            <!-- Botón personalizado para subir imágenes -->
            <label class="block text-white mb-2">Imágenes:</label>
            <button @click="openFilePicker"
                class="w-full bg-[#00c853] text-white px-4 py-2 rounded-lg transition hover:bg-[#555555] flex items-center justify-center gap-2">
                <BsFileImage />
                Seleccionar Imágenes
            </button>

            <!-- Input oculto -->
            <input type="file" ref="fileInput" accept=".jpeg, .jpg, .png, .webp" multiple @change="handleImageUpload"
                class="hidden" />

            <!-- Previsualización de imágenes con botón de eliminar -->
            <div v-if="previewImages.length" class="grid grid-cols-3 gap-2 mt-4">
                <div v-for="(image, index) in previewImages" :key="index" class="relative group">
                    <img :src="image" class="w-full h-24 object-cover rounded-lg shadow" />
                    <button @click="removeImage(index)"
                        class="absolute top-1 right-1 bg-[#ff4444] text-white w-6 h-6 flex items-center justify-center rounded-full opacity-80 group-hover:opacity-100 transition">
                        ✕
                    </button>
                </div>
            </div>

            <!-- Botón para enviar -->
            <button @click="submitTattoo" :disabled="loading"
                class="mt-4 w-full bg-[#00c853] text-white px-4 py-2 rounded-lg transition hover:bg-[#555555]">
                <Spinner v-if="loading" class="w-full h-6" />
                <span v-else>Subir Tatuaje</span>
            </button>
            <button @click="$router.back()"
                class="mt-2 w-full bg-[#5e5656] text-white px-4 py-2 rounded-lg transition hover:bg-[#555555]">
                Volver
            </button>
        </div>
    </div>
</template>
