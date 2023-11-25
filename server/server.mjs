import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());
app.set('trust proxy', true);
app.use(cors());

app.get('/get-user-ip', (request, response) => {
  console.log('Received request for /get-user-ip');
  const userIpAddress = request.socket.remoteAddress || '';
  return response.json({ userIpAddress });
});

const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

