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

                cg.full_name AS caregiver_name,
                cg.phone_number,

                c.birth_facility

            FROM children c

            JOIN caregivers cg
            ON c.caregiver_id = cg.caregiver_id

            WHERE
                c.unique_code ILIKE $1
                OR c.first_name ILIKE $1
                OR c.last_name ILIKE $1
                OR cg.phone_number ILIKE $1
            `,
            [`%${query}%`]
        );

        res.status(200).json(result.rows);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: 'Server error'
        });
    }
};

module.exports = {
    registerChild,
    searchChild
};