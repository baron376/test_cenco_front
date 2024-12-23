import env from "react-dotenv";
import axios from 'axios'

const CampanaPromotoraServices = {
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
    
     storeCampana : async function(ojbCampana){
        let data  = '';
        try{
            await  this.api.post(`/api/post/promotoras/store` , ojbCampana).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    getCampanaPromotorasAll : async function(){
        let data  = '';
        try{
             await  this.api.get(`/api/get/promotoras`).then(response => {
                data = response;
             })
             this.data = data.data;
         }catch(error){
            data = error;
            this.data.error = error;
         }
         return data;
     },
     getCampanaPromotorasDashboard : async function(){
        let data  = '';
        try{
             await  this.api.get(`/api/get/promotoras_dashboard`).then(response => {
                data = response;
             })
             this.data = data.data;
         }catch(error){
            data = error;
            this.data.error = error;
         }
         return data;
     },

     getCampanaPromotorasDelete : async function(){
        let data  = '';
        try{
             await  this.api.get(`/api/get/promotoras_delete`).then(response => {
                data = response;
             })
             this.data = data.data;
         }catch(error){
            data = error;
            this.data.error = error;
         }
         return data;
     },
     deleteCampanaPromotoras : async function(idCampana){
        let data  = '';
            try{
                await  this.api.delete(`/api/delete/promotora/${idCampana}`).then(response => {
                    data = response;
                })
            this.data = data.data;
            }catch(error){
                data = error;
                this.data.error = error;
            }
            return data;
    },
    getCampanaDetail : async function(campanaId){
        let data  = '';
        try{
            await  this.api.get(`/api/get/get_edit_promotoras/${campanaId}`).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    updateCampana : async function(ojbCampana , idCampana){
        let data  = '';
        try{
            await  this.api.put(`/api/put/update_promotoras/${idCampana}` , ojbCampana).then(response => {
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
            await  this.api.put(`/api/put/up_muebles_promotoras/${idCampana}` , ojbCampana).then(response => {
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
            await  this.api.get(`/api/get/comentarios_campanas_promotoras/${idCampana}`).then(response => {
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
            await  this.api.get(`/api/get/muebles_promotoras/${idCampana}`).then(response => {
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
            await  this.api.put(`/api/put/aprobar_promotoras` , ojbCampana).then(response => {
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
            await  this.api.put(`/api/put/rechazar_promotoras` , ojbCampana).then(response => {
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
    downloadDetailsCampana : async function(idCampanaProveedor){
        let data  = '';
        try{
            await  this.api.get(`/api/get/campana_promotora_pdf/${idCampanaProveedor}`).then(response => {
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
export default CampanaPromotoraServices;
