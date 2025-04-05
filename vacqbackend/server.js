const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoSanitize=require('express-mongo-sanitize');
const helmet=require('helmet');
const {xss}=require('express-xss-sanitizer');
const rateLimit=require('express-rate-limit');
const hpp=require('hpp');


// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDB();


const app = express();
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const swaggerOptions={
    swaggerDefinition:{
        openapi: '3.0.0',
        info: {
            title: 'Library API',
            version: '1.0.0',
            description: 'A simple Express VacQ API'    
        },
        servers: [
            {
            url: 'http://localhost:3000/api/v1'
            }
        ],
    },
    apis:['./routes/*.js'],
};
const swaggerDocs=swaggerJsDoc(swaggerOptions);
app.use('/api-docs',swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use(cors());
// Body parser
app.use(express.json());
app.use(mongoSanitize());
app.use(cookieParser());
app.use(helmet());
app.use(xss());
const limiter=rateLimit({
    windowsMs:10*60*1000,//10 mins
    max: 100
    });
app.use(limiter);
app.use(hpp());



// Route files
const hospitals = require('./routes/hospitals');
const appointments = require('./routes/appointments');

app.use('/api/v1/hospitals', hospitals);
const auth = require('./routes/auth');
app.use('/api/v1/auth', auth);
app.use('/api/v1/appointments', appointments);



const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log('Server running in ', process.env.NODE_ENV, ' mode on port ', PORT));

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    // Close server & exit process
    server.close(() => process.exit(1));
});
