import * as dotenv from 'dotenv';
dotenv.config();

const config = {
  dbHost: process.env.DB_HOST || 'localhost',
  dbUsername: process.env.DB_USERNAME || 'postgres',
  dbPassword: process.env.DB_PASSWORD || 'example',
  dbDatabase: process.env.DB_NAME || 'horacio-test-truenorth-db',
  jwtSecret: process.env.JWT_SECRET || 'secret_key_horacio',
  cryptoSecret: process.env.CRYPTO_SECRET_KEY || '',
  aws: {
    queueParams: {
      QueueUrl: 'https://sqs.us-east-1.amazonaws.com/435852282981/TruenorthQueue',
      AttributeNames: ['SentTimestamp'],
      MaxNumberOfMessages: 10,
      MessageAttributeNames: ['All'],
      VisibilityTimeout: 20,
      WaitTimeSeconds: 0,
    },
    credentials: {
      secretAccessKey: 'el9S5dAbpdoaRn/hFAGuQDtFNdbh8OLE3/qLsclR',
      accessKeyId: 'AKIAWK6WSBRSWK3YUZ6S',
    },
  },
};

export default config;
