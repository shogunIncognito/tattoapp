import { defineStore } from 'pinia';
import { ref } from 'vue';
import { fetchUser } from '../services/api';

export const useAuthStore = defineStore('auth', () => {
    const user = ref(null); // ✅ user ahora es reactivo
    const token = ref(localStorage.getItem('token') || null);
    const loading = ref(false);

    const setSession = async (newToken) => {
        if (newToken) {
            token.value = newToken;
            localStorage.setItem('token', newToken);
        }
        if (!token.value) return;

        try {
            loading.value = true;
            const response = await fetchUser(token.value);
            user.value = response.data; // ✅ Ahora Vue detecta el cambio
        } catch (error) {
            console.error('Error al obtener sesión', error);
            deleteSession();
        } finally {
            loading.value = false;
        }
    };

    const deleteSession = () => {
        user.value = null;
        token.value = null;
        localStorage.removeItem('token');
    };

    return { user, token, loading, setSession, deleteSession };
});
