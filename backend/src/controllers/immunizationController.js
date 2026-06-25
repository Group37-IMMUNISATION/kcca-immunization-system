const pool = require('../config/db');
const { sendSMS } = require('../services/smsService');

const logAction =
    require('../utils/auditLogger');

const recordImmunization = async (req, res) => {

    try {

        if (
            req.user.role_id !== 2 &&
            req.user.role_id !== 3
        ) {

            return res.status(403).json({
                error: 'Access denied'
            });
        }

        const {
            child_id,
            vaccine_id,
            vaccination_date,
            remarks
        } = req.body;

        
const {
    sendSMS
} = require('../services/smsService');

const administered_by = req.user.user_id;

const facility_id = req.user.facility_id;

        // Prevent duplicate vaccine dose

        const stockCheck = await pool.query(
    `
    SELECT quantity_available

    FROM vaccine_stock

    WHERE
        vaccine_id = $1
        AND facility_id = $2
    `,
    [
        vaccine_id,
        facility_id
    ]
);

await pool.query(
    `
    INSERT INTO audit_logs
    (
        user_id,
        action,
        facility_id
    )
    VALUES ($1,$2,$3)
    `,
    [
        req.user.user_id,
        'Recorded Immunization',
        req.user.facility_id
    ]
);
        const existingRecord = await pool.query(
            `
            SELECT * FROM immunizations
            WHERE child_id = $1
            AND vaccine_id = $2
            `,
            [child_id, vaccine_id]
        );

        if (existingRecord.rows.length > 0) {

            return res.status(400).json({
                error: 'This vaccine dose was already administered to the child'
            });
        }

        // Save immunization

        if (
    stockCheck.rows.length === 0
) {

    return res.status(404).json({
        error: 'Stock record not found'
    });
}

if (
    stockCheck.rows[0]
    .quantity_available <= 0
) {

    return res.status(400).json({
        error: 'Vaccine out of stock'
    });
}

        const result = await pool.query(
            `
            INSERT INTO immunizations
            (
                child_id,
                vaccine_id,
                facility_id,
                administered_by,
                vaccination_date,
                remarks
            )
            VALUES ($1,$2,$3,$4,$5,$6)
            RETURNING *
            `,
            [
                child_id,
                vaccine_id,
                facility_id,
                administered_by,
                vaccination_date,
                remarks
            ]
        );

const stockResult = await pool.query(
    `
    SELECT stock_id
    FROM vaccine_stock
    WHERE vaccine_id = $1
    AND facility_id = $2
    `,
    [
        vaccine_id,
        facility_id
    ]
);

const stock_id =
    stockResult.rows[0].stock_id;

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
        'USE',
        1,
        req.user.user_id
    ]
);


await pool.query(
    `
    UPDATE vaccine_stock

    SET
        quantity_available =
        quantity_available - 1,

        last_updated =
        CURRENT_TIMESTAMP

    WHERE

        vaccine_id = $1

        AND facility_id = $2
    `,
    [
        vaccine_id,
        facility_id
    ]
);

await logAction(
    req.user.user_id,
    `Recorded vaccine ${vaccine_id} for child ${child_id}`
);

        res.status(201).json({
            message: 'Immunization recorded successfully',
            immunization: result.rows[0]
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: 'Server error'
        });
    }
};

const getChildImmunizationHistory = async (req, res) => {

    try {

        const { child_id } = req.params;

        // Get child details

        const childResult = await pool.query(
            `
            SELECT
                child_id,
                unique_code,
                first_name,
                last_name,
                gender,
                date_of_birth
            FROM children
            WHERE child_id = $1
            `,
            [child_id]
        );

        // Get immunization history

        const historyResult = await pool.query(
            `
            SELECT

                i.immunization_id,
                i.vaccination_date,
                i.remarks,

                v.vaccine_name,
                v.dose_number,

                f.facility_name,

                u.full_name AS administered_by

            FROM immunizations i

            JOIN vaccines v
            ON i.vaccine_id = v.vaccine_id

            JOIN facilities f
            ON i.facility_id = f.facility_id

            JOIN users u
            ON i.administered_by = u.user_id

            WHERE i.child_id = $1

            ORDER BY i.vaccination_date ASC
            `,
            [child_id]
        );

        res.status(200).json({

            child: childResult.rows[0],

            history: historyResult.rows
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: 'Server error'
        });
    }
};


    //DEFAULTERS
