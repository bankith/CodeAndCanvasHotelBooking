const express = require('express');
const { getbookings, getbooking, addbooking, updatebooking, deletebooking } = require('../controllers/bookings');

const router = express.Router({ mergeParams: true });
const {protect, authorize} = require('../middleware/auth');

router.route('/').get(protect, getbookings).post(protect, authorize('admin', 'user'), addbooking);
router.route('/:id')
.get(protect, getbooking)
.put(protect, authorize('admin', 'user'), updatebooking)
.delete(protect, authorize('admin', 'user'), deletebooking);

module.exports = router;
