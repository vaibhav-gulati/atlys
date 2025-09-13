import React, { useState, useEffect } from 'react';
import PostEditor from '../components/PostEditor';
import Post from '../components/Post';
import { Post as PostType } from '../types';
import { generateId } from '../utils/helpers';
import { useAuth } from '../contexts/AuthContext';

const Feed: React.FC = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const mockPosts: PostType[] = [
      {
        id: '1',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        author: {
          id: '1',
          name: 'Theresa Webb',
          email: 'theresa@example.com',
          avatar: 'https://ui-avatars.com/api/?name=Theresa+Webb&background=random'
        },
        createdAt: new Date(Date.now() - 5 * 60 * 1000),
        emoji: '😊',
        likes: 12,
        comments: 3,
        shares: 1
      },
      {
        id: '2',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        author: {
          id: '2',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=random'
        },
        createdAt: new Date(Date.now() - 5 * 60 * 1000),
        emoji: '👍',
        likes: 8,
        comments: 2,
        shares: 0
      },
      {
        id: '3',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        author: {
          id: '3',
          name: 'Jane Doe',
          email: 'jane@example.com',
          avatar: 'https://ui-avatars.com/api/?name=Jane+Doe&background=random'
        },
        createdAt: new Date(Date.now() - 5 * 60 * 1000),
        emoji: '💀',
        likes: 15,
        comments: 5,
        shares: 2
      }
    ];
    setPosts(mockPosts);
  }, []);

  const handlePostCreated = (content: string) => {
    if (!user) return;
    const newPost: PostType = {
      id: generateId(),
      content,
      author: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar
      },
      createdAt: new Date(),
      emoji: '😊',
      likes: 0,
      comments: 0,
      shares: 0
    };
    setPosts(prevPosts => [newPost, ...prevPosts]);
  };

  return (
    <div className="feed-container">
      <PostEditor onPostCreated={handlePostCreated} />
      <div>
        {posts.map(post => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Feed; 