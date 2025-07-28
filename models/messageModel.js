// import fs from 'fs/promises';
// import path from 'path';
// import { fileURLToPath } from 'url';
// //import { messagesFile } from '../app.js';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// export const messagesFile = path.join(__dirname, 'messages.json');
// export async function loadMessages() {
//   try {
//     const data = await pool.query(`SELECT * FROM messages`);
//     return JSON.parse(data);
//   } catch (err) {
//     return [];
//   }
// }

// export async function saveMessages(messages) {
//   await fs.writeFile(messagesFile, JSON.stringify(messages, null, 2));
// }