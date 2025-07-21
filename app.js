import express from 'express';
import messageRouter from './routes/messageRoute.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { loadMessages, saveMessages } from './controllers/msgHelpers.js';
import fs from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
export const messagesFile = path.join(__dirname, 'messages.json');

app.use(express.static(path.join(__dirname, "Public")));
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));








app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});