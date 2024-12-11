// src/context/UserContext.tsx
import React, { createContext, useState, useContext } from 'react';

interface User {
  name: string;
  email: string;
}

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>; // Add setUser to the context type
  clearUserData: () => void; // Add clearUserData to the context type
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const clearUserData = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, clearUserData }}>
      {children}
    </UserContext.Provider>
  );
};
