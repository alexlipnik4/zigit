import React, {createContext, useState, useEffect} from 'react';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export default ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        if(Cookies.get('access_token')) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    },[])

    return (
        <div style={{height: '100%'}}>
            { loading ? <h1>Loading</h1> : 
                <AuthContext.Provider value={{user, setUser, setIsAuthenticated, isAuthenticated, setLoading}}>
                    {children}
                </AuthContext.Provider>
            }
        </div>
    )

}