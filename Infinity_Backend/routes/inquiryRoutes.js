const express = require('express');
const router = express.Router();
const Inquiry = require('../models/Inquiry');

router.post('/contact', async (req, res) => {
    try {
        const newInquiry = new Inquiry(req.body);
        await newInquiry.save();
        res.status(200).json({ success: true, message: "Inquiry Saved!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;