const express = require('express');
const cors = require('cors');

const childRoutes = require('./routes/childRoutes');
const immunizationRoutes = require('./routes/immunizationRoutes');
const authRoutes = require('./routes/authRoutes');
const vaccineRoutes = require('./routes/vaccineRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const stockRoutes = require('./routes/stockRoutes');
const facilityRoutes =require('./routes/facilityRoutes');
const pdfRoutes =require('./routes/pdfRoutes');
const reportRoutes =require('./routes/reportRoutes');
const auditRoutes =require('./routes/auditRoutes');

const app = express();



app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/vaccines', vaccineRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/stock', stockRoutes);
app.use('/api/facilities',facilityRoutes);
app.use('/api/pdf', pdfRoutes);
app.use('/api/reports',reportRoutes);
app.use('/api/audit',auditRoutes);

app.get('/', (req, res) => {
    res.send('KCCA Immunization System API Running...');
});

app.use('/api/children', childRoutes);

app.use('/api/immunizations', immunizationRoutes);

module.exports = app;