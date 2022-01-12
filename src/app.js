require('dotenv').config();
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import http from 'http'
import routes from './router';

/**
 * 
 */
(async () => {
    const app = express();
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
    app.use(cors());
    app.use('/api', routes)
    try {
        await mongoose.connect(process.env.DB_URL, {});
    } catch (error) {
        return console.log(`Sorry you did not connect with database`)
    }
    const server = http.createServer(app);
    const port = process.env.PORT || 8000
    server.listen(port)
    .on('listening', () => console.log(`App is starting on port: ${port}`))
    .on('error', (err) =>
        console.log(`An error occured while starting server`, err)
    )
})();