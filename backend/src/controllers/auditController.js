const pool = require('../config/db');

const getAuditLogs = async (
    req,
    res
) => {

    try {

        const result =
            await pool.query(
                `
                SELECT

                    a.log_id,
                    a.action,
                    a.timestamp,
                    a.created_at,

                    u.full_name

                FROM audit_logs a

                LEFT JOIN users u
                ON a.user_id = u.user_id

                ORDER BY
                    a.created_at DESC
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

const getRecentActivity = async (req, res) => {

    try {

        const result = await pool.query(
            `
            SELECT

                a.log_id,
                a.action,
                a.timestamp,
                u.full_name

            FROM audit_logs a

            LEFT JOIN users u
            ON a.user_id = u.user_id

            ORDER BY a.timestamp DESC

            LIMIT 5
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
    getAuditLogs,
    getRecentActivity
};