const getDefaulters = async (req, res) => {

    try {

        let query = `
    SELECT

        c.child_id,
        c.first_name,
        c.last_name,
        c.date_of_birth,
        c.facility_id,

        cg.full_name AS caregiver_name,
        cg.phone_number,

        v.vaccine_name,
        v.dose_number,
        v.recommended_age_weeks

    FROM children c

    JOIN caregivers cg
    ON c.caregiver_id = cg.caregiver_id

    CROSS JOIN vaccines v

    WHERE v.vaccine_id NOT IN (

        SELECT vaccine_id
        FROM immunizations i
        WHERE i.child_id = c.child_id
    )
`;

let params = [];

if (req.user.role_id === 5) {

    query += `
        AND c.facility_id = $1
    `;

    params.push(
        req.user.facility_id
    );
}

const result = await pool.query(
    query,
    params
);

        const today = new Date();

        const defaulters = result.rows.filter(row => {

            const dob = new Date(row.date_of_birth);

            const ageInWeeks = Math.floor(
                (today - dob) / (1000 * 60 * 60 * 24 * 7)
            );

            return ageInWeeks > row.recommended_age_weeks;
        });

        res.status(200).json(defaulters);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: 'Server error'
        });
    }
};
        // Get due vaccines for a child
            const getDueVaccines = async (req, res) => {

    try {

        const { child_id } = req.params;

        // Get child details

        const childResult = await pool.query(
            `
            SELECT
                child_id,
                unique_code,
                first_name,
                last_name,
                gender,
                date_of_birth
            FROM children
            WHERE child_id = $1
            `,
            [child_id]
        );

        if (childResult.rows.length === 0) {

            return res.status(404).json({
                error: 'Child not found'
            });
        }

        const child = childResult.rows[0];

        const dob = new Date(child.date_of_birth);

        const today = new Date();

        // Calculate age in weeks

        const ageInWeeks = Math.floor(
            (today - dob) / (1000 * 60 * 60 * 24 * 7)
        );

        // Get due vaccines

        const dueVaccines = await pool.query(
            `
            SELECT *
            FROM vaccines
            WHERE recommended_age_weeks <= $1
            AND vaccine_id NOT IN (

                SELECT vaccine_id
                FROM immunizations
                WHERE child_id = $2
            )

            ORDER BY recommended_age_weeks ASC
            `,
            [ageInWeeks, child_id]
        );

        res.status(200).json({

            child: {

                ...child,

                age_weeks: ageInWeeks
            },

            due_vaccines: dueVaccines.rows
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: 'Server error'
        });
    }
};

const sendDefaulterReminder = async (req, res) => {

    try {

        const { child_id } = req.params;

        const result = await pool.query(
            `
            SELECT

                c.first_name,
                c.last_name,

                cg.full_name,
                cg.phone_number

            FROM children c

            JOIN caregivers cg
            ON c.caregiver_id = cg.caregiver_id

            WHERE c.child_id = $1
            `,
            [child_id]
        );

        if (
            result.rows.length === 0
        ) {

            return res.status(404).json({
                error: 'Child not found'
            });
        }

        const child =
            result.rows[0];

        const message =

            `Dear ${child.full_name},

Your child ${child.first_name} ${child.last_name}
has missed a scheduled vaccination.

Please visit your nearest KCCA health facility.

KCCA Immunization System`;

        await sendSMS(
            child.phone_number,
            message
        );

        res.status(200).json({

            message:
                'Reminder sent successfully'
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: 'Server error'
        });
    }
};

const getVaccinationCard = async (req, res) => {

    try {

        const { child_id } = req.params;

        const childResult = await pool.query(
            `
            SELECT
                child_id,
                unique_code,
                first_name,
                last_name,
                gender,
                date_of_birth
            FROM children
            WHERE child_id = $1
            `,
            [child_id]
        );

        if (childResult.rows.length === 0) {

            return res.status(404).json({
                error: 'Child not found'
            });
        }

        const completedVaccines = await pool.query(
            `
            SELECT

                v.vaccine_name,
                v.dose_number

            FROM immunizations i

            JOIN vaccines v
            ON i.vaccine_id = v.vaccine_id

            WHERE i.child_id = $1

            ORDER BY v.recommended_age_weeks
            `,
            [child_id]
        );

        const pendingVaccines = await pool.query(
            `
            SELECT

                vaccine_name,
                dose_number

            FROM vaccines

            WHERE vaccine_id NOT IN (

                SELECT vaccine_id

                FROM immunizations

                WHERE child_id = $1
            )

            ORDER BY recommended_age_weeks
            `,
            [child_id]
        );

        const totalVaccines = await pool.query(
            `
            SELECT COUNT(*) FROM vaccines
            `
        );

        const receivedVaccines =
            completedVaccines.rows.length;

        let status = 'Not Started';

        if (
            receivedVaccines > 0 &&
            receivedVaccines <
            totalVaccines.rows[0].count
        ) {

            status = 'Partially Immunized';
        }

        if (
            receivedVaccines ==
            totalVaccines.rows[0].count
        ) {

            status = 'Fully Immunized';
        }

        res.status(200).json({

            child:
                childResult.rows[0],

            completed:
                completedVaccines.rows,

            pending:
                pendingVaccines.rows,

            status
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: 'Server error'
        });
    }
};

module.exports = {
    recordImmunization,
    getChildImmunizationHistory,
    getDueVaccines,
    getDefaulters,
    sendDefaulterReminder,
    getVaccinationCard
};