const pool = require('../config/db');

const getStock = async (req, res) => {

    try {

        const { facility_id } = req.query;

        const result = await pool.query(
            `
            SELECT

                vs.stock_id,

                v.vaccine_name,

                vs.quantity_available

            FROM vaccine_stock vs

            JOIN vaccines v
            ON vs.vaccine_id = v.vaccine_id

            WHERE vs.facility_id = $1

            ORDER BY v.vaccine_name
            `,
            [facility_id]
        );

        res.status(200).json(result.rows);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: 'Server error'
        });
    }
};

const addStock = async (req, res) => {

    try {

        const {
            stock_id,
            quantity
        } = req.body;

        const result = await pool.query(
            `
            UPDATE vaccine_stock

            SET

                quantity_available =
                quantity_available + $1,

                last_updated =
                CURRENT_TIMESTAMP

            WHERE stock_id = $2

            RETURNING *
            `,
            [
                quantity,
                stock_id
            ]
        );

        res.status(200).json({

            message: 'Stock updated successfully',

            stock: result.rows[0]
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: 'Server error'
        });
    }
};

module.exports = {
    getStock,
    addStock
};