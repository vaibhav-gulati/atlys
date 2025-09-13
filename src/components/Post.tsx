import React from 'react';
import { Post as PostType } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { useModal } from '../contexts/ModalContext';
import { formatTimeAgo } from '../utils/helpers';

interface PostProps {
  post: PostType;
}

const Post: React.FC<PostProps> = ({ post }) => {
  const { isAuthenticated } = useAuth();
  const { openModal } = useModal();

  const handleInteraction = (action: string) => {
    if (!isAuthenticated) {
      openModal('login');
      return;
    }
    alert('function not implemented');
  };

  return (
    <div className="post">
      <div className="post-header">
        <img
          src={post.author.avatar || `https://ui-avatars.com/api/?name=${post.author.name}&background=random`}
          alt={post.author.name}
          className="post-avatar"
        />
        <div className="post-user-info">
          <h3>{post.author.name}</h3>
          <p className="post-time">{formatTimeAgo(post.createdAt)}</p>
        </div>
      </div>
      <div className="post-content">
        <div className="post-content-container">
          {post.emoji && <span className="post-emoji">{post.emoji}</span>}
          <p className="post-text">{post.content}</p>
        </div>
      </div>
      <div className="post-actions">
        <button onClick={() => handleInteraction('like')} className="post-action like">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <span>{post.likes}</span>
        </button>
        <button onClick={() => handleInteraction('comment')} className="post-action comment">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span>{post.comments}</span>
        </button>
        <button onClick={() => handleInteraction('share')} className="post-action share">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
          </svg>
          <span>{post.shares}</span>
        </button>
      </div>
    </div>
  );
};

export default Post; 