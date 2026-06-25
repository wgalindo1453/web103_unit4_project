export const validateCombo = (selections) => {
    if (selections.engine === 'electric' && selections.spoiler === 'racing') {
        return {
            valid: false,
            message: 'Electric engine cannot be paired with a racing spoiler.'
        }
    }

    if (selections.wheels === 'offroad' && selections.spoiler === 'racing') {
        return {
            valid: false,
            message: 'Off-road wheels cannot be paired with a racing spoiler.'
        }
    }

    return { valid: true, message: '' }
}

export const getDisabledOptions = (selections) => {
    const disabled = {
        exterior: [],
        wheels: [],
        engine: [],
        interior: [],
        spoiler: []
    }

    if (selections.engine === 'electric') {
        disabled.spoiler.push('racing')
    }

    if (selections.spoiler === 'racing') {
        disabled.engine.push('electric')
        disabled.wheels.push('offroad')
    }

    if (selections.wheels === 'offroad') {
        disabled.spoiler.push('racing')
    }

    return disabled
}
