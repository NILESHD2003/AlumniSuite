import mongoose from 'mongoose';

const databaseConfig = {
  url: process.env.MONGODB_URL || 'mongodb://localhost:27017/Alumni_Suite_Data',
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};

export default function connectDatabase() {
  mongoose
    .connect(databaseConfig.url)
    .then(() => console.log('Connected to database'))
    .catch((error) => console.error('Error: ', error));
}
