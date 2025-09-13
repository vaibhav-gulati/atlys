import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const TEST_USERS: Record<string, { name: string; avatar: string; password: string }> = {
  'demo@example.com': {
    name: 'Demo User',
    avatar: 'https://ui-avatars.com/api/?name=Demo+User&background=random',
    password: 'password123',
  },
  'test@user.com': {
    name: 'Test User',
    avatar: 'https://ui-avatars.com/api/?name=Test+User&background=random',
    password: 'testpass',
  },
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<void> => {
    if (TEST_USERS[email] && password === TEST_USERS[email].password) {
      const testUser: User = {
        id: email,
        name: TEST_USERS[email].name,
        email,
        avatar: TEST_USERS[email].avatar,
      };
      setUser(testUser);
      localStorage.setItem('user', JSON.stringify(testUser));
      return;
    }
    if (email && password) {
      const mockUser: User = {
        id: email,
        name: email.split('@')[0],
        email,
        avatar: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=random`
      };
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const signup = async (email: string, password: string, repeatPassword: string): Promise<void> => {
    if (password !== repeatPassword) {
      throw new Error('Passwords do not match');
    }
    if (TEST_USERS[email] && password === TEST_USERS[email].password) {
      const testUser: User = {
        id: email,
        name: TEST_USERS[email].name,
        email,
        avatar: TEST_USERS[email].avatar,
      };
      setUser(testUser);
      localStorage.setItem('user', JSON.stringify(testUser));
      return;
    }
    if (email && password) {
      const mockUser: User = {
        id: email,
        name: email.split('@')[0],
        email,
        avatar: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=random`
      };
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const logout = (): void => {
    setUser(null);
    localStorage.removeItem('user');
  };

  React.useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    signup,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 