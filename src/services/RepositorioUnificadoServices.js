import env from "react-dotenv";
import axios from 'axios'

const RepositorioUnificadoServices = {
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

    getRepositorios : async function(){
        let data  = '';
        try{
             await  this.api.get(`/api/get/get_repositorios`).then(response => {
                data = response;
             })
             this.data = data.data;
         }catch(error){
            data = error;
            this.data.error = error;
         }
         return data;
     },

     getModulos : async function(){
        let data  = '';
        try{
             await  this.api.get(`/api/get/get_modulos`).then(response => {
                data = response;
             })
             this.data = data.data;
         }catch(error){
            data = error;
            this.data.error = error;
         }
         return data;
     },

     storeRepositorio : async function(ojbRepositorio){
        let data  = '';
        try{
            await  this.api.post(`/api/post/store_repositorio` , ojbRepositorio).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },

    getRepositorioDetail : async function(RepositorioId){
        let data  = '';
        try{
            await  this.api.get(`/api/get/get_edit_repositorio/${RepositorioId}`).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },

    updateRepositorio : async function(ojbRepositorio , idReposiotorio){
        let data  = '';
        try{
            await  this.api.put(`/api/put/update_repositorio/${idReposiotorio}` , ojbRepositorio).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },

    getRepositorioModulo : async function(moduloId){
        let data  = '';
        try{
            await  this.api.get(`/api/get/get_repositorios_modulo/${moduloId}`).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },

    deleteRepositorio : async function(repositorio){
        let data  = '';
            try{
                await  this.api.delete(`/api/delete/${repositorio}`).then(response => {
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



export default RepositorioUnificadoServices;
