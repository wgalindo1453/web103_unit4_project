const VALID_OPTIONS = {
    exterior: ['red', 'blue', 'black', 'white', 'yellow'],
    wheels: ['standard', 'sport', 'offroad', 'gold'],
    engine: ['standard', 'turbo', 'electric'],
    interior: ['cloth', 'leather', 'racing'],
    spoiler: ['none', 'standard', 'racing']
}

const REQUIRED_FIELDS = ['name', 'exterior', 'wheels', 'engine', 'interior', 'spoiler', 'total_price']

export const validateCarData = (data) => {
    for (const field of REQUIRED_FIELDS) {
        if (data[field] === undefined || data[field] === null || data[field] === '') {
            return { valid: false, message: `${field} is required.` }
        }
    }

    if (typeof data.name !== 'string' || data.name.trim() === '') {
        return { valid: false, message: 'Car name is required.' }
    }

    for (const [feature, values] of Object.entries(VALID_OPTIONS)) {
        if (!values.includes(data[feature])) {
            return { valid: false, message: `Invalid ${feature} option.` }
        }
    }

    if (typeof data.total_price !== 'number' || data.total_price < 0) {
        return { valid: false, message: 'Invalid total price.' }
    }

    if (data.engine === 'electric' && data.spoiler === 'racing') {
        return { valid: false, message: 'Electric engine cannot be paired with a racing spoiler.' }
    }

    if (data.wheels === 'offroad' && data.spoiler === 'racing') {
        return { valid: false, message: 'Off-road wheels cannot be paired with a racing spoiler.' }
    }

    return { valid: true, message: '' }
}
