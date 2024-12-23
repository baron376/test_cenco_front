import env from "react-dotenv";
import axios from 'axios'

const ProveedorServices = {
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
            await  this.api.get(`/api/get/proveedor/user_actives`).then(response => {
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
            await  this.api.get(`/api/get/proveedor/user_inactive`).then(response => {
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
            await  this.api.get(`/api/get/proveedor/user_deteted`).then(response => {
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
            await  this.api.post(`/api/post/proveedor/create_user` , ojbUser).then(response => {
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
            await  this.api.put( `/api/post/proveedor/update_user/${idUser}` , ojbUser).then(response => {
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
            await  this.api.get(`/api/get/proveedor/edit_user/${userId}`).then(response => {
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
    /*FIN MODULO USUARIO */
    /*MOdulo ROLES */
    getRoles : async function(){
        let data  = '';
        try{
            await  this.api.get(`/api/get/proveedor/roles`).then(response => {
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
            await  this.api.get(`/api/get/roles_actives_proveedor`).then(response => {
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
            await  this.api.get(`/api/get/roles_inactive_proveedor`).then(response => {
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
            await  this.api.get(`/api/get/roles_deleted_proveedor`).then(response => {
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
            await  this.api.get(`/api/get/permission_proveedor`).then(response => {
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
            await  this.api.post(`/api/post/create_rol_proveedor`, ojbRol).then(response => {
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
            await  this.api.put( `/api/post/update_rol_proveedor/${idRol}`, ojbRol).then(response => {
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

    getProveedores : async function(){    
        let data  = '';
        try{
            await  this.api.get(`/api/get/proveedores`).then(response => {
               data = response;
            })
            this.data = data.data;
        }catch(error){
           data = error;
           this.data.error = error;
        }
        return data;
    },
    storeProveedor : async function(ojbUser){
        let data  = '';
        try{
            await  this.api.post(`/api/post/create_proveedor` , ojbUser).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    deleteProveedor : async function(idUser){
        let data  = '';
            try{
                await  this.api.delete(`/api/post/proveedor_delete/${idUser}`).then(response => {
                    data = response;
                })
            this.data = data.data;
            }catch(error){
                data = error;
                this.data.error = error;
            }
            return data;
    },
    getProveedoresDeleted : async function(){
        let data  = '';
        try{
            await  this.api.get(`/api/get/proveedores_delete`).then(response => {
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
export default ProveedorServices;