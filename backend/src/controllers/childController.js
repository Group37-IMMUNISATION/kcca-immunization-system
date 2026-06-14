const pool = require('../config/db');

const generateUniqueCode = () => {
    return 'KCCA-' + Date.now();
};

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
            birth_facility
        } = req.body;

        const caregiverResult = await pool.query(
            `
            INSERT INTO caregivers (full_name, phone_number, address)
            VALUES ($1, $2, $3)
            RETURNING caregiver_id
            `,
            [caregiver_name, phone_number, address]
        );

        const caregiver_id = caregiverResult.rows[0].caregiver_id;

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
                birth_facility
            )
            VALUES ($1,$2,$3,$4,$5,$6,$7)
            RETURNING *
            `,
            [
                unique_code,
                first_name,
                last_name,
                gender,
                date_of_birth,
                caregiver_id,
                birth_facility
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

const searchChild = async (req, res) => {

    try {

        const { query } = req.query;

        const result = await pool.query(
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

        LOWER(c.first_name)
        LIKE LOWER($1)

        OR LOWER(c.last_name)
        LIKE LOWER($1)

        OR LOWER(c.unique_code)
        LIKE LOWER($1)

        OR LOWER(cg.phone_number)
        LIKE LOWER($1)
    `,
    [`%${query}%`]
);

const children = result.rows.map(child => {

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

    return {

        ...child,

        immunization_status: status
    };
});

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



module.exports = {
    registerChild,
    searchChild,
    updateChild
};