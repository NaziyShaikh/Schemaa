const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.json());

console.log('MongoDB URI:', process.env.MONGODB_URI);
const mongoURI = 'mongodb+srv://naziya:wvUfuGUHt26GYPd@cluster0.oswlq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongoURI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));



const { User, Post } = require('./models');

app.post('/users', async (req, res) => {
    try {
        const { name, email } = req.body;
        const user = new User({ name, email });
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        console.error('Error creating user:', error);
        if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
        
            return res.status(400).json({ error: 'Email already exists' });
        }
        res.status(500).json({ error: 'Failed to create user' });
    }
});

app.delete('/posts/:id', async (req, res) => {
    try {
        const postId = req.params.id;
        console.log(`Attempting to delete post with id: ${postId}`);
        const deletedPost = await Post.findByIdAndDelete(postId);
        if (!deletedPost) {
            console.log(`Post with id ${postId} not found`);
            return res.status(404).json({ error: 'Post not found' });
        }
        console.log(`Post with id ${postId} deleted successfully`);
        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ error: 'Failed to delete post' });
    }
});

app.post('/posts', async (req, res) => {
    try {
        const { title, content, user } = req.body;
        const post = new Post({ title, content, user });
        await post.save();
        const populatedPost = await Post.findById(post._id).populate('user');
        res.status(201).json(populatedPost);
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ error: 'Failed to create post' });
    }
});

app.get('/test', (req, res) => {
    res.json({ message: 'Backend is working!' });
});

app.get('/', (req, res) => {
    res.send('Welcome to the backend API');
});


app.get('/posts', async (req, res) => {
    const posts = await Post.find({ user: { $ne: null } }).populate('user');
    res.json(posts);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.get('/users', async (req, res) => {
    const users = await User.find();
    res.json(users);
});
