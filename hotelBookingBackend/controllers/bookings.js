const booking = require("../models/booking")
const hotel = require("../models/hotel")

// @desc    Get all bookings
// @route   GET /api/v1/bookings
// @access  Public
exports.getbookings = async (req, res, next) => {
    let query;
    // General users can see only their bookings!
    if (req.user.role != 'admin') { // General users can see only their bookings!
        query = booking.find({ user: req.user.id }).populate({
            path: 'hotel',
            select: 'name address tel'
        });
    } else { // If you are an admin, you can see all bookings!
        
        if (req.params.hotelId) {
            console.log(req.params.hotelId);
            query = booking.find({ hotel: req.params.hotelId }).populate({
                path: 'hotel',
                select: 'name address tel'
            });
        } else {
            query = booking.find().populate({
                path: 'hotel',
                select: 'name address tel'
            });
        }
    }

    try {
        const bookings = await query;
        res.status(200).json({
            success: true,
            count: bookings.length,
            data: bookings
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Cannot find booking" });
    }
};


// @desc    Get single booking
// @route   GET /api/v1/bookings/:id
// @access  Public
exports.getbooking = async (req, res, next) => {
    try {
        const theBooking = await booking.findById(req.params.id).populate({
            path: 'hotel',
            select: 'name description tel address'
        });

        if (!theBooking) {
            return res.status(404).json({ success: false, message: 'No booking with the id of ' + req.params.id });
        }

        res.status(200).json({
            success: true,
            data: theBooking
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Cannot find booking' });
    }
};


// @desc Add booking
// @route POST /api/v1/hotels/:hotelId/booking
// @access Private
exports.addbooking = async (req, res, next) => {
    try {
          // add user Id to req.body
            req.body.user = req.user.id;

            // Check for existed booking
            const existedbookings = await booking.find({ user: req.user.id });

            // If the user is not an admin, they can only create 3 booking.
            if (existedbookings.length >= 3 && req.user.role !== 'admin') {
                return res.status(400).json({
                success: false,
                message: `The user with ID ${req.user.id} has already made 3 bookings`
                });
            }


        req.body.hotel = req.params.hotelId;
        const theHotel = await hotel.findById(req.params.hotelId);

        if (!theHotel) {
            return res.status(404).json({ success: false, message: 'No hotel with the id of ' + req.params.hotelId });
        }

        const theBooking = await booking.create(req.body);
        res.status(200).json({
            success: true,
            data: theBooking
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Cannot create booking' });
    }
};

// @desc Update booking
// @route PUT /api/v1/bookings/:id
// @access Private
exports.updatebooking = async (req, res, next) => {
    try {
        let theBooking = await booking.findById(req.params.id);

        if (!theBooking) {
            return res.status(404).json({ success: false, message: 'No booking with the id of ' + req.params.id });
        }

        // Make sure user is the booking owner
        if (theBooking.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({
            success: false,
            message: `User ${req.user.id} is not authorized to update this booking`
            });
        }

        theBooking = await booking.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            data: theBooking
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Cannot update booking' });
    }
};


// @desc    Delete booking
// @route   DELETE /api/v1/bookings/:id
// @access  Private
exports.deletebooking = async (req, res, next) => {
    try {


      const theBooking = await booking.findById(req.params.id);
      if (!theBooking) {
        return res.status(404).json({ success: false, message: `No booking with the id of ${req.params.id}` });
      }

      if (theBooking.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return res.status(401).json({
        success: false,
        message: `User ${req.user.id} is not authorized to delete this booking`
        });
    }
  
      await booking.deleteOne();
      res.status(200).json({ success: true, data: {} });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, message: "Cannot delete booking" });
    }
  };
  