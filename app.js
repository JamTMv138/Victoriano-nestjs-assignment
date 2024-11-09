const express = require('express');
const app = express();
const primeRoutes = require('./route/ass2route');

app.use('/api', primeRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
