import express from 'express';
import { promises as fs } from 'fs';
import {IMessage} from '../types';

const messagesRouter = express.Router();
const path = './messages';

messagesRouter.post('/', async (req, res) => {
  const message = req.body.message;

  if (!message) {
    return res.sendStatus(404);
  }

  const datetime = new Date().toISOString();
  const filename = `${path}/${datetime}.txt`;
  const savedMessage: IMessage = { message, date: datetime };

  try {
    await fs.writeFile(filename, JSON.stringify(savedMessage));
    res.send(savedMessage);
  } catch (e) {
    console.error(e);
  }
});

messagesRouter.get('/', async (req, res) => {
  try {
    const files = await fs.readdir(path);
    const messageFiles = files.slice(-5).reverse();
    const messages: IMessage[] = [];

    for (const file of messageFiles) {
      const filePath = `${path}/${file}`;
      const fileContents = await fs.readFile(filePath);
      const result = JSON.parse(fileContents.toString());

      messages.push(result);
    }

    res.send(messages);
  } catch (e) {
    console.error(e);
  }
});

export default messagesRouter;