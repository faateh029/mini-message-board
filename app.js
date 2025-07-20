import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const messagesFile = path.join(__dirname, 'messages.json');

app.use(express.static(path.join(__dirname, "Public")));
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Helper functions
async function loadMessages() {
  try {
    const data = await fs.readFile(messagesFile, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

async function saveMessages(messages) {
  await fs.writeFile(messagesFile, JSON.stringify(messages, null, 2));
}

// Load messages on server start
let messages = await loadMessages();

app.get('/', (req, res) => {
  res.render('index', { messages });
});

app.get('/new', (req, res) => {
  res.render('form');
});

app.post('/new', async (req, res) => {
  const user = req.body.user;
  const text = req.body.text;
  const added = new Date();
  const id = Math.random().toString(36).substring(2);
  messages.push({ user, text, added, id });
  await saveMessages(messages);
  res.redirect('/');
});

app.get('/messages/:id', (req, res) => {
  const id = req.params.id;
  const msg = messages.find((msg) => msg.id === id);
  if (!msg) {
    return res.status(404).send('Message not found');
  }
  res.render('singleMsg', { message: msg });
});

app.get('/messages/:id/edit', (req, res) => {
  const id = req.params.id;
  const msg = messages.find((msg) => msg.id === id);
  if (!msg) {
    return res.status(404).send('Message not Found');
  }
  res.render('edit', { message: msg });
});

app.post('/messages/:id/edit', async (req, res) => {
  const id = req.params.id;
  const msg = messages.find((msg) => msg.id === id);
  if (!msg) {
    return res.status(404).send('Message not Found');
  }
  msg.user = req.body.user;
  msg.text = req.body.text;
  msg.added = new Date();
  await saveMessages(messages);
  res.redirect('/');
});

app.post('/messages/:id/delete', async (req, res) => {
  const id = req.params.id;
  const index = messages.findIndex(msg => msg.id === id);
  if (index !== -1) messages.splice(index, 1);
  await saveMessages(messages);
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});