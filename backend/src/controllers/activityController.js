const pool = require("../config/db");

const getActivityLog = async (req, res) => {

    try {

        const roleId = req.user.role_id;
        const facilityId = req.user.facility_id;

        let query;
        let params = [];

        if (roleId === 1) {

            query = `

            (
                SELECT

                    'Immunization' AS activity_type,

                    CONCAT(
                        c.first_name,
                        ' ',
                        c.last_name,
                        ' received ',
                        v.vaccine_name
                    ) AS description,

                    f.facility_name,

                    i.vaccination_date AS activity_time

                FROM immunizations i

                JOIN children c
                    ON c.child_id = i.child_id

                JOIN vaccines v
                    ON v.vaccine_id = i.vaccine_id

                JOIN facilities f
                    ON f.facility_id = i.facility_id
            )

            UNION ALL

            (
                SELECT

                    'Registration',

                    CONCAT(
                        first_name,
                        ' ',
                        last_name,
                        ' was registered'
                    ),

                    f.facility_name,

                    c.created_at

                FROM children c

                JOIN facilities f
                    ON f.facility_id = c.facility_id
            )

            UNION ALL

            (
                SELECT

                    'Stock',

                    CONCAT(
                        sm.action_type,
                        ' ',
                        sm.quantity,
                        ' doses of ',
                        v.vaccine_name
                    ),

                    f.facility_name,

                    sm.movement_date

                FROM stock_movements sm

                JOIN vaccine_stock vs
                    ON vs.stock_id = sm.stock_id

                JOIN vaccines v
                    ON v.vaccine_id = vs.vaccine_id

                JOIN facilities f
                    ON f.facility_id = vs.facility_id
            )

            ORDER BY activity_time DESC

            LIMIT 100;

            `;

        } else {

            query = `

            (
                SELECT

                    'Immunization' AS activity_type,

                    CONCAT(
                        c.first_name,
                        ' ',
                        c.last_name,
                        ' received ',
                        v.vaccine_name
                    ) AS description,

                    f.facility_name,

                    i.vaccination_date AS activity_time

                FROM immunizations i

                JOIN children c
                    ON c.child_id = i.child_id

                JOIN vaccines v
                    ON v.vaccine_id = i.vaccine_id

                JOIN facilities f
                    ON f.facility_id = i.facility_id

                WHERE i.facility_id = $1
            )

            UNION ALL

            (
                SELECT

                    'Registration',

                    CONCAT(
                        first_name,
                        ' ',
                        last_name,
                        ' was registered'
                    ),

                    f.facility_name,

                    c.created_at

                FROM children c

                JOIN facilities f
                    ON f.facility_id = c.facility_id

                WHERE c.facility_id = $1
            )

            UNION ALL

            (
                SELECT

                    'Stock',

                    CONCAT(
                        sm.action_type,
                        ' ',
                        sm.quantity,
                        ' doses of ',
                        v.vaccine_name
                    ),

                    f.facility_name,

                    sm.movement_date

                FROM stock_movements sm

                JOIN vaccine_stock vs
                    ON vs.stock_id = sm.stock_id

                JOIN vaccines v
                    ON v.vaccine_id = vs.vaccine_id

                JOIN facilities f
                    ON f.facility_id = vs.facility_id

                WHERE vs.facility_id = $1
            )

            ORDER BY activity_time DESC

            LIMIT 100;

            `;

            params.push(facilityId);

        }

        const result = await pool.query(query, params);

        res.json(result.rows);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Server error"
        });

    }

};

module.exports = {

    getActivityLog

};