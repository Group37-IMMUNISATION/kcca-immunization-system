const pool = require('../config/db');

const generateUniqueCode = () => {
    return 'KCCA-' + Date.now();
};

const logAction =
    require('../utils/auditLogger');

const registerChild = async (req, res) => {

    try {

        const {
            caregiver_name,
            phone_number,
            address,
            first_name,
            last_name,
            gender,
            date_of_birth,
            birth_facility,
            facility_id
        } = req.body;

let caregiver_id;

const existingCaregiver =
    await pool.query(
        `
        SELECT caregiver_id
        FROM caregivers
        WHERE phone_number = $1
        `,
        [phone_number]
    );

if (
    existingCaregiver.rows.length > 0
) {

    caregiver_id =
        existingCaregiver.rows[0]
            .caregiver_id;

} else {

    const caregiverResult =
        await pool.query(
            `
            INSERT INTO caregivers
            (
                full_name,
                phone_number,
                address
            )
            VALUES ($1,$2,$3)
            RETURNING caregiver_id
            `,
            [
                caregiver_name,
                phone_number,
                address
            ]
        );

    caregiver_id =
        caregiverResult.rows[0]
            .caregiver_id;
}
        const unique_code = generateUniqueCode();

        const childResult = await pool.query(
            `
            INSERT INTO children
            (
                unique_code,
                first_name,
                last_name,
                gender,
                date_of_birth,
                caregiver_id,
                birth_facility,
                facility_id
            )
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
            RETURNING *
            `,
            [
                unique_code,
                first_name,
                last_name,
                gender,
                date_of_birth,
                caregiver_id,
                birth_facility,
                facility_id
            ]
        );

await logAction(
    req.user?.user_id || null,
    `Registered child ${first_name} ${last_name}`
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
        'Registered Child',
        req.user.facility_id
    ]
);
        res.status(201).json({
            message: 'Child registered successfully',
            child: childResult.rows[0]
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: 'Server error'
        });
    }
};

