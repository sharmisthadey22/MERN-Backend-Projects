const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db.js');
require('dotenv').config();

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

// Routes define karein
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/inquiry', require('./routes/inquiryRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
     console.log( `Server running on port http://localhost: ${PORT}`);    
});