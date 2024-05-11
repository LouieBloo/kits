import React, { createContext, useContext, useState } from 'react';
import Cookies from 'js-cookie';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        username: '',
        token: '',
        isAuthenticated: false
    });

    //normally this will hit the login endpoint, just return our hard coded token for the demo
    const login = (username:string) => {
        const fetchedToken = '_-b_bxeL.frYxt484gKwKNYksJt6xYjD5';

        //set our cookie so our api service can use it
        Cookies.set('userToken', fetchedToken, { expires: 7 }); // Expires in 7 days

        //we should also set a cookie for the user so if they refresh the page they dont have to login again but we will skip that for now
        setUser({
            username: username,
            token: fetchedToken,
            isAuthenticated: true
        });

        //usually return something more meaningful such as errors or success
        return true;
    };

    const logout = () => {
        Cookies.remove('userToken');

        setUser({
            username: '',
            token: '',
            isAuthenticated: false
        });
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
