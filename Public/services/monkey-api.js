const URL = '/api';

export async function getMonkeys() {
    const url = `${URL}/monkeys`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}