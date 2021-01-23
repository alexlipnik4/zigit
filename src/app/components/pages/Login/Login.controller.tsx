/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useContext, FormEvent, useEffect} from 'react';
import { login } from '../../../common/services/AuthService';
import {AuthContext} from '../../../common/context/AuthContext';
import Login from './Login';
import { LoginInfo } from './Login.model';
import Cookies from 'js-cookie';

const LoginController = (props: any) => {
    const [userData, setUser] = useState<LoginInfo>({email: "a@a.com", password: "Al55555"});
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const authContext: any = useContext(AuthContext);

    const onChange = (e: FormEvent<HTMLInputElement>) => {
        const target = e.target as HTMLTextAreaElement;

        setUser({...userData, [target.name] : target.value})
    }

    const onSubmit = () => {
        setLoading(true);
        login(userData)
            .then(res => {
                const {personalDetails, token} = res[0];
                if(token) {
                    Cookies.set('access_token', token)
                    console.log(token, personalDetails);
                    authContext.setUser(personalDetails);
                    authContext.setIsAuthenticated(true);
                    props.history.push('/');
                }
                else {
                    setMessage(message);
                }
                setLoading(false);
            })
            .catch(e => console.error(e));
    }

    return (
        <Login 
            onSubmit={onSubmit}
            onChange={onChange}
            message={message}
            userData={userData}
            loading={loading}
        />
    )
    
}

export default LoginController;