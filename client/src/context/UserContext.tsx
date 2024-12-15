import React, { createContext, useState, useContext, useEffect } from 'react';

// Define User interface
interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

// Define UserContextType
interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  clearUserData: () => void;
  isLoading: boolean; // Add isLoading to track loading state
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

// Define UserProvider component
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Track loading state

  // Load user from localStorage or session storage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false); // After checking, set isLoading to false
  }, []);

  // Function to clear user data from both context and localStorage
  const clearUserData = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token'); // Optionally remove token as well
  };

  // Store user data in localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser, clearUserData, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};
