import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserForm from './components/UserForm';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import './App.css';

const App = () => {
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('https://schemaa.onrender.com/users');
                setUsers(response.data);
                console.log('Fetched users:', response.data);
            } catch (error) {
                console.error('Failed to fetch users:', error);
                
            }
        };

        const fetchPosts = async () => {
            try {
                const response = await axios.get('https://schemaa.onrender.com/posts');
                setPosts(response.data);
                console.log('Fetched posts:', response.data);
            } catch (error) {
                console.error('Failed to fetch posts:', error);
                
            }
        };

        fetchUsers();
        fetchPosts();
    }, []);

    const handleUserAdded = (newUser) => {
        setUsers([...users, newUser]);
        console.log('User added:', newUser);
    };

    const handlePostAdded = (newPost) => {
        setPosts([...posts, newPost]);
        console.log('Post added:', newPost);
    };

    const handleDeletePost = async (postId) => {
        console.log(`Deleting post with id: ${postId}`);
        try {
            await axios.delete(`https://schemaa.onrender.com/posts/${postId}`);
            setPosts(posts.filter(post => post._id !== postId));
            console.log(`Post with id ${postId} deleted successfully`);
        } catch (error) {
            console.error('Failed to delete post:', error);
            alert('Failed to delete post');
        }
    };

    return (
        <div>
            <h1>Blog Application</h1>
            <UserForm onUserAdded={handleUserAdded} />
            <PostForm users={users} onPostAdded={handlePostAdded} />
            <PostList posts={posts} onDeletePost={handleDeletePost} />
        </div>
    );
};

export default App;
