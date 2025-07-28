import express from 'express';
import messageRouter from './routes/messageRoute.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;

const app = express();


app.use(express.static(path.join(__dirname, "Public")));
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/', messageRouter);






app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});