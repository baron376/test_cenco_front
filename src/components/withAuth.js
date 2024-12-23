import React from 'react'
import {isLoggedIn} from '../util/auth';
import redirectTo from '../util/redirectTo';

export default function withAuth(Component) {
    const AuthComponent = (props) => {
        return <Component {...props} />
    }

    AuthComponent.getInitialProps = (context) => {
        const isUserLoggedIn = isLoggedIn(context?.req?.headers?.cookie || '')
        console.log('resultado de estar logueado' , isUserLoggedIn);
        if (! isUserLoggedIn) {
            redirectTo('/loginInt', context)
        }

        return {user: {isLoggedIn: isUserLoggedIn}}
    }

    return AuthComponent
}
