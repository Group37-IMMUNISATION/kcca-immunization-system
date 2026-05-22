const pool = require('../config/db');

const getVaccines = async (req, res) => {

    try {

        const result = await pool.query(
            `
            SELECT *
            FROM vaccines
            ORDER BY vaccine_name
            `
        );

        res.status(200).json(result.rows);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: 'Server error'
        });
    }
};

module.exports = {
    getVaccines
};