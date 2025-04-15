const express = require('express');
const { gethotels, gethotel, createhotel, updatehotel, deletehotel } = require('../controllers/hotels');

const bookingRouter = require("./bookings");

const router = express.Router();
const {protect, authorize} = require('../middleware/auth');

router.use('/:hotelId/bookings/', bookingRouter);

router.route('/').get(gethotels).post(protect, authorize('admin'), createhotel);
router.route('/:id').get(gethotel).put(protect, authorize('admin'), updatehotel).delete(protect,authorize('admin'), deletehotel);

module.exports = router;