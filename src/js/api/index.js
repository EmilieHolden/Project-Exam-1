
const apiKey = '0687c3e4-578f-46b6-8524-17fe91d9bee6';
const accessToken = localStorage.getItem("token");

export const options = {
    headers: {
        'Authorization': `'Bearer ${accessToken}`,
        'X-Noroff-API-Key': apiKey
    }
};
