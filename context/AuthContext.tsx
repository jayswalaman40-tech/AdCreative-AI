
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User, AdCreative } from '../types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string) => void;
  signup: (email: string) => void;
  logout: () => void;
  updateUser: (updatedUser: User) => void;
  addCreativeToHistory: (creative: AdCreative) => void;
  upgradePlan: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('adcreative-user');
      if (storedUser) {
        let parsedUser: User = JSON.parse(storedUser);
        
        // Check if credits need to be reset
        const today = new Date().toISOString().split('T')[0];
        const lastReset = new Date(parsedUser.lastCreditReset).toISOString().split('T')[0];

        if (today !== lastReset && parsedUser.plan === 'free') {
          parsedUser = {
            ...parsedUser,
            credits: { remaining: 2, total: 2 },
            lastCreditReset: new Date().toISOString()
          };
          localStorage.setItem('adcreative-user', JSON.stringify(parsedUser));
        }
        setUser(parsedUser);
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem('adcreative-user');
    } finally {
      setLoading(false);
    }
  }, []);

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem('adcreative-user', JSON.stringify(updatedUser));
  };
  
  const login = (email: string) => {
    const storedUser = localStorage.getItem('adcreative-user');
     if (storedUser) {
        const parsedUser: User = JSON.parse(storedUser);
        if(parsedUser.email === email) {
            setUser(parsedUser);
        } else {
            // for simplicity, we'll just create a new user if email doesn't match
            signup(email);
        }
    } else {
        signup(email);
    }
  };

  const signup = (email: string) => {
    const newUser: User = {
      uid: `uid_${Date.now()}`,
      email: email,
      plan: 'free',
      credits: { remaining: 2, total: 2 },
      lastCreditReset: new Date().toISOString(),
      history: [],
    };
    updateUser(newUser);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('adcreative-user');
  };

  const addCreativeToHistory = (creative: AdCreative) => {
    if (user) {
      const updatedUser = {
        ...user,
        history: [creative, ...user.history],
      };
      updateUser(updatedUser);
    }
  };
  
  const upgradePlan = () => {
    if(user) {
      const updatedUser: User = {
        ...user,
        plan: 'pro',
        credits: { remaining: 1000, total: 1000 },
      };
      updateUser(updatedUser);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, updateUser, addCreativeToHistory, upgradePlan }}>
      {children}
    </AuthContext.Provider>
  );
};
