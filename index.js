const express = require('express');
const app = express();
const port = process.env.APP_PORT ?? 3000;
const connectDB = require('./config/database');
const postRoutes = require('./routes/postRoutes');

connectDB().then(() => {
  console.log('Database ready');
}).catch(error => {
  console.log('Database error: ', error);
});

app.use(express.json());

app.use('/api/posts', postRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