const searchChildForCard = async (req, res) => {

    try {

        const { query } = req.query;

        const result = await pool.query(
            `
            SELECT

                child_id,
                unique_code,
                first_name,
                last_name

            FROM children

            WHERE

                LOWER(first_name)
                LIKE LOWER($1)

                OR LOWER(last_name)
                LIKE LOWER($1)

                OR LOWER(unique_code)
                LIKE LOWER($1)

            ORDER BY first_name
            `,
            [`%${query}%`]
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

const searchChild = async (req, res) => {

    try {

const { query } = req.query;

let searchQuery = `
SELECT

    c.child_id,
    c.unique_code,
    c.first_name,
    c.last_name,
    c.gender,
    c.date_of_birth,
    c.birth_facility,
    c.facility_id,

    cg.full_name AS caregiver_name,
    cg.phone_number,
    cg.address,

    (
        SELECT COUNT(*)
        FROM immunizations i
        WHERE i.child_id = c.child_id
    ) AS received_vaccines,

    (
        SELECT COUNT(*)
        FROM vaccines
    ) AS total_vaccines

FROM children c

JOIN caregivers cg
ON c.caregiver_id = cg.caregiver_id

WHERE
(
    LOWER(c.first_name) LIKE LOWER($1)

    OR LOWER(c.last_name) LIKE LOWER($1)

    OR LOWER(c.unique_code) LIKE LOWER($1)

    OR LOWER(cg.phone_number) LIKE LOWER($1)
)
`;

let params = [`%${query}%`];

if (req.user.role_id === 5) {

    searchQuery += `
        AND c.facility_id = $2
    `;

    params.push(
        req.user.facility_id
    );
}

const result = await pool.query(
    searchQuery,
    params
);


const children = await Promise.all(

    result.rows.map(async (child) => {

        let status = 'Not Started';

        if (
            child.received_vaccines > 0 &&
            child.received_vaccines < child.total_vaccines
        ) {

            status = 'Partially Immunized';
        }

        if (
            child.received_vaccines ==
            child.total_vaccines
        ) {

            status = 'Fully Immunized';
        }

        const dueVaccines = await pool.query(
            `
            SELECT

                vaccine_id,
                vaccine_name,
                dose_number

            FROM vaccines

            WHERE vaccine_id NOT IN (

                SELECT vaccine_id

                FROM immunizations

                WHERE child_id = $1

            )
            `,
            [child.child_id]
        );

        const history = await pool.query(
            `
            SELECT

                i.immunization_id,
                v.vaccine_name,
                v.dose_number,
                i.vaccination_date

            FROM immunizations i

            JOIN vaccines v
            ON i.vaccine_id = v.vaccine_id

            WHERE i.child_id = $1

            ORDER BY i.vaccination_date DESC
            `,
            [child.child_id]
        );

        return {

            ...child,

            immunization_status: status,

            dueVaccines:
                dueVaccines.rows,

            history:
                history.rows
        };

    })

);

res.status(200).json(children);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: 'Server error'
        });
    }
};

const updateChild = async (req, res) => {

    console.log('BODY:', req.body);
    console.log('PARAMS:', req.params);

    try {

        const { id } = req.params;

        const {
            caregiver_name,
            phone_number,
            address,
            birth_facility
        } = req.body;

        // Update caregiver

        await pool.query(
            `
            UPDATE caregivers
            SET
                full_name = $1,
                phone_number = $2,
                address = $3
            WHERE caregiver_id = (

                SELECT caregiver_id
                FROM children
                WHERE child_id = $4
            )
            `,
            [
                caregiver_name,
                phone_number,
                address,
                id
            ]
        );

let searchQuery = `
    SELECT

        c.child_id,
        c.unique_code,
        c.first_name,
        c.last_name,
        c.gender,
        c.date_of_birth,
        c.birth_facility,

        cg.full_name AS caregiver_name,
        cg.phone_number,
        cg.address,

        (
            SELECT COUNT(*)
            FROM immunizations i
            WHERE i.child_id = c.child_id
        ) AS received_vaccines,

        (
            SELECT COUNT(*)
            FROM vaccines
        ) AS total_vaccines

    FROM children c

    JOIN caregivers cg
    ON c.caregiver_id = cg.caregiver_id

    WHERE

    (
        LOWER(c.first_name) LIKE LOWER($1)

        OR LOWER(c.last_name) LIKE LOWER($1)

        OR LOWER(c.unique_code) LIKE LOWER($1)

        OR LOWER(cg.phone_number) LIKE LOWER($1)
    )
`;

let params = [`%${query}%`];

        // Update child

        const result = await pool.query(
            `
            UPDATE children
            SET
                birth_facility = $1
            WHERE child_id = $2
            RETURNING *
            `,
            [
                birth_facility,
                id
            ]
        );

        await logAction(
    req.user?.user_id || null,
    `Updated child record ${id}`
);

        res.status(200).json({
            message: 'Child updated successfully',
            child: result.rows[0]
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: 'Server error'
        });
    }
};

const getChildProfile = async (req, res) => {

    try {

        const { id } = req.params;

        const childResult = await pool.query(
            `
            SELECT

                c.child_id,
                c.unique_code,
                c.first_name,
                c.last_name,
                c.gender,
                c.date_of_birth,
                c.birth_facility,

                cg.full_name AS caregiver_name,
                cg.phone_number,
                cg.address

            FROM children c

            JOIN caregivers cg
            ON c.caregiver_id = cg.caregiver_id

            WHERE c.child_id = $1
            `,
            [id]
        );

        const immunizationResult = await pool.query(
            `
            SELECT

                v.vaccine_name,
                v.dose_number,

                i.vaccination_date,
                i.next_due_date,
                i.remarks

            FROM immunizations i

            JOIN vaccines v
            ON i.vaccine_id = v.vaccine_id

            WHERE i.child_id = $1

            ORDER BY i.vaccination_date
            `,
            [id]
        );

        const dueVaccinesResult = await pool.query(
    `
    SELECT

        vaccine_name,
        dose_number,
        recommended_age_weeks 

    FROM vaccines

    WHERE vaccine_id NOT IN (

        SELECT vaccine_id

        FROM immunizations

        WHERE child_id = $1

    )

    ORDER BY vaccine_id
    `,
    [id]
);


        res.status(200).json({

    child: childResult.rows[0],

    immunizations:
        immunizationResult.rows,

    dueVaccines:
        dueVaccinesResult.rows

});
    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: 'Server error'
        });
    }
};

const sendReminder = async (req, res) => {

    try {

        const { id } = req.params;

        const result = await pool.query(
            `
            SELECT

                c.first_name,
                c.last_name,

                cg.phone_number,
                cg.full_name AS caregiver_name

            FROM children c

            JOIN caregivers cg
            ON c.caregiver_id = cg.caregiver_id

            WHERE c.child_id = $1
            `,
            [id]
        );

        if (result.rows.length === 0) {

            return res.status(404).json({
                error: 'Child not found'
            });
        }

        const child =
            result.rows[0];

        const message =
            `Dear ${child.caregiver_name},

${child.first_name} ${child.last_name}
is due for immunization.

Please visit your nearest
KCCA Health Facility.

KCCA Immunization System`;

        res.status(200).json({

            success: true,

            phone:
                child.phone_number,

            message
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: 'Server error'
        });
    }
};


module.exports = {
    registerChild,
    searchChild,
    updateChild,
    searchChildForCard,
    getChildProfile,
    sendReminder
};