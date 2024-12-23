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
    storeMantencion : async function(ojbMantencion){
        let data  = '';
        try{
            await  this.api.post(`/api/post/store_mantencion` , ojbMantencion).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    getMantencionAll : async function(){
        let data  = '';
        try{
            await  this.api.get(`/api/get/mantencion`).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    getMantencionDashboard : async function(){
        let data  = '';
        try{
            await  this.api.get(`/api/get/mantencion_dashboard`).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    getMantencionDelete : async function(){
        let data  = '';
        try{
            await  this.api.get(`/api/get/mantencion_delete`).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    getMantencionAprobe : async function(){
        let data  = '';
        try{
            await  this.api.get(`/api/get/mantencion_aprove`).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    getMantencionRefused : async function(){
        let data  = '';
        try{
            await  this.api.get(`/api/get/mantencion_refuse`).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    getMantencionEnded : async function(){
        let data  = '';
        try{
            await  this.api.get(`/api/get/mantencion_ended`).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    deleteMantencion : async function(idMantencion){
        let data  = '';
        try{
            await  this.api.delete(`/api/delete/mantencion/${idMantencion}`).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    getDetailsMantencion : async function(idMantencion){
        let data  = '';
        try{
            await  this.api.get(`/api/get/edit_mantencion/${idMantencion}`).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },

    getMantencionByState : async function(idState){
        let data  = '';
        try{
            await  this.api.get(`/api/get/mantencion_by_state/${idState}`).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },

    getMantencionesPendiente : async function(){
        let data  = '';
        try{
            await  this.api.get(`/api/get/mantencion_pendiente`).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    getMantencionesUp : async function(){
        let data  = '';
        try{
            await  this.api.get(`/api/get/mantencion_up`).then(response => {
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
    upMantencion : async function(ojbMantencion , idMantencion){
        let data  = '';
        try{
            await  this.api.put(`/api/put/up_mantencion/${idMantencion}` , ojbMantencion).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    getElementos : async function(idMantencion){
        let data  = '';
        try{
            await  this.api.get(`/api/get/elementos_mantencion/${idMantencion}`).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    getComentarios : async function(idMantencion){
        let data  = '';
        try{
            await  this.api.get(`/api/get/comentarios_mantencion/${idMantencion}`).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    AprobeMantencion : async function(ojbMantencion){
        let data  = '';
        try{
            await  this.api.put(`/api/put/aprobar_mantencion` , ojbMantencion).then(response => {
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
    LiberarMantencion : async function(ojbMantencion){
        let data  = '';
        try{
            await  this.api.put(`/api/put/liberar_mantencion` , ojbMantencion).then(response => {
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
    RechazarMantencion : async function(ojbMantencion){
        let data  = '';
        try{
            await  this.api.put(`/api/put/rechazar_mantencion` , ojbMantencion).then(response => {
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

    DevolverMantencion : async function(ojbMantencion){
        let data  = '';
        try{
            await  this.api.put(`/api/put/devolver_mantencion` , ojbMantencion).then(response => {
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

    FinalizarMantencion : async function(ojbMantencion,idMantencion){
        let data  = '';
        try{
            await  this.api.put(`/api/put/finalizar_mantencion/${idMantencion}` , ojbMantencion).then(response => {
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

    updateMantencion : async function(ojbMantencion, idMantencion){
        let data  = '';
        try{
            await  this.api.put( `/api/put/update_mantencion/${idMantencion}`, ojbMantencion).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    downloadDetailsMantencion : async function(idMantencion){
        let data  = '';
        try{
            await  this.api.get(`/api/get/mantencion_pdf/${idMantencion}`).then(response => {
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
export default AdminServices;