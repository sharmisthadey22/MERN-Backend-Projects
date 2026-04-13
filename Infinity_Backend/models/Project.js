const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    name: String,
    location: String,
    price: String,
    description: String,
    images: [String], // Array for multiple photos
    category: { type: String, enum: ['Residential', 'Commercial'] }
});

module.exports = mongoose.model('Project', ProjectSchema);