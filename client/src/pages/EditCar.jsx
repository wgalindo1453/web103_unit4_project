import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import CarForm from '../components/CarForm.jsx'
import { getCar, updateCar } from '../services/CarsAPI.js'
import '../App.css'

const EditCar = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [initialValues, setInitialValues] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const loadCar = async () => {
            try {
                setLoading(true)
                const data = await getCar(id)
                setInitialValues({
                    name: data.name,
                    exterior: data.exterior,
                    wheels: data.wheels,
                    engine: data.engine,
                    interior: data.interior,
                    spoiler: data.spoiler
                })
                setError('')
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        loadCar()
    }, [id])

    const handleSubmit = async (carData) => {
        await updateCar(id, carData)
        navigate(`/customcars/${id}`)
    }

    if (loading) return <main className='container'><p>Loading...</p></main>
    if (error) return <main className='container'><p style={{ color: '#ff6b6b' }}>{error}</p></main>
    if (!initialValues) return null

    return (
        <main className='container'>
            <article>
                <header>
                    <h2>Edit Your Bolt Bucket</h2>
                    <p>Update your custom car options.</p>
                </header>
                <CarForm
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    submitLabel='Update Car'
                />
            </article>
        </main>
    )
}

export default EditCar
