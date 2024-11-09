const express = require('express');
const app = express();
const factorialRoutes = require('./routes/ass3route');

app.use('/api', factorialRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
