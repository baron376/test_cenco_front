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
    storeCampana : async function(ojbCampana){
        let data  = '';
        try{
            await  this.api.post(`/api/post/store_campana_proveedor` , ojbCampana).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    getCampanasAll : async function(){
        let data  = '';
        try{
            await  this.api.get(`/api/get/campana_proveedor`).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    getCampanasDashboard : async function(){
        let data  = '';
        try{
            await  this.api.get(`/api/get/campana_proveedor_dashboard`).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    getCampanaDelete : async function(){
        let data  = '';
        try{
            await  this.api.get(`/api/get/campana_proveedor_delete`).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    deleteCampana : async function(idCampana){
        let data  = '';
        try{
            await  this.api.delete(`/api/delete/campana_proveedor/${idCampana}`).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    getDetailsCampana : async function(idCampana){
        let data  = '';
        try{
            await  this.api.get(`/api/get/edit_campana_proveedor/${idCampana}`).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    getCampanasPendiente : async function(){
        let data  = '';
        try{
            // await  this.api.get(`/api/get/campana_proveedor_pendiente_new`).then(response => {
            //     data = response;
            // })
            await  this.api.get(`/api/get/campana_proveedor_pendiente`).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    getCampanasUp : async function(){
        let data  = '';
        try{
            // await  this.api.get(`/api/get/campana_proveedor_up_new`).then(response => {
            //     data = response;
            // })
            await  this.api.get(`/api/get/campana_proveedor_up`).then(response => {
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
    getCampanasAprobadas : async function(){
        let data  = '';
        try{
            // await  this.api.get(`/api/get/campana_proveedor_aprobada_new`).then(response => {
            //     data = response;
            // })
            await  this.api.get(`/api/get/campana_proveedor_aprobada`).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
   getCampanasRechazadas : async function(){
        let data  = '';
        try{
            // await  this.api.get(`/api/get/campana_proveedor_rechazada_new`).then(response => {
            //     data = response;
            // })
            await  this.api.get(`/api/get/campana_proveedor_rechazada`).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },


    upCampana : async function(ojbCampana , idCampana){
        let data  = '';
        try{
            await  this.api.put(`/api/put/up_campana_proveedor/${idCampana}` , ojbCampana).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    getMateriales : async function(idCampana){
        let data  = '';
        try{
            await  this.api.get(`/api/get/materiales_campanas/${idCampana}`).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    getComentarios : async function(idCampana){
        let data  = '';
        try{
            await  this.api.get(`/api/get/comentarios_campanas/${idCampana}`).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    AprobeCampana : async function(ojbCampana){
        let data  = '';
        try{
            await  this.api.put(`/api/put/aprobar_campana_proveedor` , ojbCampana).then(response => {
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
    RechazarCampana : async function(ojbCampana){
        let data  = '';
        try{
            await  this.api.put(`/api/put/rechazar_campana_proveedor` , ojbCampana).then(response => {
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
    updateCampana : async function(objCampana, idCampana){
        let data  = '';
        try{
            await  this.api.put( `/api/put/update_campana_proveedor/${idCampana}`, objCampana).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    downloadDetailsCampana : async function(idCampanaProveedor){
        let data  = '';
        try{
            await  this.api.get(`/api/get/campana_proveedor_pdf/${idCampanaProveedor}`).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    getespacioByseccion : async function(idSeccion){
        let data  = '';
        try{
            await  this.api.get(`/api/get/espacioByseccion/${idSeccion}`).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    getzonasExhibicion : async function(){
        let data  = '';
        try{
            await  this.api.get(`/api/get/zonasExhibicion`).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    getzonasExhibicionByEspacio : async function(idEspacio){
        let data  = '';
        try{
            await  this.api.get(`/api/get/zonasExhibicionByEspacio/${idEspacio}`).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },

    getzonasMaterialesByZona : async function(idZona){
        let data  = '';
        try{
            await  this.api.get(`/api/get/materialesByZona/${idZona}`).then(response => {
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