import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('traveloop_user');
    const token = localStorage.getItem('traveloop_token');

    if (savedUser && token) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // MOCK LOGIN (TEMPORARY FRONTEND AUTH)
  const login = async (email: string, password: string) => {
    const mockUser = {
      id: '1',
      email,
      name: 'Vishnu',
    };

    setUser(mockUser);

    localStorage.setItem('traveloop_token', 'mock-token');
    localStorage.setItem('traveloop_user', JSON.stringify(mockUser));
  };

  // MOCK SIGNUP (TEMPORARY FRONTEND AUTH)
  const signup = async (email: string, password: string, name: string) => {
    const mockUser = {
      id: '1',
      email,
      name,
    };

    setUser(mockUser);

    localStorage.setItem('traveloop_token', 'mock-token');
    localStorage.setItem('traveloop_user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('traveloop_token');
    localStorage.removeItem('traveloop_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}