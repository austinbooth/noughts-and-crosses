import express from 'express';

const app = express();
const PORT = 9090;
app.get('/', (req, res) => res.send('Noughts and crosses game server'));
app.listen(PORT, () => {
  console.log(`[server]: Server is running at https://localhost:${PORT}`);
});