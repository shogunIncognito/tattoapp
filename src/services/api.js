import axios from "axios";

const API = axios.create({
    baseURL: "https://tattoo-inc-62j4s.ondigitalocean.app/api",
})

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

export async function fetchUser(token) {
    return await API.get("/auth/get-user", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}

// profile

export async function updateProfileSocial(token, data) {
    return await API.patch("/settings-users/add-social-network", data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}

// artists

export async function getArtists() {
    return await API.get("/artists");
}

export async function getArtistById(id) {
    return await API.get(`/artists/${id}`);
}
