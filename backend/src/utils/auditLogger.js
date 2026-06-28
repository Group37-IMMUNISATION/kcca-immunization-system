const pool = require('../config/db');

const logAction = async (
    user_id,
    action
) => {

    try {

        await pool.query(
            `
            INSERT INTO audit_logs
            (
                user_id,
                action
            )
            VALUES ($1,$2)
            `,
            [
                user_id,
                action
            ]
        );

    } catch (error) {

        console.error(
            'Audit Log Error:',
            error
        );
    }
};

module.exports = logAction;