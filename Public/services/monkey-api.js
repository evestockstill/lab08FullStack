const URL = '/api';

export async function getMonkeys() {
    const url = `${URL}/monkeys`;

    const response = await fetch(url);
    const monkeyData = await response.json();
    return monkeyData;
}

export async function getTypes() {
    const url = `${URL}/types`;

    const response = await fetch(url);
    const monkeyData = await response.json();
    return monkeyData;
}

export async function addMonkey(monkey) {
    const url = `${URL}/monkeys`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(monkey)
    });

    const monkeyData = await response.json();
    return monkeyData;
}