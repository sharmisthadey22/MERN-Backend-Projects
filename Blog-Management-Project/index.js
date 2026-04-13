import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3000;

// Database Connection
mongoose.connect('mongodb://localhost:27017/blogDB')
    .then(() => console.log("Database Connected Successfully!"))
    .catch(err => console.log("Error:", err));

// Schema aur Model
const blogSchema = new mongoose.Schema({
    title: String,
    content: String,
    author: String
});
const Blog = mongoose.model('Blog', blogSchema);

// Middleware
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// --- ROUTES ---

// 1. Home Page
app.get('/', (req, res) => {
    res.render('home');
});

// 2. Add Blog Form dikhane ke liye
app.get('/add-blog', (req, res) => {
    res.render('addBlog');
});

app.post('/add-blog', async (req, res) => {
    try {
        const { title, content, author } = req.body;
        const newBlog = new Blog({ title, content, author });
        await newBlog.save();
        res.redirect('/blogs');
    } catch (error) {
        res.status(500).send("Save nahi ho paya!");
    }
})


// 3. Form se data Database mein save karne ke liye
app.post('/add-blog', async (req, res) => {
    try {
        const { title, content, author } = req.body;
        const newBlog = new Blog({ title, content, author });
        await newBlog.save();
        res.redirect('/blogs');
    } catch (error) {
        res.status(500).send("Save nahi ho paya!");
    }
});

// 4. Saare blogs dikhane ke liye
app.get('/blogs', async (req, res) => {
    const allBlogs = await Blog.find();
    res.render('blogs', { blogs: allBlogs });
});

// 5. Delete karne ke liye
app.get('/delete/:id', async (req, res) => {
    try {
        await Blog.findByIdAndDelete(req.params.id);
        res.redirect('/blogs');
    } catch (error) {
        res.status(500).send("Delete nahi hua!");
    }
});

// 404 Page (Sabse niche rakhein)
app.use((req, res) => {
    res.status(404).render('404');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});