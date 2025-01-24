import { createContext, useContext, useState, useEffect } from 'react';

const REGISTER_KEY = "register"

const USER_KEY = "register"

export interface User {
    name: string;
    email: string;
    avatar: string;
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

export function RegisterProvider() {
    const [register, setRegister] = useState<User | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem(REGISTER_KEY);
        if (storedUser) {
            setRegister(JSON.parse(storedUser));
        }
    }, []);
    return register;
}

export function useUserContext() {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}
