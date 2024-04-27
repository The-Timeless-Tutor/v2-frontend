import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const signIn = async (data) => {
        // Perform authentication and store the received token
        // Assuming data includes the tokens and user details
        setUser(data);
        // Set session might manage localStorage or cookies as per requirement
        setSession(data);
    };

    const signOut = () => {
        // Clear user session and user state
        setUser(null);
        clearSession();
    };

    return (
        <AuthContext.Provider value={{ user, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
