'use client';

import { createContext, useContext } from 'react';

interface User {
  firstName?: string;
  lastName?: string;
  email?: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({
  children,
  isLoggedIn,
  user,
}: {
  children: React.ReactNode;
  isLoggedIn: boolean;
  user: User | null;
}) => {
  return (
    <AuthContext.Provider value={{ isLoggedIn, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    return { isLoggedIn: false, user: null };
  }
  return context;
};
