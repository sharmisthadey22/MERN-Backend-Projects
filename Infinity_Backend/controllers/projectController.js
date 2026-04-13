const Project = require('../models/Project');

// 1. Saare projects ko display karne ke liye API
exports.getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        res.status(200).json(projects);
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};

// 2. Naya project add karne ke liye (Admin ke liye)
exports.createProject = async (req, res) => {
    try {
        const newProject = new Project(req.body);
        const savedProject = await newProject.save();
        res.status(201).json(savedProject);
    } catch (err) {
        res.status(400).json({ message: "Data invalid", error: err.message });
    }
};





// const Project = require('../models/Project');
// const cloudinary = require('../config/cloudinary');

// // 1. Saare projects dikhane ke liye (Purana wala)
// exports.getAllProjects = async (req, res) => {
//     try {
//         const projects = await Project.find().sort({ createdAt: -1 });
//         res.status(200).json(projects);
//     } catch (err) {
//         res.status(500).json({ message: "Server Error", error: err.message });
//     }
// };

// // 2. Naya project add karne ke liye (Naya photo wala logic)
// exports.createProject = async (req, res) => {
//     try {
//         let imageUrls = [];
        
//         // Agar frontend se photos aayi hain, to Cloudinary par upload karo
//         if (req.files) {
//             for (const file of req.files) {
//                 const result = await cloudinary.uploader.upload(file.path, {
//                     folder: 'infinity_projects'
//                 });
//                 imageUrls.push(result.secure_url);
//             }
//         }

//         const newProject = new Project({
//             ...req.body,
//             images: imageUrls // Saari photos ke links yahan save honge
//         });

//         await newProject.save();
//         res.status(201).json({ success: true, data: newProject });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };