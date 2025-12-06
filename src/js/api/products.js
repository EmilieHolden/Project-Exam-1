export async function getProducts() {
    const API_URL = "https://v2.api.noroff.dev/online-shop"

    try {
        const response = await fetch(API_URL)

        if (!response.ok)
            throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json()
        return data;

    } catch (error) {
        throw error;
    }
}

export async function getProduct(id) {
    const API_URL = `https://v2.api.noroff.dev/online-shop/${id}`

    try {
        const response = await fetch(API_URL)

        if (!response.ok)
            throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json()
        return data;

    } catch (error) {
        throw error;
    }
}
