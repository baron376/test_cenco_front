import env from "react-dotenv";
import axios from 'axios'

const SecuriryServices = {
    BaseUrl : env.REACT_APP_BASE_URL,
    ApiTokenKey : env.REACT_APP_API_TOKEN_KEY,
    data : [],
    api : axios.create({
        baseURL: env.REACT_APP_BASE_URL,
        withCredentials: true,
        headers: {
            'AuthorizationFrontWeb': env.REACT_APP_API_TOKEN_KEY, 
             Authorization: `Bearer ${localStorage.getItem('ccscts')}`
        }
    }),
    /*MODULO USUARIO */
    getUsersActive : async function(){
        let data  = '';
        try{
            await  this.api.get(`/api/get/user_actives`).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    getUsersInactive : async function(){
        let data  = '';
        try{
            await  this.api.get(`/api/get/user_inactive`).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    getUsersDeleted : async function(){
        let data  = '';
        try{
            await  this.api.get(`/api/get/user_deteted`).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    storeUser : async function(ojbUser){
        let data  = '';
        try{
            await  this.api.post(`/api/post/create_user` , ojbUser).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    updateUser : async function(ojbUser, idUser){
    let data  = '';
        try{
            await  this.api.put( `/api/post/update_user/${idUser}` , ojbUser).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    getUsersDetail : async function(userId){
        let data  = '';
        try{
            await  this.api.get(`/api/get/edit_user/${userId}`).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    desactivateUser : async function(idUser){
    let data  = '';
        try{
            await  this.api.put(`/api/post/desactivate/${idUser}`).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    activateUser : async function(idUser){
        let data  = '';
        try{
            await  this.api.put(`/api/post/activate/${idUser}`).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    deleteUser : async function(idUser){
        let data  = '';
            try{
                await  this.api.delete(`/api/post/delete_user/${idUser}`).then(response => {
                    data = response;
                })
            this.data = data.data;
            }catch(error){
                data = error;
                this.data.error = error;
            }
            return data;
    },
    restoreUser : async function(idUser){
        let data  = '';
            try{
                await  this.api.put(`/api/post/restore/${idUser}`).then(response => {
                    data = response;
                })
            this.data = data.data;
            }catch(error){
                data = error;
                this.data.error = error;
            }
            return data;
    },
    getDataUser : async function(idUser){
        let data  = '';
            try{
                await  this.api.get(`/api/info_user`).then(response => {
                    data = response;
                })
            this.data = data.data;
            }catch(error){
                data = error;
                this.data.error = error;
            }
            return data;
    },
    getToken : async function(idUser){
        let data  = '';
            try{
                await  this.api.get(`/logInit`).then(response => {
                    data = response;
                })
            this.data = data.data;
            }catch(error){
                data = error;
                this.data.error = error;
            }
            return data;
    },
    /*FIN MODULO USUARIO */
    /*MOdulo ROLES */
    getRoles : async function(){
        let data  = '';
        try{
            await  this.api.get(`/api/get/roles`).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    getRolesActive : async function(){
        
        let data  = '';
        try{
            await  this.api.get(`/api/get/roles_actives`).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    getRolesInactive : async function(){
        let data  = '';
        try{
            await  this.api.get(`/api/get/roles_inactive`).then(response => {
                data = response;
            })
            this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;

    },
    getRolesDeleted : async function(){
        let data  = '';
        try{
            await  this.api.get(`/api/get/roles_deleted`).then(response => {
                data = response;
            })
            this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    getRolesDetail : async function(rolId){
        let data  = '';
        try{
            await  this.api.get(`/api/get/edit_rol/${rolId}`).then(response => {
                data = response;
            })
            this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    getPermissions : async function(){
        let data  = '';
        try{
            await  this.api.get(`/api/get/permission`).then(response => {
                data = response;
            })
            this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;

    },
    storeRol : async function(ojbRol){
        let data  = '';
        try{
            await  this.api.post(`/api/post/create_rol`, ojbRol).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    desactivateRol : async function(idRol){
        let data  = '';
        try{
            await  this.api.put( `/api/post/rol_desactivate/${idRol}`).then(response => {
                data = response;
            })
            this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    getRolDetail : async function(rolId){
        let data  = '';
        try{
            await  this.api.get(`/api/get/edit_rol/${rolId}`).then(response => {
                data = response;
            })
            this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    deleteRol : async function(idRol){
        let data  = '';
        try{
            await  this.api.delete( `/api/post/delete_rol/${idRol}`).then(response => {
                data = response;
            })
            this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    updateRoles : async function(ojbRol, idRol){
        let data  = '';
        try{
            await  this.api.put( `/api/post/update_rol/${idRol}`, ojbRol).then(response => {
                data = response;
            })
            this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    restoreRol : async function(idRol){
        let data  = '';
        try{
            await  this.api.put( `/api/post/restore_rol/${idRol}`).then(response => {
                data = response;
            })
            this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;

    },
    activateRol : async function(idRol){
        let data  = '';
        try{
            await  this.api.put( `/api/post/rol_activate/${idRol}`).then(response => {
                data = response;
            })
            this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    /*FIN MODULO ROLES */
}
export default SecuriryServices;