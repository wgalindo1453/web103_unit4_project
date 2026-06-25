import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import CarPreview from '../components/CarPreview.jsx'
import { getCar, deleteCar } from '../services/CarsAPI.js'
import { getOptionLabel } from '../utilities/options.js'
import { formatPrice } from '../utilities/calcPrice.js'
import '../App.css'

const CarDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [car, setCar] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const loadCar = async () => {
            try {
                setLoading(true)
                const data = await getCar(id)
                setCar(data)
                setError('')
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        loadCar()
    }, [id])

    const handleDelete = async () => {
        if (!window.confirm(`Delete "${car.name}"?`)) return

        try {
            await deleteCar(id)
            navigate('/customcars')
        } catch (err) {
            setError(err.message)
        }
    }

    if (loading) return <main className='container'><p>Loading...</p></main>
    if (error) return <main className='container'><p style={{ color: '#ff6b6b' }}>{error}</p></main>
    if (!car) return null

    return (
        <main className='container'>
            <article>
                <header>
                    <h2>{car.name}</h2>
                </header>

                <CarPreview
                    exterior={car.exterior}
                    wheels={car.wheels}
                    spoiler={car.spoiler}
                />

                <p>Exterior: {getOptionLabel('exterior', car.exterior)}</p>
                <p>Wheels: {getOptionLabel('wheels', car.wheels)}</p>
                <p>Engine: {getOptionLabel('engine', car.engine)}</p>
                <p>Interior: {getOptionLabel('interior', car.interior)}</p>
                <p>Spoiler: {getOptionLabel('spoiler', car.spoiler)}</p>
                <p><strong>Total: {formatPrice(car.total_price)}</strong></p>

                <footer>
                    <Link to='/customcars' role='button' className='secondary'>Back</Link>
                    <Link to={`/edit/${car.id}`} role='button'>Edit</Link>
                    <button type='button' className='secondary' onClick={handleDelete}>
                        Delete
                    </button>
                </footer>
            </article>
        </main>
    )
}

export default CarDetails
