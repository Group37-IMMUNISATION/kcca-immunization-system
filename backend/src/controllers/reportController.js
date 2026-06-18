const PDFDocument = require('pdfkit');
const pool = require('../config/db');

const generateCoverageReport = async (req, res) => {

    try {

        const result = await pool.query(
            `
            SELECT
                vaccine_name,
                dose_number,
                COUNT(i.immunization_id) AS administered
            FROM vaccines v
            LEFT JOIN immunizations i
            ON v.vaccine_id = i.vaccine_id
            GROUP BY
                v.vaccine_id,
                vaccine_name,
                dose_number
            ORDER BY vaccine_name
            `
        );

        const doc = new PDFDocument();

        res.setHeader(
            'Content-Type',
            'application/pdf'
        );

        res.setHeader(
            'Content-Disposition',
            'attachment; filename=CoverageReport.pdf'
        );

        doc.pipe(res);

        doc.fontSize(20)
           .text(
               'KCCA Vaccine Coverage Report',
               { align: 'center' }
           );

        doc.moveDown();

        result.rows.forEach((row) => {

            doc.text(
                `${row.vaccine_name} Dose ${row.dose_number} : ${row.administered}`
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

module.exports = {
    generateCoverageReport
};