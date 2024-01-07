const accountSid = 'AC6a9daf79d9a01cb2499f732adba298c5';
const authToken = 'f723349a790c615be5cf83cd525d276a';
import twilio from 'twilio';

const client = twilio(accountSid, authToken);

client.messages
    .create({
        body: 'test test',
        from: '+447893941852',
        to: "+447720761143",
    })
    .then(message => console.log(message.sid))
  .catch((error) => console.error(error));