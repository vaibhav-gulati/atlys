export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Post {
  id: string;
  content: string;
  author: User;
  createdAt: Date;
  emoji?: string;
  likes: number;
  comments: number;
  shares: number;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, repeatPassword: string) => Promise<void>;
  logout: () => void;
}

export interface ModalContextType {
  isModalOpen: boolean;
  modalType: 'login' | 'signup' | null;
  openModal: (type: 'login' | 'signup') => void;
  closeModal: () => void;
} 