const express = require('express');
const app = express();
const fibonacciRoutes = require('./routes/ass1route');  // Corrected path

app.use('/api', fibonacciRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
