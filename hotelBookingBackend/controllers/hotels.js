const hotel = require("../models/hotel")
const booking = require("../models/booking")
// @desc    Get all hotels
// @route   GET /api/v1/hotels
// @access  Public
exports.gethotels = async (req, res, next) => {
  try {
    let query;

    // Copy req.query
    const reqQuery = { ...req.query };
    
    // Fields to exclude
    const removeFields = ['select', 'sort', 'page', 'limit'];

    // Loop over remove fields and delete them from reqQuery
    removeFields.forEach(param => delete reqQuery[param]);

    console.log(reqQuery);


    let queryStr = JSON.stringify(reqQuery);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

    query = hotel.find(JSON.parse(queryStr)).populate('bookings');


    // Select Fields
    if (req.query.select) {
        const fields = req.query.select.split(',').join(' ');
        query = query.select(fields);
    }

    // Sort
    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ');
        query = query.sort(sortBy);
    } else {
        query = query.sort('-createdAt');
    }


    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 25;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await hotel.countDocuments();

    query = query.skip(startIndex).limit(limit);

    const hotels = await query;


    const pagination = {};

    if (endIndex < total) {
        pagination.next = {
            page: page + 1,
            limit
        };
    }

    if (startIndex > 0) {
        pagination.prev = {
            page: page - 1,
            limit
        };
    }

    res.status(200).json({
        success: true,
        count: hotels.length,
        pagination,
        data: hotels
    });
  } catch (err) {
      res.status(400).json({ success: false });
  }
};

  
  // @desc    Get single hotel
  // @route   GET /api/v1/hotels/:id
  // @access  Public
  exports.gethotel = async (req, res, next) => {
    try {
        const newHotel = await hotel.findById(req.params.id);

        if (!newHotel) {
            return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: newHotel });
    } catch (err) {
        res.status(400).json({ success: false });
    }
};

  
  // @desc    Create new hotel
  // @route   POST /api/v1/hotels
  // @access  Private
  exports.createhotel = async (req, res, next) => {
    const newHotel = await hotel.create(req.body);

    res.status(201).json({
        success: true,
        data: newHotel
    });
};

  
  // @desc    Update hotel
  // @route   PUT /api/v1/hotels/:id
  // @access  Private
  exports.updatehotel = async (req, res, next) => {
    try {
        const theHotel = await hotel.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!theHotel) {
            return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: theHotel });
    } catch (err) {
        res.status(400).json({ success: false });
    }
};

  
  // @desc    Delete hotel
  // @route   DELETE /api/v1/hotels/:id
  // @access  Private
  exports.deletehotel = async (req, res, next) => {
    try {
        const theHotel = await hotel.findById(req.params.id);

        if (!theHotel) {
            return res.status(404).json({ success: false, message: 'hotel not found with id of ' + req.params.id });
        }

        await booking.deleteMany({ hotel: req.params.id });
        await hotel.deleteOne({ _id: req.params.id });

        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        res.status(400).json({ success: false, err: err.message });
    }
};

  