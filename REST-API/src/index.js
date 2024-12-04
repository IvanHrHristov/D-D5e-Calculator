import express from 'express';
import mongoose from 'mongoose';
import routes from './routes.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config';

try {
    await mongoose.connect('mongodb://localhost:27017', {dbName:'dnd5e'});
    console.log('DB Connected!');
} catch (error) {
    console.log('Cannot connect to DB!');
}

const app = express();

app.use(cors({
    origin: 'http://localhost:4200', 
    credentials: true, 
}));

app.use(express.json());
app.use(cookieParser());

app.use(routes);

app.listen(3030, () => console.log('Server is listening on http://localhost:3030'));