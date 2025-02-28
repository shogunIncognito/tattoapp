import { apiResponses } from "./apiResponses";

export function getApiErrorMessage(errorMessages) {
    const finalMessage = Array.isArray(errorMessages) ? errorMessages.reduce((acc, curr) => {
        const msg = apiResponses[curr];

        if (!msg) {
            return acc;
        }

        return acc + apiResponses[curr] + ". ";
    }, "") : apiResponses[errorMessages];

    return finalMessage;
}

export function deleteEmptyValues(obj) {
    return Object.fromEntries(
        Object.entries(obj).filter(([_, value]) => {
            if (value === null || value === undefined || value === "") {
                return false;
            }
            if (Array.isArray(value) && value.length === 0) {
                return false;
            }
            if (typeof value === "object" && Object.keys(value).length === 0) {
                return false;
            }
            return true;
        })
    );
}