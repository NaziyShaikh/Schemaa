import React, { useState } from 'react';
import axios from 'axios';

const PostForm = ({ users, onPostAdded }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [userId, setUserId] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);
        try {
            const response = await axios.post('https://schemaa.onrender.com/posts', { title, content, userId });
            onPostAdded(response.data);
            setTitle('');
            setContent('');
            setUserId('');
            setSuccess('Post added successfully!');
        } catch (err) {
            if (err.response && err.response.data && err.response.data.error) {
                setError(err.response.data.error);
            } else {
                setError('Failed to add post');
            }
        } finally {
            setLoading(false);
        }
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
            <button type="submit" disabled={loading}>
                {loading ? 'Adding...' : 'Add Post'}
            </button>
            {error && <div className="text-danger mt-2">{error}</div>}
            {success && <div className="text-success mt-2">{success}</div>}
        </form>
    );
};

export default PostForm;
