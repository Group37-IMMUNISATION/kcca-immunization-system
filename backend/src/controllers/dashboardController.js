const pool = require('../config/db');

const getDashboardStats = async (req, res) => {

    try {

        const children = await pool.query(
            `
            SELECT COUNT(*) FROM children
            `
        );

        const immunizations = await pool.query(
            `
            SELECT COUNT(*) FROM immunizations
            `
        );

        const vaccines = await pool.query(
            `
            SELECT COUNT(*) FROM vaccines
            `
        );

        const defaulters = await pool.query(
            `
            SELECT COUNT(DISTINCT c.child_id)

            FROM children c

            CROSS JOIN vaccines v

            WHERE v.vaccine_id NOT IN (

                SELECT vaccine_id
                FROM immunizations i
                WHERE i.child_id = c.child_id
            )
            `
        );

        res.status(200).json({

            total_children:
                children.rows[0].count,

            total_immunizations:
                immunizations.rows[0].count,

            total_vaccines:
                vaccines.rows[0].count,

            total_defaulters:
                defaulters.rows[0].count
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: 'Server error'
        });
    }
};

module.exports = {
    getDashboardStats
};