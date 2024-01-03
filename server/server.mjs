import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';  // Added for parsing request bodies
import twilio from 'twilio';  // Added for Twilio integration

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));  // Added for parsing URL-encoded bodies
app.set('trust proxy', true);
app.use(cors());

const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Endpoint to get user's IP Address

app.get('/get-user-ip', (request, response) => {
  console.log('Received request for /get-user-ip');
  const userIpAddress = request.socket.remoteAddress || '';
  return response.json({ userIpAddress });
});

// Twilio API Endpoint

// Twilio credentials
const accountSid = 'AC6a9daf79d9a01cb2499f732adba298c5';
const authToken = 'f723349a790c615be5cf83cd525d276a';
const twilioPhoneNumber = '+447893941852';

const client = new twilio(accountSid, authToken);

// Endpoint to send verification code via SMS
app.post('/send-verification-code', async (req, res) => {
  const { phoneNumber } = req.body;

  try {
    // Generate a random verification code
    const verificationCode = Math.floor(1000 + Math.random() * 9000);

    // Send SMS using Twilio
    await client.messages.create({
      body: `Your verification code is: ${verificationCode}`,
      from: twilioPhoneNumber,
      to: phoneNumber,
    });

    res.json({ success: true, verificationCode });
  } catch (error) {
    console.error('Error sending SMS:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

