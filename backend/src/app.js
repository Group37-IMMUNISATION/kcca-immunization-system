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
const activityRoutes = require("./routes/activityRoutes");

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
app.use("/api/activity", activityRoutes);

app.get('/', (req, res) => {
    res.send('KCCA Immunization System API Running...');
});

app.use('/api/children', childRoutes);

app.use('/api/immunizations', immunizationRoutes);

app.use("/api/activity",activityRoutes);

module.exports = app;