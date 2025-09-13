import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useModal } from '../contexts/ModalContext';

interface PostEditorProps {
  onPostCreated: (content: string) => void;
}

const PostEditor: React.FC<PostEditorProps> = ({ onPostCreated }) => {
  const { isAuthenticated } = useAuth();
  const { openModal } = useModal();
  const [content, setContent] = useState('');
  const [charCount, setCharCount] = useState(0);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    setCharCount(newContent.length);
  };

  const handlePublish = () => {
    if (!isAuthenticated) {
      openModal('login');
      return;
    }
    if (content.trim()) {
      onPostCreated(content);
      setContent('');
      setCharCount(0);
    }
  };

  const handleInteraction = (action: string) => {
    if (!isAuthenticated) {
      openModal('login');
      return;
    }
    alert('function not implemented');
  };

  return (
    <div className="post-editor">
      <div className="toolbar">
        <div className="toolbar-left">
          <select className="toolbar-select">
            <option>Paragraph</option>
          </select>
          <button onClick={() => handleInteraction('bold')} className="toolbar-button">B</button>
          <button onClick={() => handleInteraction('italic')} className="toolbar-button">I</button>
          <button onClick={() => handleInteraction('underline')} className="toolbar-button">U</button>
          <button onClick={() => handleInteraction('unordered-list')} className="toolbar-button">•</button>
          <button onClick={() => handleInteraction('ordered-list')} className="toolbar-button">1.</button>
        </div>
        <div className="toolbar-right">
          <span className="char-count">{charCount}</span>
          <button onClick={() => handleInteraction('code')} className="toolbar-button">&lt;/&gt;</button>
          <button onClick={() => handleInteraction('delete')} className="toolbar-button">🗑️</button>
        </div>
      </div>
      <div className="post-input-container">
        <button onClick={() => handleInteraction('emoji')} className="emoji-button">😊</button>
        <textarea
          value={content}
          onChange={handleContentChange}
          placeholder="How are you feeling today?"
          className="post-textarea"
          rows={4}
        />
      </div>
      <div className="action-bar">
        <div className="action-buttons">
          <button onClick={() => handleInteraction('attachment')} className="action-button">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
          <button onClick={() => handleInteraction('voice')} className="action-button">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          </button>
          <button onClick={() => handleInteraction('camera')} className="action-button">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
        <button onClick={handlePublish} disabled={!content.trim()} className="publish-button">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default PostEditor; 