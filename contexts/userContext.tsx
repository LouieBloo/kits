import React, { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

interface UserContextType {
    user: {
        username: string;
        token: string;
    };
    login: (username: string) => boolean;
    logout: () => void;
    isAuthenticated: () => string | undefined;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        username: '',
        token: ''
    });


    //normally this will hit the login endpoint, just return our hard coded token for the demo
    const login = (username:string) => {
        const fetchedToken = '_-b_bxeL.frYxt484gKwKNYksJt6xYjD5';

        //set our cookie so our api service can use it
        Cookies.set('userToken', fetchedToken, { expires: 7 });
        Cookies.set('username', username, { expires: 7 }); 

        setUser({
            username: username,
            token: fetchedToken
        });

        //usually return something more meaningful such as errors or success
        return true;
    };

    const logout = () => {
        Cookies.remove('userToken');
        Cookies.remove('username');

        setUser({
            username: '',
            token: ''
        });
    };

    const isAuthenticated = () => {
        return user.token || Cookies.get('userToken');
    }

    //grab any cookies and set our user state
    useEffect(() => {
        const token = Cookies.get('userToken');
        const username = Cookies.get('username');

        if (token && username) {
            setUser({
                username: username,
                token: token
            });
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, login, logout, isAuthenticated }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
