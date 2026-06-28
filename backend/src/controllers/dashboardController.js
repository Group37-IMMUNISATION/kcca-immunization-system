
const pool = require('../config/db');

const getDashboardStats = async (req, res) => {

console.log('USER:', req.user);

    try {

        const roleId =
            req.user.role_id;

        const facilityId =
            req.user.facility_id;

        let children;
        let immunizations;
        let defaulters;
        let lowStock;

        if (roleId === 1) {

            children = await pool.query(
                `SELECT COUNT(*) FROM children`
            );

            immunizations = await pool.query(
                `SELECT COUNT(*) FROM immunizations`
            );

            defaulters = await pool.query(
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

            lowStock = await pool.query(
                `
                SELECT COUNT(*)
                FROM vaccine_stock
                WHERE quantity_available < 20
                `
            );

        } else {

            children = await pool.query(
                `
                SELECT COUNT(*)
                FROM children
                WHERE facility_id = $1
                `,
                [facilityId]
            );

            immunizations = await pool.query(
                `
                SELECT COUNT(*)
                FROM immunizations
                WHERE facility_id = $1
                `,
                [facilityId]
            );

            defaulters = await pool.query(
                `
                SELECT COUNT(DISTINCT c.child_id)

                FROM children c

                WHERE c.facility_id = $1

                AND EXISTS (

                    SELECT 1

                    FROM vaccines v

                    WHERE v.vaccine_id NOT IN (

                        SELECT vaccine_id
                        FROM immunizations i
                        WHERE i.child_id = c.child_id
                    )
                )
                `,
                [facilityId]
            );

            lowStock = await pool.query(
                `
                SELECT COUNT(*)

                FROM vaccine_stock

                WHERE facility_id = $1

                AND quantity_available < 20
                `,
                [facilityId]
            );
        }

        const vaccines =
            await pool.query(
                `SELECT COUNT(*) FROM vaccines`
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
                Number(lowStock.rows[0].count)
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

        const roleId =
            req.user.role_id;

        const facilityId =
            req.user.facility_id;

        let result;

        if (roleId === 1) {

            // Super Admin sees all facilities

            result = await pool.query(
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
                ON c.facility_id = f.facility_id

                LEFT JOIN immunizations i
                ON i.facility_id = f.facility_id

                GROUP BY
                    f.facility_id,
                    f.facility_name

                ORDER BY
                    total_immunizations DESC,
                    total_children DESC
                `
            );

        } else {

            // Facility users see only their facility

            result = await pool.query(
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
                ON c.facility_id = f.facility_id

                LEFT JOIN immunizations i
                ON i.facility_id = f.facility_id

                WHERE f.facility_id = $1

                GROUP BY
                    f.facility_id,
                    f.facility_name
                `,
                [facilityId]
            );
        }

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

const getNotifications = async (req, res) => {

    try {

        const facilityId =
            req.user.facility_id;

        const roleId =
            req.user.role_id;

        let lowStock;
        let defaulters;
        let todayRegistrations;
        let todayVaccinations;


        if (roleId === 1) {

            lowStock = await pool.query(
                `
                SELECT COUNT(*)
                FROM vaccine_stock
                WHERE quantity_available < 20
                `
            );

            defaulters = await pool.query(
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

            todayRegistrations = await pool.query(`
                    SELECT COUNT(*)
                    FROM children
                    WHERE DATE(created_at) = CURRENT_DATE
            `);

            todayVaccinations = await pool.query(`
                    SELECT COUNT(*)
                    FROM immunizations
                    WHERE DATE(vaccination_date) = CURRENT_DATE
            `);

        } else {

            lowStock = await pool.query(
                `
                SELECT COUNT(*)
                FROM vaccine_stock
                WHERE facility_id = $1
                AND quantity_available < 20
                `,
                [facilityId]
            );

            defaulters = await pool.query(
                `
                SELECT COUNT(DISTINCT c.child_id)

                FROM children c

                WHERE c.facility_id = $1

                AND EXISTS (

                    SELECT 1

                    FROM vaccines v

                    WHERE v.vaccine_id NOT IN (

                        SELECT vaccine_id
                        FROM immunizations i
                        WHERE i.child_id = c.child_id
                    )
                )
                `,
                [facilityId]
            );

            todayRegistrations = await pool.query(`
                SELECT COUNT(*)
                FROM children
                WHERE facility_id = $1
                AND DATE(created_at) = CURRENT_DATE
            `, [facilityId]);

            todayVaccinations = await pool.query(`
                SELECT COUNT(*)
                FROM immunizations
                WHERE facility_id = $1
                AND DATE(vaccination_date) = CURRENT_DATE
            `, [facilityId]);

        }

res.status(200).json({

    low_stock: Number(lowStock.rows[0].count),

    defaulters: Number(defaulters.rows[0].count),

    today_registrations: Number(todayRegistrations.rows[0].count),

    today_vaccinations: Number(todayVaccinations.rows[0].count)

});

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: 'Server error'
        });
    }
};

const getFacilityCoverage = async (req, res) => {

    try {

        const result = await pool.query(
            `
            SELECT

                f.facility_name,

                COUNT(DISTINCT c.child_id)
                AS total_children,

                COUNT(DISTINCT i.child_id)
                AS vaccinated_children

            FROM facilities f

            LEFT JOIN children c
            ON c.facility_id = f.facility_id

            LEFT JOIN immunizations i
            ON i.child_id = c.child_id

            GROUP BY
                f.facility_name

            ORDER BY
                f.facility_name
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

const getLowStockVaccines = async (req, res) => {

    try {

        let result;

        if (req.user.role_id === 1) {

            result = await pool.query(
                `
                SELECT

                    vs.stock_id,
                    v.vaccine_name,
                    f.facility_name,
                    vs.quantity_available

                FROM vaccine_stock vs

                JOIN vaccines v
                ON vs.vaccine_id = v.vaccine_id

                JOIN facilities f
                ON vs.facility_id = f.facility_id

                WHERE vs.quantity_available < 20

                ORDER BY vs.quantity_available ASC
                `
            );

        } else {

            result = await pool.query(
                `
                SELECT

                    vs.stock_id,
                    v.vaccine_name,
                    f.facility_name,
                    vs.quantity_available

                FROM vaccine_stock vs

                JOIN vaccines v
                ON vs.vaccine_id = v.vaccine_id

                JOIN facilities f
                ON vs.facility_id = f.facility_id

                WHERE vs.facility_id = $1

                AND vs.quantity_available < 20

                ORDER BY vs.quantity_available ASC
                `,
                [req.user.facility_id]
            );
        }

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

// GET DASHBOARD CHARTS
const getDashboardCharts = async (req, res) => {

    try {

        const roleId = req.user.role_id;
        const facilityId = req.user.facility_id;

        let monthlyQuery;
        let monthlyParams = [];

        if (roleId === 1) {

            monthlyQuery = `
                SELECT
                    TO_CHAR(vaccination_date, 'Mon') AS month,
                    EXTRACT(MONTH FROM vaccination_date) AS month_no,
                    COUNT(*) AS total
                FROM immunizations
                GROUP BY month, month_no
                ORDER BY month_no;
            `;

        } else {

            monthlyQuery = `
                SELECT
                    TO_CHAR(vaccination_date, 'Mon') AS month,
                    EXTRACT(MONTH FROM vaccination_date) AS month_no,
                    COUNT(*) AS total
                FROM immunizations
                WHERE facility_id = $1
                GROUP BY month, month_no
                ORDER BY month_no;
            `;

            monthlyParams.push(facilityId);

        }

        const monthlyImmunizations = await pool.query(
            monthlyQuery,
            monthlyParams
        );

        let stockQuery;
        let stockParams = [];

        if (roleId === 1) {

            stockQuery = `
                SELECT
                    v.vaccine_name AS vaccine,
                    SUM(vs.quantity_available) AS stock
                FROM vaccine_stock vs
                JOIN vaccines v
                    ON vs.vaccine_id = v.vaccine_id
                GROUP BY v.vaccine_name
                ORDER BY v.vaccine_name;
            `;

        } else {

            stockQuery = `
                SELECT
                    v.vaccine_name AS vaccine,
                    vs.quantity_available AS stock
                FROM vaccine_stock vs
                JOIN vaccines v
                    ON vs.vaccine_id = v.vaccine_id
                WHERE vs.facility_id = $1
                ORDER BY v.vaccine_name;
            `;

            stockParams.push(facilityId);

        }

        const stockLevels = await pool.query(
            stockQuery,
            stockParams
        );

        // Temporary coverage values
        // We'll replace these with real calculations later.

        const vaccineCoverage = [

            { name: "BCG", value: 95 },

            { name: "OPV", value: 91 },

            { name: "PCV", value: 89 },

            { name: "MR", value: 84 }

        ];

        res.status(200).json({

            monthlyImmunizations:
                monthlyImmunizations.rows,

            stockLevels:
                stockLevels.rows,

            vaccineCoverage

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            error: "Server error"

        });

    }

};

// GET RECENT ACTIVITY

const getRecentActivity = async (req, res) => {

    try {

        const roleId = req.user.role_id;
        const facilityId = req.user.facility_id;

        let query;
        let params = [];

        if (roleId === 1) {

            query = `

                SELECT

    CONCAT(
        c.first_name,
        ' ',
        c.last_name,
        ' received ',
        v.vaccine_name
    ) AS description,

    i.vaccination_date AS activity_time,

    f.facility_name

                FROM immunizations i

                JOIN children c
                ON i.child_id = c.child_id

                JOIN vaccines v
                ON i.vaccine_id = v.vaccine_id

                JOIN facilities f
                ON i.facility_id = f.facility_id

                ORDER BY i.vaccination_date DESC

                LIMIT 10
            `;

        } else {

            query = `

                SELECT

                    c.first_name,

                    c.last_name,

                    v.vaccine_name,

                    i.vaccination_date,

                    f.facility_name

                FROM immunizations i

                JOIN children c
                ON i.child_id = c.child_id

                JOIN vaccines v
                ON i.vaccine_id = v.vaccine_id

                JOIN facilities f
                ON i.facility_id = f.facility_id

                WHERE i.facility_id=$1

                ORDER BY i.vaccination_date DESC

                LIMIT 100
            `;

            params.push(facilityId);

        }

        const result = await pool.query(query, params);

        res.json(result.rows);

    }

    catch(error){

        console.error(error);

        res.status(500).json({

            error:"Server error"

        });

    }

};

console.log("Recent Activity:", typeof getRecentActivity);

const getActivitySummary = async (req, res) => {

    try {

        const roleId = req.user.role_id;
        const facilityId = req.user.facility_id;

        let todayActivities;
        let todayImmunizations;
        let todayRegistrations;
        let todayStockUpdates;

        if (roleId === 1) {

            todayImmunizations = await pool.query(`
                SELECT COUNT(*)
                FROM immunizations
                WHERE DATE(vaccination_date) = CURRENT_DATE
            `);

            todayRegistrations = await pool.query(`
                SELECT COUNT(*)
                FROM children
                WHERE DATE(created_at) = CURRENT_DATE
            `);

            todayStockUpdates = await pool.query(`
                SELECT COUNT(*)
                FROM stock_transactions
                WHERE DATE(transaction_date) = CURRENT_DATE
            `);

        } else {

            todayImmunizations = await pool.query(`
                SELECT COUNT(*)
                FROM immunizations
                WHERE facility_id = $1
                AND DATE(vaccination_date) = CURRENT_DATE
            `, [facilityId]);

            todayRegistrations = await pool.query(`
                SELECT COUNT(*)
                FROM children
                WHERE facility_id = $1
                AND DATE(created_at) = CURRENT_DATE
            `, [facilityId]);

            todayStockUpdates = await pool.query(`
                SELECT COUNT(*)
                FROM stock_transactions
                WHERE facility_id = $1
                AND DATE(transaction_date) = CURRENT_DATE
            `, [facilityId]);

        }

        const total =
            Number(todayImmunizations.rows[0].count) +
            Number(todayRegistrations.rows[0].count) +
            Number(todayStockUpdates.rows[0].count);

        res.json({

            todayActivities: total,

            todayImmunizations: Number(todayImmunizations.rows[0].count),

            todayRegistrations: Number(todayRegistrations.rows[0].count),

            todayStockUpdates: Number(todayStockUpdates.rows[0].count)

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            error: "Server error"

        });

    }

};

module.exports = {
    getDashboardStats,
    getFacilityPerformance,
    getMonthlyImmunizations,
    getVaccineCoverage,
    getNotifications,
    getFacilityCoverage,
    getLowStockVaccines,
    getDashboardCharts,
    getRecentActivity,
    getActivitySummary
};