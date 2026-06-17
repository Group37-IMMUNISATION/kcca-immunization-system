const pool = require('../config/db');

const getDashboardStats = async (req, res) => {

    try {

        const children = await pool.query(
            `SELECT COUNT(*) FROM children`
        );

        const immunizations = await pool.query(
            `SELECT COUNT(*) FROM immunizations`
        );

        const vaccines = await pool.query(
            `SELECT COUNT(*) FROM vaccines`
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

        const lowStockResult = await pool.query(
            `
            SELECT COUNT(*)
            FROM vaccine_stock
            WHERE quantity_available < 20
            `
        );

        res.status(200).json({

            total_children:
                Number(children.rows[0].count),

            total_immunizations:
                Number(immunizations.rows[0].count),

            total_vaccines:
                Number(vaccines.rows[0].count),

            total_defaulters:
                Number(defaulters.rows[0].count),

            low_stock:
                Number(lowStockResult.rows[0].count)
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: 'Server error'
        });
    }
};

const getFacilityPerformance = async (req, res) => {

    try {

        const result = await pool.query(
            `
            SELECT

                f.facility_id,
                f.facility_name,

                COUNT(DISTINCT c.child_id)
                AS total_children,

                COUNT(DISTINCT i.immunization_id)
                AS total_immunizations

            FROM facilities f

            LEFT JOIN children c
            ON c.birth_facility = f.facility_name

            LEFT JOIN immunizations i
            ON i.facility_id = f.facility_id

            GROUP BY
                f.facility_id,
                f.facility_name

            ORDER BY
                total_immunizations DESC
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


const getMonthlyImmunizations = async (req, res) => {

    try {

        const result = await pool.query(
            `
            SELECT

                TO_CHAR(
                    vaccination_date,
                    'Mon YYYY'
                ) AS month,

                COUNT(*) AS total

            FROM immunizations

            GROUP BY
                TO_CHAR(
                    vaccination_date,
                    'Mon YYYY'
                ),
                DATE_TRUNC(
                    'month',
                    vaccination_date
                )

            ORDER BY
                DATE_TRUNC(
                    'month',
                    vaccination_date
                )
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

const getVaccineCoverage = async (req, res) => {

    try {

        const result = await pool.query(
            `
            SELECT

                v.vaccine_name,
                v.dose_number,

                COUNT(i.immunization_id)
                AS administered

            FROM vaccines v

            LEFT JOIN immunizations i
            ON v.vaccine_id = i.vaccine_id

            GROUP BY
                v.vaccine_id,
                v.vaccine_name,
                v.dose_number

            ORDER BY
                v.vaccine_name,
                v.dose_number
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
    getDashboardStats,
    getFacilityPerformance,
    getMonthlyImmunizations,
    getVaccineCoverage
};