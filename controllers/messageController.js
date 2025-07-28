 import { loadMessages, saveMessages } from '../models/messageModel.js';

export const renderIndex = async (req, res) => {
    const messages = await pool.query(`SELECT * FROM messages`);
  res.render('index', { messages });
}

export const renderForm= (req , res)=>{
    res.render('form');
}

export const addNewMessage = async (req, res) => {
  const messages = await loadMessages();
  const user = req.body.user;
  const text = req.body.text;
  await pool.query(`INSERT INTO messages (username,text) VALUES ($1 , $2)` , [user,text])
  res.redirect('/');
}


export const msgDetails = async (req, res) => {
  const id = req.params.id;
  const msg = await pool.query(`SELECT * FROM messages WHERE id = ($1)` , [id])
  if (msg.rows.length===0) {
    return res.status(404).send('Message not found');
  }
  res.render('singleMsg', { message: msg.rows[0] });
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