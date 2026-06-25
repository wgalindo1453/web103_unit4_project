import React from 'react'
import { getExteriorColor, getWheelStyle } from '../utilities/options.js'
import './CarPreview.css'

const CarPreview = ({ exterior, wheels, spoiler }) => {
    const bodyColor = getExteriorColor(exterior)
    const wheelColor = getWheelStyle(wheels)
    const hasSpoiler = spoiler === 'standard' || spoiler === 'racing'
    const isRacingSpoiler = spoiler === 'racing'

    return (
        <div className='car-preview'>
            <div className='car-preview__scene'>
                <div
                    className={`car-preview__body ${isRacingSpoiler ? 'car-preview__body--racing' : ''}`}
                    style={{ backgroundColor: bodyColor }}
                >
                    <div className='car-preview__window' />
                    {hasSpoiler && (
                        <div className={`car-preview__spoiler ${isRacingSpoiler ? 'car-preview__spoiler--racing' : ''}`} />
                    )}
                </div>
                <div className='car-preview__wheels'>
                    <div className='car-preview__wheel' style={{ borderColor: wheelColor }}>
                        <div className='car-preview__rim' style={{ backgroundColor: wheelColor }} />
                    </div>
                    <div className='car-preview__wheel' style={{ borderColor: wheelColor }}>
                        <div className='car-preview__rim' style={{ backgroundColor: wheelColor }} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CarPreview
