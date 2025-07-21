import fs from 'fs/promises';
import path from 'path';
import { messagesFile } from '../app.js';
export async function loadMessages() {
  try {
    const data = await fs.readFile(messagesFile, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

export async function saveMessages(messages) {
  await fs.writeFile(messagesFile, JSON.stringify(messages, null, 2));
}