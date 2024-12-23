  
//import router from 'next/router'
import Cookies from 'js-cookie'
import cookie from 'cookie'
import env from "react-dotenv";

export const isLoggedIn = (reqCookies = null) => {
    // if we don't have request cookies, get the cookie from client
    if (!reqCookies) {
        return !! Cookies.get('twj_auth_cookie')
    }

    // otherwise get cookie from server
    return !! cookie.parse(reqCookies).twj_auth_cookie
}

export const logIn = (history) => {
    const baseURL= env.REACT_APP_BASE_URL
    Cookies.set('twj_auth_cookie', true, {expires: 86400, sameSite: 'lax'})
    /* window.location.replace("http://localhost:8000/saml2/mzzo/login"); */
    window.location.replace(`${baseURL}/saml2/mzzo/login`);
    //history.push("/Init");
}
export const logInPro = (history) => {
    const baseURL= env.REACT_APP_BASE_URL
    Cookies.set('twj_auth_cookie', true, {expires: 86400, sameSite: 'lax'})
    /* window.location.replace("http://localhost:8000/saml2/mzzo/login"); */
    /*window.location.replace(`${baseURL}/saml2/mzzo/login`);*/
   history.push("/Init");
}

export const logOut = (history) => {
    if (typeof window !== 'undefined') {
        // remove logged in user's cookie and redirect to login page
        Cookies.remove('twj_auth_cookie', {expires: 86400, sameSite: 'lax'})
        history.push("/");
        //router.push('/LoginInt')
    }
}

export const hasPermission = (arrayPermission) => {
    try {
    let response= false;
    let UserAll = JSON.parse(localStorage.getItem('fulanotal'));
    let rolesAllUser = UserAll.roles;
    rolesAllUser.forEach(rol => {
        if(rol.administrador === 1){
            response = true;
        }
        if(rol.permisoss.length>0){
            rol.permisoss.forEach(permission => {
                arrayPermission.forEach(permissionRequired => {
                    if(Number(permission.cdg) === Number(permissionRequired)){
                        response = true;
                    }
                })
            });
        }
    });
    return response;
    }catch (error) {
        const baseURLFront= env.REACT_APP_BASE_URL_FRONT
        // return window.location.replace(`${baseURLFront}/`);
    }
 
}