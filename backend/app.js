import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
const app = express();


app.use(express.json())
// app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"));
app.use(cookieParser());







var allowlist = process.env.WHITELIST_URL;
const isProduction = process.env.PRODUCTION == 'true';

var corsOptions = isProduction ? {
    origin: allowlist,
    credentials: true,
    optionsSuccessStatus: 200,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
} : {
    origin: 'http://localhost:4321',
    credentials: true
};


app.use(cors(corsOptions))


// Fix the error by trusting the proxy
app.set('trust proxy', true);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
});

app.use(limiter);



import UserRouter from './Routes/users/users.js';
import ReportsRouter from './Routes/reports/reports.js';
import AdminsRouter from './Routes/admin/admin.js';
app.use('/users', UserRouter);
app.use('/reports', ReportsRouter);
app.use('/admin', AdminsRouter);


app.get('/', (req, res) => {

    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>CURAJ Lost & Found Server APIs</title>
          <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                text-align: center;
                padding: 50px;
            }
            h1 {
                color: #333;
            }
          </style>
      </head>
      <body>
          <h1>Lost & Found CURAJ</h1>
          <p>!! This is a Landing page for Lost & Found Server !!</p>
          <a href="https://curajlf.vercel.app/">Go to Lost & Found CURAJ</a>
      </body>
      </html>
    `);
});


export default app;