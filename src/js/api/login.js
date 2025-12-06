export async function loginUser(userData) {
    const API_URL = "https://v2.api.noroff.dev/auth/login"

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        })

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.errors?.[0]?.message || "An unknown error occurred");
        }

        return data;
    } catch (error) {
        throw error;
    }
}