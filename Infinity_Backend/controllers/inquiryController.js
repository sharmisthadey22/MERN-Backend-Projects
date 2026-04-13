const Inquiry = require('../models/Inquiry');
const nodemailer = require('nodemailer');

exports.submitInquiry = async (req, res) => {
    try {
        const { customerName, phone, email, message } = 
        req.body;
        
        // Database mein save karein
        const newInquiry = new Inquiry({ customerName, phone, email, message });
        await newInquiry.save();

        // Email Notification setup (Nodemailer)
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        let mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'infinityconstruction.7@gmail.com', // Jo aapke card par hai
            subject: 'Naya Customer Inquiry - Infinity Realtors App',
            text: `Naam: ${customerName}\nPhone: ${phone}
            \nEmail: ${email}\nMessage: ${message}`
        };

        transporter.sendMail(mailOptions);

        res.status(201).json({ success: true, message: "Inquiry received and email sent!" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};