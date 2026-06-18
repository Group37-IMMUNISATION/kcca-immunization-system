const pool = require('../config/db');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');


// REGISTER USER

const registerUser = async (req, res) => {

    try {

        const {
            full_name,
            email,
            password,
            role_id,
            facility_id
        } = req.body;

        // Hash password

        const hashedPassword = await bcrypt.hash(password, 10);

        // Save user

        const result = await pool.query(
            `
            INSERT INTO users
            (
                full_name,
                email,
                password,
                role_id,
                facility_id
            )
            VALUES ($1,$2,$3,$4,$5)
            RETURNING user_id, full_name, email
            `,
            [
                full_name,
                email,
                hashedPassword,
                role_id,
                facility_id
            ]
        );

await logAction(
    req.user?.user_id || null,
    `Created user ${email}`
);

        res.status(201).json({
            message: 'User registered successfully',
            user: result.rows[0]
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: 'Server error'
        });
    }
};

// DEACTIVATE USER
const deactivateUser = async (req, res) => {

    try {

        const { user_id } = req.params;

        await pool.query(
            `
            UPDATE users
            SET is_active = FALSE
            WHERE user_id = $1
            `,
            [user_id]
        );

        res.status(200).json({
            message: 'User deactivated'
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: 'Server error'
        });
    }
};


// LOGIN USER
const loginUser = async (req, res) => {

    try {

        console.log('BODY:', req.body);

        if (!req.body) {

            return res.status(400).json({
                error: 'Request body is missing'
            });
        }

        const { email, password } = req.body;


        // Find user

        const result = await pool.query(
            `
            SELECT *
            FROM users
            WHERE email = $1
            `,
            [email]
        );

        if (result.rows.length === 0) {

            return res.status(401).json({
                error: 'Invalid credentials'
            });
        }

        const user = result.rows[0];

        if (user.is_active === false) {

    return res.status(403).json({
        error: 'Account disabled'
    });
}
        // Compare passwords

        const validPassword = await bcrypt.compare(
            password,
            user.password
        );

        if (!validPassword) {

            return res.status(401).json({
                error: 'Invalid credentials'
            });
        }

        // Generate token

        const token = jwt.sign(
    {
        user_id: user.user_id,
        full_name: user.full_name,
        role_id: user.role_id,
        facility_id: user.facility_id
    },
            process.env.JWT_SECRET,
            {
                expiresIn: '1d'
            }
        );

        res.status(200).json({
            message: 'Login successful',
            token
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: 'Server error'
        });
    }
};

const getUsers = async (req, res) => {

    try {

        const result = await pool.query(
            `
            SELECT

                u.user_id,
                u.full_name,
                u.email,
                u.role_id,
                u.facility_id,
                f.facility_name

            FROM users u

            LEFT JOIN facilities f
            ON u.facility_id = f.facility_id

            ORDER BY u.user_id
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
    registerUser,
    loginUser,
    getUsers,
    deactivateUser
};