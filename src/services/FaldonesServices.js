import env from "react-dotenv";
import axios from 'axios'

const FaldonesServices = {
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
    getFaldonesDelete : async function(){
        let data  = '';
        try{
             await  this.api.get(`/api/get/campana_faldones_deleted`).then(response => {
                data = response;
             })
             this.data = data.data;
         }catch(error){
            data = error;
            this.data.error = error;
         }
         return data;
     },
    getFaldonesAll : async function(){
        let data  = '';
        try{
             await  this.api.get(`/api/get/campana_faldones`).then(response => {
                data = response;
             })
             this.data = data.data;
         }catch(error){
            data = error;
            this.data.error = error;
         }
         return data;
     },

     getFaldonesAllDashborad : async function(){
        let data  = '';
        try{
             await  this.api.get(`/api/get/campana_faldones_dashboard`).then(response => {
                data = response;
             })
             this.data = data.data;
         }catch(error){
            data = error;
            this.data.error = error;
         }
         return data;
     },
    getFormatos : async function(){
        let data  = '';
        try{
             await  this.api.get(`/api/get/formato_faldones`).then(response => {
                data = response;
             })
             this.data = data.data;
         }catch(error){
            data = error;
            this.data.error = error;
         }
         return data;
     },
     getPlantillas : async function(){
        let data  = '';
        try{
             await  this.api.get(`/api/get/plantilla_faldones`).then(response => {
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
            await  this.api.post(`/api/post/store_campana_faldones` , ojbCampana).then(response => {
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
            await  this.api.put(`/api/put/update_campana_faldones/${idCampana}` , ojbCampana).then(response => {
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
                await  this.api.delete(`/api/delete/delete_campana/${idCampana}`).then(response => {
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
            await  this.api.get(`/api/get/edit_campana_faldones/${campanaId}`).then(response => {
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
            await  this.api.get(`/api/get/edit_campana_faldones_ultimo_archivo/${campanaId}`).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    getPlantillasView : async function(){
        let data  = '';
        try{
             await  this.api.get(`/api/get/plantillas`).then(response => {
                data = response;
             })
             this.data = data.data;
         }catch(error){
            data = error;
            this.data.error = error;
         }
         return data;
    },
    getPlantillasInactivasView : async function(){
        let data  = '';
        try{
             await  this.api.get(`/api/get/plantillas_inactivas`).then(response => {
                data = response;
             })
             this.data = data.data;
         }catch(error){
            data = error;
            this.data.error = error;
         }
         return data;
    },
    desactivatePlantilla : async function(idPlantilla){
        let data  = '';
        try{
            await  this.api.put( `/api/put/plantilla_desactivate/${idPlantilla}`).then(response => {
                data = response;
            })
            this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    activatePlantilla : async function(idPlantilla){
        let data  = '';
        try{
            await  this.api.put( `/api/put/plantilla_activate/${idPlantilla}`).then(response => {
                data = response;
            })
            this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },

    getFaldonesExpressDelete : async function(){
        let data  = '';
        try{
             await  this.api.get(`/api/get/get_faldones_express_deleted`).then(response => {
                data = response;
             })
             this.data = data.data;
         }catch(error){
            data = error;
            this.data.error = error;
         }
         return data;
     },
    getFaldonesExpressAll : async function(){
        let data  = '';
        try{
             await  this.api.get(`/api/get/get_faldones_express`).then(response => {
                data = response;
             })
             this.data = data.data;
         }catch(error){
            data = error;
            this.data.error = error;
         }
         return data;
     },
     getFaldonesExpressDashboard : async function(){
        let data  = '';
        try{
             await  this.api.get(`/api/get/get_faldones_express_dashboard`).then(response => {
                data = response;
             })
             this.data = data.data;
         }catch(error){
            data = error;
            this.data.error = error;
         }
         return data;
     },
     getFaldonDetail : async function(campanaId){
        let data  = '';
        try{
            await  this.api.get(`/api/get/details_faldon/${campanaId}`).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    storeFaldon : async function(ojbCampana){
        let data  = '';
        try{
            await  this.api.post(`/api/post/store_faldones_express` , ojbCampana).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    updateFaldon : async function(ojbCampana , idCampana){
        let data  = '';
        try{
            await  this.api.put(`/api/put/update_faldon_express/${idCampana}` , ojbCampana).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    deleteFaldon : async function(idCampana){
        let data  = '';
            try{
                await  this.api.delete(`/api/delete/delete_faldon/${idCampana}`).then(response => {
                    data = response;
                })
            this.data = data.data;
            }catch(error){
                data = error;
                this.data.error = error;
            }
            return data;
    },
    downloadFaldon : async function(idFaldonExpress){
        let data  = '';
        try{
            await  this.api.get(`/api/get/generar_faldon_express/${idFaldonExpress}`).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    downloadFaldonCampana : async function(idFaldonExpress){
        let data  = '';
        try{
            await  this.api.get(`/api/get/generar_faldon_campana/${idFaldonExpress}`).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    downloadFaldonesCampana : async function(idCampana){
        let data  = '';
        try{
            await  this.api.get(`/api/get/generar_faldones_campana/${idCampana}`).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },

    getStockCampanaDetailsSala : async function(campanaId , salaId){
        let data  = '';
        try{
            await  this.api.get(`/api/get/stock_productos/${campanaId}/${salaId}`).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    getDownloadStockCampanaDetailsSala : async function(campanaId , salaId){
        let data  = '';
        try{
            await  this.api.get(`/api/get/download_stock_campana/${campanaId}/${salaId}`).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    getDesactivateStockCampanaSala : async function(stockId){
        let data  = '';
        try{
            await  this.api.get(`/api/get/desactivate_stock_campana_sala/${stockId}`).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    getUmbFladones : async function(){
        let data  = '';
        try{
             await  this.api.get(`/api/get/get_umb_faldones`).then(response => {
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
export default FaldonesServices;
