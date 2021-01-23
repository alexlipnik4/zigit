import Cookies from 'js-cookie';
import React, {useContext} from 'react';
import {Route, Redirect, Router} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';

const UnPrivateRoute = ({component: Component, ...rest}: any) => {
    const isAuthenticated = Cookies.get('access_token');
    return (
        <Route 
            {...rest}
            render={props => {
                if(isAuthenticated){
                    return <Redirect to={{pathname: '/', state: {from: props.location}}} />
                }
                return <Component {...props} />
            }}
        />
    )
}

export default UnPrivateRoute;
