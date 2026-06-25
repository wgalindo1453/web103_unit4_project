import { BASE_PRICE, FEATURES } from './options.js'

export const getOptionPrice = (feature, value) => {
    return FEATURES[feature]?.options[value]?.price ?? 0
}

export const calculateTotalPrice = (selections) => {
    let total = BASE_PRICE

    for (const [feature, options] of Object.entries(FEATURES)) {
        const value = selections[feature]
        if (value && options.options[value]) {
            total += options.options[value].price
        }
    }

    return total
}

export const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
    }).format(price)
}
