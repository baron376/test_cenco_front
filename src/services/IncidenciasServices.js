import env from "react-dotenv";
import axios from 'axios'

const IncidenciasServices = {
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

     storeIncidencia : async function(ojbCampana){
        let data  = '';
        try{
            await  this.api.post(`/api/post/store_incidencia` , ojbCampana).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    getIncidenciasActive : async function(){
        let data  = '';
        try{
             await  this.api.get(`/api/get/get_incidencias_campanas`).then(response => {
                data = response;
             })
             console.log('data de inicidencias con error' , data)
             this.data = data.data;
         }catch(error){
            data = error;
            this.data.error = error;
         }
         return data;
     },
     getIncidenciasDeleted : async function(){
        let data  = '';
        try{
             await  this.api.get(`/api/get/get_incidencias_campanas_deleted`).then(response => {
                data = response;
             })
             this.data = data.data;
         }catch(error){
            data = error;
            this.data.error = error;
         }
         return data;
     },
     deleteIncidencia : async function(idIncidencia){
        let data  = '';
            try{
                await  this.api.delete(`/api/delete/delete_incidencia/${idIncidencia}`).then(response => {
                    data = response;
                })
            this.data = data.data;
            }catch(error){
                data = error;
                this.data.error = error;
            }
            return data;
    },
    getIncidenciaDetail : async function(idIncidencia){
        let data  = '';
        try{
            await  this.api.get(`/api/get/get_edit_incidencia/${idIncidencia}`).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    updateIncidencia : async function(ojb , idIncidencia){
        let data  = '';
        try{
            await  this.api.put(`/api/put/update_incidencia/${idIncidencia}` , ojb).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    getIncidenciasActiveProveedor : async function(){
        let data  = '';
        try{
             await  this.api.get(`/api/get/get_incidencias_campanas_proveedor`).then(response => {
                data = response;
             })
             this.data = data.data;
         }catch(error){
            data = error;
            this.data.error = error;
         }
         return data;
     },
     getIncidenciasDeletedProveedor : async function(){
        let data  = '';
        try{
             await  this.api.get(`/api/get/get_incidencias_campanas_deleted_proveedor`).then(response => {
                data = response;
             })
             this.data = data.data;
         }catch(error){
            data = error;
            this.data.error = error;
         }
         return data;
     },
}
export default IncidenciasServices;
