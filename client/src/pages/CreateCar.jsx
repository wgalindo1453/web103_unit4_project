import React from 'react'
import { useNavigate } from 'react-router-dom'
import CarForm from '../components/CarForm.jsx'
import { DEFAULT_SELECTIONS } from '../utilities/options.js'
import { createCar } from '../services/CarsAPI.js'
import '../App.css'

const CreateCar = () => {
    const navigate = useNavigate()

    const handleSubmit = async (carData) => {
        await createCar(carData)
        navigate('/customcars')
    }

    return (
        <main className='container'>
            <article>
                <header>
                    <h2>Customize Your Bolt Bucket</h2>
                    <p>Build your dream car with custom options.</p>
                </header>
                <CarForm
                    initialValues={DEFAULT_SELECTIONS}
                    onSubmit={handleSubmit}
                    submitLabel='Save Car'
                />
            </article>
        </main>
    )
}

export default CreateCar
