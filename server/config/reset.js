import { pool } from './database.js'

const reset = async () => {
    try {
        await pool.query('DROP TABLE IF EXISTS cars')

        await pool.query(`
            CREATE TABLE cars (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                exterior VARCHAR(50) NOT NULL,
                wheels VARCHAR(50) NOT NULL,
                engine VARCHAR(50) NOT NULL,
                interior VARCHAR(50) NOT NULL,
                spoiler VARCHAR(50) NOT NULL,
                total_price INTEGER NOT NULL,
                created_at TIMESTAMP DEFAULT NOW()
            )
        `)

        console.log('cars table created successfully')
    } catch (error) {
        console.error('Error resetting database:', error)
        process.exit(1)
    } finally {
        await pool.end()
    }
}

reset()
