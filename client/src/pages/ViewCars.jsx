import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllCars, deleteCar } from '../services/CarsAPI.js'
import { getOptionLabel } from '../utilities/options.js'
import { formatPrice } from '../utilities/calcPrice.js'
import '../App.css'

const ViewCars = () => {
    const [cars, setCars] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const loadCars = async () => {
        try {
            setLoading(true)
            const data = await getAllCars()
            setCars(data)
            setError('')
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadCars()
    }, [])

    const handleDelete = async (id, name) => {
        if (!window.confirm(`Delete "${name}"?`)) return

        try {
            await deleteCar(id)
            setCars((prev) => prev.filter((car) => car.id !== id))
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <main className='container'>
            <article>
                <header>
                    <h2>Your Custom Cars</h2>
                    <p>View, edit, or delete your saved Bolt Buckets.</p>
                </header>

                {loading && <p>Loading cars...</p>}
                {error && <p style={{ color: '#ff6b6b' }}>{error}</p>}

                {!loading && cars.length === 0 && (
                    <p>No cars yet. <Link to='/'>Create your first one!</Link></p>
                )}

                <div className='car-list'>
                    {cars.map((car) => (
                        <article key={car.id} className='car-card'>
                            <header>
                                <h3>
                                    <Link to={`/customcars/${car.id}`}>{car.name}</Link>
                                </h3>
                            </header>
                            <p>Exterior: {getOptionLabel('exterior', car.exterior)}</p>
                            <p>Wheels: {getOptionLabel('wheels', car.wheels)}</p>
                            <p>Engine: {getOptionLabel('engine', car.engine)}</p>
                            <p>Interior: {getOptionLabel('interior', car.interior)}</p>
                            <p>Spoiler: {getOptionLabel('spoiler', car.spoiler)}</p>
                            <p><strong>{formatPrice(car.total_price)}</strong></p>
                            <footer>
                                <Link to={`/edit/${car.id}`} role='button'>Edit</Link>
                                <button
                                    type='button'
                                    className='secondary'
                                    onClick={() => handleDelete(car.id, car.name)}
                                >
                                    Delete
                                </button>
                            </footer>
                        </article>
                    ))}
                </div>
            </article>
        </main>
    )
}

export default ViewCars
