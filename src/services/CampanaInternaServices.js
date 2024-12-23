import env from "react-dotenv";
import axios from 'axios'
const  AdminServices = {
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
    getProveedor : async function(){    
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

    downloadMaterialesCampana : async function(idCampana){
        let data  = '';
        try{
            await  this.api.get(`/api/get/generar_materiales_campana/${idCampana}`).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },

    getCampanaDetailLatestFile : async function(campanaId){
        let data  = '';
        try{
            await  this.api.get(`/api/get/campana_interna_ultimo_archivo/${campanaId}`).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    
    getInstalador : async function(){    
        let data  = '';
        try{
            await  this.api.get(`/api/get/instaladores`).then(response => {
               data = response;
            })
            this.data = data.data;
        }catch(error){
           data = error;
           this.data.error = error;
        }
        return data;
    },
    getSecciones : async function(){    
        let data  = '';
        try{
            await  this.api.get(`/api/get/sesiones`).then(response => {
               data = response;
            })
            this.data = data.data;
        }catch(error){
           data = error;
           this.data.error = error;
        }
        return data;
    },
    getzonas : async function(){    
        let data  = '';
        try{
            await  this.api.get(`/api/get/zonas`).then(response => {
               data = response;
            })
            this.data = data.data;
        }catch(error){
           data = error;
           this.data.error = error;
        }
        return data;
    },
    storeCampanaInterna : async function(objCampanaInterna){
        let data  = '';
        try{
            await  this.api.post(`/api/post/store_campana_interna` , objCampanaInterna).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    getCampanasInternasAll : async function(){
        let data  = '';
        try{
            await  this.api.get(`/api/get/campana_interna`).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    getComentariosCampanasInternasAll : async function(idCampanaInterna){
        let data  = '';
        try{
            await  this.api.get(`/api/get/comentario_campana_interna/${idCampanaInterna}`).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    getCampanasInternasDashboard : async function(){
        let data  = '';
        try{
            await  this.api.get(`/api/get/campana_interna_dashboard`).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    getCampanaInternaDelete : async function(){
        let data  = '';
        try{
            await  this.api.get(`/api/get/campana_interna_delete`).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    getComentarioCampanaInternaDelete : async function(idCampanaInterna){
        let data  = '';
        try{
            await  this.api.get(`/api/get/comentario_campana_interna_deleted/${idCampanaInterna}`).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    deleteCampanaInterna : async function(idCampanaInterna){
        let data  = '';
        try{
            await  this.api.delete(`/api/delete/campana_interna/${idCampanaInterna}`).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    deleteComentarioCampanaInterna : async function(idComentario){
        let data  = '';
        try{
            await  this.api.delete(`/api/delete/comentario_campana_interna/${idComentario}`).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    getDetailsCampanaInterna : async function(idCampanaInterna){
        let data  = '';
        try{
            await  this.api.get(`/api/get/edit_campana_interna/${idCampanaInterna}`).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    getCampanasInternasPendiente : async function(){
        let data  = '';
        try{
            await  this.api.get(`/api/get/campana_interna_pendiente`).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    getCampanasInternasUp : async function(){
        let data  = '';
        try{
            await  this.api.get(`/api/get/campana_interna_up`).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    getEspacios : async function(){
        let data  = '';
        try{
            await  this.api.get(`/api/get/espacios_campanas`).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    upCampanaInterna : async function(objCampanaInterna , idCampanaInterna){
        let data  = '';
        try{
            await  this.api.put(`/api/put/up_campana_interna/${idCampanaInterna}` , objCampanaInterna).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    getMateriales : async function(idCampanaInterna){
        let data  = '';
        try{
            await  this.api.get(`/api/get/materiales_campanas/${idCampanaInterna}`).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    getComentarios : async function(idCampanaInterna){
        let data  = '';
        try{
            await  this.api.get(`/api/get/comentarios_campanas/${idCampanaInterna}`).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    AprobeCampanaInterna : async function(objCampanaInterna){
        let data  = '';
        try{
            await  this.api.put(`/api/put/aprobar_campana_interna` , objCampanaInterna).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            console.error('error', data)
            this.data.error = error;
        }
        return data;
    },
    RechazarCampanaInternet : async function(objCampanaInterna){
        let data  = '';
        try{
            await  this.api.put(`/api/put/rechazar_campana_interna` , objCampanaInterna).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            console.error('error', data)
            this.data.error = error;
        }
        return data;
    },
    updateCampanaInterna : async function(objCampanaInterna, idCampanaInterna){
        let data  = '';
        try{
            await  this.api.put( `/api/put/update_campana_interna/${idCampanaInterna}`, objCampanaInterna).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    CommentCampanaInterna : async function(objCampanaInterna, idCampanaInterna){
        let data  = '';
        try{
            await  this.api.put( `/api/put/comment_campana_interna/${idCampanaInterna}`, objCampanaInterna).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    }
}
export default AdminServices;