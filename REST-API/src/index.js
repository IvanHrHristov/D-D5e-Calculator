import express from 'express';
import mongoose from 'mongoose';
import routes from './routes.js';
// import { corsMiddleware } from './middlewares/cors.js';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';

try {
    await mongoose.connect('mongodb://localhost:27017', {dbName:'dnd5e'});
    console.log('DB Connected!');
} catch (error) {
    console.log('Cannot connect to DB!');
}

const app = express();

// app.use(express.urlencoded({extended: false})); // for standard html forms
// app.use(corsMiddleware);
app.use(cors({
    origin: 'http://localhost:4200', 
    credentials: true, 
}));

app.use(express.json()); // for when the data from forms is send as a json
app.use(cookieParser());

app.use(routes);

app.listen(3030, () => console.log('Server is listening on http://localhost:3030'));