const pool = require('../config/db');

const getFacilities = async (req, res) => {

    try {

        const result = await pool.query(
            `
            SELECT
                facility_id,
                facility_name
            FROM facilities
            ORDER BY facility_name
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
    getFacilities
};