const express = require('express');
const cors = require('cors');

const childRoutes = require('./routes/childRoutes');
const immunizationRoutes = require('./routes/immunizationRoutes');
const authRoutes = require('./routes/authRoutes');
const vaccineRoutes = require('./routes/vaccineRoutes');

const app = express();


app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/vaccines', vaccineRoutes);

app.get('/', (req, res) => {
    res.send('KCCA Immunization System API Running...');
});

app.use('/api/children', childRoutes);

app.use('/api/immunizations', immunizationRoutes);

module.exports = app;