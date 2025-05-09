import { createContext, useContext, useState, useEffect } from 'react';

const USER_KEY = "user"

export interface User {
    id: string;
    name: string;
    email: string;
    avatar: string;
    signature: string;
}

interface UserContextProps {
    user: User | null;
    register: boolean | null;
    setUser: (user: User | null) => void;
    setRegister: (register: boolean) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);


export function UserProvider() {
    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
        const storedUser = localStorage.getItem(USER_KEY);
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);
    return user;
}

export function useUserContext() {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}
