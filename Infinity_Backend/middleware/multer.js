const multer = require('multer');
const path = require('path');

// Storage configuration
const storage = multer.diskStorage({});

// File filter (sirf images allow karne ke liye)
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new Error('Sirf images allow hain!'), false);
    }
};

const upload = multer({ storage, fileFilter });
module.exports = upload;