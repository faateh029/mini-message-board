import express from 'express';
import { Router } from "express";
import { renderIndex , renderForm , addNewMessage , msgDetails, editMsg,submitEdit,deleteMsg, } from "../controllers/messageController.js";
const router = Router()
router.get('/',renderIndex);
router.get('/new', renderForm);
router.post('/new' , addNewMessage);
router.get('/messages/:id' , msgDetails);
router.get('/messages/:id/edit', editMsg);
router.post('/messages/:id/edit', submitEdit);
router.post('/messages/:id/delete', deleteMsg);
export default router;