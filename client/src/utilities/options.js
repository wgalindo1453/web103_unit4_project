export const BASE_PRICE = 25000

export const FEATURES = {
    exterior: {
        label: 'Exterior Color',
        options: {
            red: { label: 'Racing Red', price: 0, color: '#c41e3a' },
            blue: { label: 'Ocean Blue', price: 300, color: '#1e5bc4' },
            black: { label: 'Midnight Black', price: 200, color: '#1a1a1a' },
            white: { label: 'Pearl White', price: 400, color: '#f0f0f0' },
            yellow: { label: 'Lightning Yellow', price: 500, color: '#f5c518' }
        }
    },
    wheels: {
        label: 'Wheels',
        options: {
            standard: { label: 'Standard Alloy', price: 0 },
            sport: { label: 'Sport Rims', price: 800 },
            offroad: { label: 'Off-Road Tires', price: 1200 },
            gold: { label: 'Gold Rims', price: 2000 }
        }
    },
    engine: {
        label: 'Engine',
        options: {
            standard: { label: 'Standard V6', price: 0 },
            turbo: { label: 'Turbo V8', price: 3500 },
            electric: { label: 'Electric Motor', price: 5000 }
        }
    },
    interior: {
        label: 'Interior',
        options: {
            cloth: { label: 'Cloth Seats', price: 0 },
            leather: { label: 'Leather Seats', price: 900 },
            racing: { label: 'Racing Bucket Seats', price: 1500 }
        }
    },
    spoiler: {
        label: 'Spoiler',
        options: {
            none: { label: 'No Spoiler', price: 0 },
            standard: { label: 'Standard Spoiler', price: 400 },
            racing: { label: 'Racing Spoiler', price: 800 }
        }
    }
}

export const DEFAULT_SELECTIONS = {
    name: '',
    exterior: 'red',
    wheels: 'standard',
    engine: 'standard',
    interior: 'cloth',
    spoiler: 'none'
}

export const getFeatureKeys = () => Object.keys(FEATURES)

export const getOptionLabel = (feature, value) => {
    return FEATURES[feature]?.options[value]?.label ?? value
}

export const getExteriorColor = (value) => {
    return FEATURES.exterior.options[value]?.color ?? '#c41e3a'
}

export const getWheelStyle = (value) => {
    if (value === 'gold') return '#d4af37'
    if (value === 'sport') return '#888'
    if (value === 'offroad') return '#5c4033'
    return '#333'
}
