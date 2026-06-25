import { pool } from '../config/database.js'
import { validateCarData } from '../utilities/validation.js'

export const getAllCars = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM cars ORDER BY id')
        res.json(result.rows)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Failed to fetch cars.' })
    }
}

export const getCarById = async (req, res) => {
    try {
        const { id } = req.params
        const result = await pool.query('SELECT * FROM cars WHERE id = $1', [id])

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Car not found.' })
        }

        res.json(result.rows[0])
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Failed to fetch car.' })
    }
}

export const createCar = async (req, res) => {
    try {
        const validation = validateCarData(req.body)

        if (!validation.valid) {
            return res.status(400).json({ error: validation.message })
        }

        const { name, exterior, wheels, engine, interior, spoiler, total_price } = req.body

        const result = await pool.query(
            `INSERT INTO cars (name, exterior, wheels, engine, interior, spoiler, total_price)
             VALUES ($1, $2, $3, $4, $5, $6, $7)
             RETURNING *`,
            [name.trim(), exterior, wheels, engine, interior, spoiler, total_price]
        )

        res.status(201).json(result.rows[0])
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Failed to create car.' })
    }
}

export const updateCar = async (req, res) => {
    try {
        const { id } = req.params
        const validation = validateCarData(req.body)

        if (!validation.valid) {
            return res.status(400).json({ error: validation.message })
        }

        const { name, exterior, wheels, engine, interior, spoiler, total_price } = req.body

        const result = await pool.query(
            `UPDATE cars
             SET name = $1, exterior = $2, wheels = $3, engine = $4,
                 interior = $5, spoiler = $6, total_price = $7
             WHERE id = $8
             RETURNING *`,
            [name.trim(), exterior, wheels, engine, interior, spoiler, total_price, id]
        )

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Car not found.' })
        }

        res.json(result.rows[0])
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Failed to update car.' })
    }
}

export const deleteCar = async (req, res) => {
    try {
        const { id } = req.params
        const result = await pool.query('DELETE FROM cars WHERE id = $1 RETURNING *', [id])

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Car not found.' })
        }

        res.json(result.rows[0])
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Failed to delete car.' })
    }
}
