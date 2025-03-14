import axios from "axios";

const API = axios.create({
    baseURL: "https://tattoo-inc-62j4s.ondigitalocean.app/api",
})

const getToken = () => localStorage.getItem("token");

// auth

export async function registerUser(data) {
    return await API.post("/auth/register-user", data);
}

export async function registerTatto(data) {
    return await API.post("/auth/register-tattoo-artist", data);
}

export async function verifyEmail(emailToken) {
    return await API.post(`/auth/verify-email`, { token: emailToken });
}

export async function login(data) {
    return await API.post("/auth/login", data);
}

export async function getGoogleSession(data) {
    return await API.post("/auth/register-and-login-user", data);
}

export async function fetchUser() {
    return await API.get("/auth/get-user", {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });
}

// profile

export async function updateProfileName(data) {
    return await API.patch("/settings-users/update-user", data, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });
}

export async function updateProfileInfo(data) {
    return await API.patch("/settings-users/update-tattoo-artist", data, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });
}

export async function updateProfileSocial(data) {
    return await API.patch("/settings-users/add-social-network", data, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });
}

export async function updateProfilePhoto(data) {
    return await API.post("/settings-users/update-photo-profile", data, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });
}

export async function updateProfileBanner(data) {
    return await API.post("/settings-users/update-photo-background", data, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });
}

export async function setUserPassword(id, password) {
    return await API.patch(`/auth/add-password-user/${id}`, { password }, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });
}

// artists

export async function getTattooArtists() {
    return await API.get("/auth/get-find-tattoo-artist");
}

export async function getTattooArtistById(id) {
    return await API.get(`/auth/get-tattoo-artist/${id} `);
}

// tattoos posts

export async function getTattooPosts() {
    return await API.get("/posts-tattoo-artist/get-find-posts");
}

export async function getTattooPostById(id) {
    return await API.get(`/posts-tattoo-artist/get-posts-byid/${id}`);
}

export async function createTattooPost(data) {
    return await API.post("/posts-tattoo-artist/create-post", data, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });
}

export async function deleteTattooPost(id) {
    return await API.delete(`/posts-tattoo-artist/delete-post/${id}`, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });
}

export async function getTattooistPosts(id) {
    return await API.get(`/posts-tattoo-artist/get-posts-tattoo-artist/${id}`);
}

export async function likeTattooPost(id) {
    return await API.post(`/posts-tattoo-artist/like-post/${id}`, null, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });
}

export async function unlikeTattooPost(id) {
    return await API.post(`/posts-tattoo-artist/unlike-post/${id}`, null, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });
}

export async function createTattooistReview(idTattooist, data) {
    return await API.post(`/qualification-of-tatto-artist/create-qualification/${idTattooist}`, data, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });
}

export async function updateTattooistReview(idReview, data) {
    return await API.patch(`/qualification-of-tatto-artist/update-qualification/${idReview}`, data, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });
}

export async function getTattooistReviews(idTattooist) {
    return await API.get(`/qualification-of-tatto-artist/get-find-calification/${idTattooist}`);
}

// appointments

export async function sendMessageAI(message, idTattooist) {
    return await API.post(`/appointment/shedule/${idTattooist}`, { message }, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });
}

export async function getUserAppointments() {
    return await API.get("/appointment/get-shedule-user", {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });
}

export async function getTattooistAppointments() {
    return await API.get("/appointment/get-shedule-artist/", {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });
}

export async function deleteAppointment(id) {
    return await API.delete(`/appointment/delete-shedule/${id}`, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });
}

// update forgot

export async function sendForgotPasswordEmail(email) {
    return await API.post("/auth/forgot-password", { email });
}

export async function updateForgotPassword(token, password) {
    return await API.patch("/auth/reset-password", { password }, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}
