const pool = require('../config/db');

const recordImmunization = async (req, res) => {

    try {

        const {
            child_id,
            vaccine_id,
            facility_id,
            administered_by,
            vaccination_date,
            remarks
        } = req.body;

        // Prevent duplicate vaccine dose

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

        const result = await pool.query(
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

        res.status(200).json(result.rows);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: 'Server error'
        });
    }
};

const getDueVaccines = async (req, res) => {

    try {

        const { child_id } = req.params;

        // Get child DOB

        const childResult = await pool.query(
            `
            SELECT date_of_birth
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

        const dob = new Date(childResult.rows[0].date_of_birth);

        const today = new Date();

        // Calculate age in weeks

        const ageInWeeks = Math.floor(
            (today - dob) / (1000 * 60 * 60 * 24 * 7)
        );

        // Get vaccines already taken

        const takenVaccines = await pool.query(
            `
            SELECT vaccine_id
            FROM immunizations
            WHERE child_id = $1
            `,
            [child_id]
        );

        const takenIds = takenVaccines.rows.map(
            row => row.vaccine_id
        );

        // Get vaccines due

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
            child_age_weeks: ageInWeeks,
            due_vaccines: dueVaccines.rows
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: 'Server error'
        });
    }
};

const getDefaulters = async (req, res) => {

    try {

        const result = await pool.query(
            `
            SELECT

                c.child_id,
                c.first_name,
                c.last_name,
                c.date_of_birth,

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
            `
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

module.exports = {
    recordImmunization,
    getChildImmunizationHistory,
    getDueVaccines,
    getDefaulters
};