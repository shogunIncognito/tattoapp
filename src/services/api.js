import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:3001",
})

// auth

export async function registerUser(data) {
    return await API.post("/auth/register-user", data);
}

export async function registerTatto(data) {
    return await API.post("/auth/register-tatto", data);
}

export async function validateEmail(token) {
    return await API.get(`/auth/validate-email/${token}`);
}


// artists

export async function getArtists() {
    return await API.get("/artists");
}