import React, { useState } from 'react';
import axios from 'axios';

const PostForm = ({ users, onPostAdded }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [userId, setUserId] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post('http://localhost:5000/posts', { title, content, userId });
        onPostAdded(response.data);
        setTitle('');
        setContent('');
        setUserId('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            <textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} required />
            <select value={userId} onChange={(e) => setUserId(e.target.value)} required>
                <option value="">Select User</option>
                {users.map(user => (
                    <option key={user._id} value={user._id}>{user.name}</option>
                ))}
            </select>
            <button type="submit">Add Post</button>
        </form>
    );
};

export default PostForm;
