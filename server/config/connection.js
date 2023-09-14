import pkg from 'mongoose';
const { connect, connection } = pkg;

connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/petsDB');

export default connection;