console.log('PDF CONTROLLER LOADED');

const PDFDocument = require('pdfkit');
const pool = require('../config/db');

const generateVaccinationCard = async (req, res) => {

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

        const child = childResult.rows[0];

        const vaccines = await pool.query(
            `
            SELECT

                v.vaccine_name,
                v.dose_number,
                i.vaccination_date

            FROM immunizations i

            JOIN vaccines v
            ON i.vaccine_id = v.vaccine_id

            WHERE i.child_id = $1

            ORDER BY i.vaccination_date
            `,
            [child_id]
        );

        const doc = new PDFDocument();

        res.setHeader(
            'Content-Type',
            'application/pdf'
        );

        res.setHeader(
            'Content-Disposition',
            `attachment; filename=VaccinationCard-${child.unique_code}.pdf`
        );

        doc.pipe(res);

        doc.fontSize(20)
           .text('KCCA IMMUNIZATION CARD', {
               align: 'center'
           });

        doc.moveDown();

        doc.fontSize(12);

        doc.text(
            `Name: ${child.first_name} ${child.last_name}`
        );

        doc.text(
            `Unique Code: ${child.unique_code}`
        );

        doc.text(
            `Gender: ${child.gender}`
        );

        doc.text(
            `Date of Birth: ${new Date(
                child.date_of_birth
            ).toLocaleDateString()}`
        );

        doc.moveDown();

        doc.fontSize(16)
           .text('Vaccination History');

        doc.moveDown();

        vaccines.rows.forEach(vaccine => {

            doc.fontSize(12).text(

                `${vaccine.vaccine_name} - Dose ${vaccine.dose_number} - ${new Date(
                    vaccine.vaccination_date
                ).toLocaleDateString()}`
            );
        });

        doc.moveDown();

        doc.text(
            `Generated: ${new Date().toLocaleDateString()}`
        );

        doc.end();

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: 'Server error'
        });
    }
};

console.log('PDF GENERATED SUCCESSFULLY');

module.exports = {
    generateVaccinationCard
};