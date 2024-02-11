

async function fetchingPokemon() {

    const requestOption = {
        method: 'GET',
    }
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon`,
            requestOption)

        const data = await response.json()
        return data
    }
    catch (error) {
        console.error('Error Fetching data', error);
        throw error
    }
}
async function fetching(item) {

    const requestOption = {
        method: 'GET',
    }
    try {
        const response = await fetch(item,
            requestOption)

        const data = await response.json()
        return data
    }
    catch (error) {
        console.error('Error Fetching data', error);
        throw error
    }
}

export {
    fetchingPokemon,
    fetching
}
