export const getInfo = async(token: string) => {
    const response = await fetch('https://private-052d6-testapi4528.apiary-mock.com/info', {
        method: 'GET',
        headers: {
            "content-Type": 'application/json',
            "bearer": token
        }
    });
    const json = await response.json();

    return json;
}