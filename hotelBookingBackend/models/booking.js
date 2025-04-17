const mongoose = require('mongoose');
const QRCode = require('qrcode');

const bookingSchema = new mongoose.Schema({
    bookingDate: {
        type: Date,
        required: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        required: true
    },
    hotel: {
        type: mongoose.Schema.ObjectId,
        ref: 'hotel',
        required: true
    },
    qrCodeImage: {
        type: String // base64 PNG
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// ก่อนบันทึก booking → สร้าง QR code
bookingSchema.pre('save', async function (next) {
    // ป้องกันไม่ให้สร้าง QR ใหม่ซ้ำเมื่อมีอยู่แล้ว
    if (this.qrCodeImage) return next();

    try {
        // URL
        const url = `http://localhost:3000/bookings/${this._id}`;
        const qrImage = await QRCode.toDataURL(url); // สร้าง QR code เป็น base64 image

        this.qrCodeImage = qrImage;
        next();
    } catch (err) {
        console.error("Error generating QR Code:", err);
        next(err);
    }
});

module.exports = mongoose.model('booking', bookingSchema);
