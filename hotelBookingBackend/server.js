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

app.use(cors());
// Body parser
app.use(express.json());
app.use(mongoSanitize());
app.use(cookieParser());
app.use(helmet());
app.use(xss());
const limiter=rateLimit({
    windowsMs:1*60*1000,
    max: 1000
    });
app.use(limiter);
app.use(hpp());



// Route files
const hotels = require('./routes/hotels');
const bookings = require('./routes/bookings');

app.use('/api/v1/hotels', hotels);
const auth = require('./routes/auth');
app.use('/api/v1/auth', auth);
app.use('/api/v1/bookings', bookings);



const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log('Server running in ', process.env.NODE_ENV, ' mode on port ', PORT));

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    // Close server & exit process
    server.close(() => process.exit(1));
});
