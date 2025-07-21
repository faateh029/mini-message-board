 import { loadMessages, saveMessages } from '../models/messageModel.js';

export const renderIndex = async (req, res) => {
    const messages = await loadMessages();
  res.render('index', { messages });
}

export const renderForm= (req , res)=>{
    res.render('form');
}

export const addNewMessage = async (req, res) => {
  const messages = await loadMessages();
  const user = req.body.user;
  const text = req.body.text;
  const added = new Date();
  const id = Math.random().toString(36).substring(2);
  messages.push({ user, text, added, id });
  await saveMessages(messages);
  res.redirect('/');
}


export const msgDetails = async (req, res) => {
    const messages = await loadMessages();
  const id = req.params.id;
  const msg = messages.find((msg) => msg.id === id);
  if (!msg) {
    return res.status(404).send('Message not found');
  }
  res.render('singleMsg', { message: msg });
}


export const editMsg = async (req, res) => {
    const messages = await loadMessages();
  const id = req.params.id;
  const msg = messages.find((msg) => msg.id === id);
  if (!msg) {
    return res.status(404).send('Message not Found');
  }
  res.render('edit', { message: msg });
}

export const submitEdit = async (req, res) => {
    const messages = await loadMessages();
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
}


export const deleteMsg = async (req, res) => {
    const messages = await loadMessages();
  const id = req.params.id;
  const index = messages.findIndex(msg => msg.id === id);
  if (index !== -1) messages.splice(index, 1);
  await saveMessages(messages);
  res.redirect('/');
}