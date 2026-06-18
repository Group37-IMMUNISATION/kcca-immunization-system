const pool = require('../config/db');

const logAction =
    require('../utils/auditLogger');

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

        res.status(200).json(
            result.rows
        );

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

        await pool.query(
            `
            INSERT INTO stock_movements
            (
                stock_id,
                action_type,
                quantity,
                performed_by
            )
            VALUES ($1,$2,$3,$4)
            `,
            [
                stock_id,
                'ADD',
                quantity,
                req.user.user_id
            ]
        );

        await logAction(
            req.user.user_id,
            `Added vaccine stock`
        );

        res.status(200).json({

            message:
                'Stock updated successfully',

            stock:
                result.rows[0]
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: 'Server error'
        });
    }
};

const getStockHistory = async (req, res) => {

    try {

        const result = await pool.query(
            `
            SELECT

                sm.movement_id,

                v.vaccine_name,

                sm.action_type,

                sm.quantity,

                sm.movement_date,

                u.full_name
                AS performed_by

            FROM stock_movements sm

            JOIN vaccine_stock vs
            ON sm.stock_id = vs.stock_id

            JOIN vaccines v
            ON vs.vaccine_id = v.vaccine_id

            JOIN users u
            ON sm.performed_by = u.user_id

            ORDER BY
                sm.movement_date DESC
            `
        );

        res.status(200).json(
            result.rows
        );

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: 'Server error'
        });
    }
};

module.exports = {
    getStock,
    addStock,
    getStockHistory
};