import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'citizen' | 'champion' | 'admin' | 'worker';

export interface User {
  email: string;
  role: UserRole;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Demo users
const DEMO_USERS: Record<string, User> = {
  'citizen@demo.com': { email: 'citizen@demo.com', role: 'citizen', name: 'Rajesh Kumar' },
  'champion@demo.com': { email: 'champion@demo.com', role: 'champion', name: 'Priya Singh' },
  'admin@demo.com': { email: 'admin@demo.com', role: 'admin', name: 'Amit Sharma' },
  'worker@demo.com': { email: 'worker@demo.com', role: 'worker', name: 'Suresh Yadav' },
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for existing session
    const savedUser = localStorage.getItem('wasteManagementUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Demo authentication - check credentials
    if (DEMO_USERS[email] && password === '1234') {
      const userData = DEMO_USERS[email];
      setUser(userData);
      localStorage.setItem('wasteManagementUser', JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('wasteManagementUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};