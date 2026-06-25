import React, { useState, useEffect } from 'react'
import CarPreview from './CarPreview.jsx'
import { FEATURES, getFeatureKeys } from '../utilities/options.js'
import { calculateTotalPrice, formatPrice } from '../utilities/calcPrice.js'
import { validateCombo, getDisabledOptions } from '../utilities/validation.js'
import './CarForm.css'

const CarForm = ({ initialValues, onSubmit, submitLabel }) => {
    const [selections, setSelections] = useState(initialValues)
    const [error, setError] = useState('')
    const [submitting, setSubmitting] = useState(false)

    useEffect(() => {
        setSelections(initialValues)
    }, [initialValues])

    const disabledOptions = getDisabledOptions(selections)
    const totalPrice = calculateTotalPrice(selections)

    const handleChange = (field, value) => {
        setSelections((prev) => {
            const updated = { ...prev, [field]: value }
            const disabled = getDisabledOptions(updated)

            for (const [feat, disabledVals] of Object.entries(disabled)) {
                if (disabledVals.includes(updated[feat])) {
                    const firstValid = Object.keys(FEATURES[feat].options).find(
                        (v) => !disabledVals.includes(v)
                    )
                    if (firstValid) updated[feat] = firstValid
                }
            }

            return updated
        })
        setError('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!selections.name.trim()) {
            setError('Please enter a name for your car.')
            return
        }

        const validation = validateCombo(selections)
        if (!validation.valid) {
            setError(validation.message)
            return
        }

        setSubmitting(true)
        try {
            await onSubmit({ ...selections, total_price: totalPrice })
        } catch (err) {
            setError(err.message)
        } finally {
            setSubmitting(false)
        }
    }

    const isOptionDisabled = (feature, value) => {
        return disabledOptions[feature]?.includes(value)
    }

    return (
        <form onSubmit={handleSubmit} className='car-form'>
            <div className='car-form__layout'>
                <div className='car-form__options'>
                    <label>
                        Car Name
                        <input
                            type='text'
                            placeholder='My Bolt Bucket'
                            value={selections.name}
                            onChange={(e) => handleChange('name', e.target.value)}
                        />
                    </label>

                    {getFeatureKeys().map((feature) => (
                        <label key={feature}>
                            {FEATURES[feature].label}
                            <select
                                value={selections[feature]}
                                onChange={(e) => handleChange(feature, e.target.value)}
                            >
                                {Object.entries(FEATURES[feature].options).map(([value, option]) => (
                                    <option
                                        key={value}
                                        value={value}
                                        disabled={isOptionDisabled(feature, value)}
                                    >
                                        {option.label} (+{formatPrice(option.price)})
                                    </option>
                                ))}
                            </select>
                        </label>
                    ))}
                </div>

                <div className='car-form__preview'>
                    <h3>Preview</h3>
                    <CarPreview
                        exterior={selections.exterior}
                        wheels={selections.wheels}
                        spoiler={selections.spoiler}
                    />
                    <p className='car-form__price'>
                        Total: <strong>{formatPrice(totalPrice)}</strong>
                    </p>
                </div>
            </div>

            {error && <p className='car-form__error'>{error}</p>}

            <button type='submit' disabled={submitting}>
                {submitting ? 'Saving...' : submitLabel}
            </button>
        </form>
    )
}

export default CarForm
