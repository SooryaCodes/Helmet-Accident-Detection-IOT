import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define types for User and Context data
interface User {
    _id: string;
    name: string;
    email: string;
}

interface UserContextType {
    user: User | null;
    setUserData: (user: User) => void;
    clearUserData: () => void;
}

// Create context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Create a custom hook to use user data
export const useUserContext = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUserContext must be used within a UserProvider');
    }
    return context;
};

// UserContext provider
interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    const setUserData = (user: User) => {
        setUser(user);
    };

    const clearUserData = () => {
        setUser(null);
    };

    return (
        <UserContext.Provider value= {{ user, setUserData, clearUserData }
}>
    { children }
    </UserContext.Provider>
  );
};
