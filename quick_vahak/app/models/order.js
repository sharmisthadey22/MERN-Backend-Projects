const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    itemImage: { type: String }, // Jo photo hum Multer se upload karenge
    itemDetails: { type: String, required: true },
    pickupAddress: { type: String, required: true },
    dropAddress: { type: String, required: true },
    status: { type: String, default: "Pending" }, // Pickup hua ya nahi
}, { timestamps: true });

module.exports = mongoose.models.Order || mongoose.model("Order", OrderSchema);