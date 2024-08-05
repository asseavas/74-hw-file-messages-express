import express from 'express';
import { promises as fs } from 'fs';

const messagesRouter = express.Router();
const path = './messages';

messagesRouter.post('/', async (req, res) => {
  const message = req.body.message;

  if (!message) {
    return res.sendStatus(404);
  }

  const datetime = new Date().toISOString();
  const filename = `${path}/${datetime}.txt`;
  const savedMessage = { message, date: datetime };

  try {
    await fs.writeFile(filename, JSON.stringify(savedMessage));
    res.send(savedMessage);
  } catch (e) {
    console.error(e);
  }
});

export default messagesRouter;