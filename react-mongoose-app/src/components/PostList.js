import React from 'react';

const PostList = ({ posts, onDeletePost }) => {
    return (
        <div>
            {posts.map(post => (
                <div key={post._id} className="post mb-3 p-3 border rounded bg-light d-flex justify-content-between align-items-start">
                    <div>
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                        <strong>Author: {post.user ? post.user.name : 'Unknown author'}</strong>
                    </div>
                    <button
                        className="btn btn-danger btn-sm"
                        onClick={() => onDeletePost(post._id)}
                        aria-label={`Delete post titled ${post.title}`}
                        type="button"
                    >
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
};

export default PostList;
