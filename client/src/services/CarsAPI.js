const BASE = '/api/cars'

const handleResponse = async (response) => {
    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.error || 'Something went wrong.')
    }

    return data
}

export const getAllCars = async () => {
    const response = await fetch(BASE)
    return handleResponse(response)
}

export const getCar = async (id) => {
    const response = await fetch(`${BASE}/${id}`)
    return handleResponse(response)
}

export const createCar = async (carData) => {
    const response = await fetch(BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(carData)
    })
    return handleResponse(response)
}

export const updateCar = async (id, carData) => {
    const response = await fetch(`${BASE}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(carData)
    })
    return handleResponse(response)
}

export const deleteCar = async (id) => {
    const response = await fetch(`${BASE}/${id}`, {
        method: 'DELETE'
    })
    return handleResponse(response)
}
