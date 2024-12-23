import env from "react-dotenv";
import axios from 'axios'

const AdminServices = {
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
    /*MODULA DE SALAS */
    getSalas : async function(){    
        let data  = '';
        try{
            await  this.api.get(`/api/get/salas`).then(response => {
               data = response;
            })
            this.data = data.data;
        }catch(error){
           data = error;
           this.data.error = error;
        }
        return data;
    },
    getSalasUser : async function(){    
        let data  = '';
        try{
            await  this.api.get(`/api/get/salas_user`).then(response => {
               data = response;
            })
            this.data = data.data;
        }catch(error){
           data = error;
           this.data.error = error;
        }
        return data;
    }, 
    getSalasUserCadenas : async function(cadena){    
        let data  = '';
        try{
            await  this.api.get(`/api/get/salas_user_cadena/${cadena}`).then(response => {
               data = response;
            })
            this.data = data.data;
        }catch(error){
           data = error;
           this.data.error = error;
        }
        return data;
    },    
    getSalasActivas : async function(){
        let data  = '';
        try{
            await  this.api.get(`/api/get/salas_active`).then(response => {
               data = response;
            })
            this.data = data.data;
        }catch(error){
           data = error;
           this.data.error = error;
        }
        return data;
    },
    getSalaInactive : async function(){
        let data  = '';
        try{
            await  this.api.get(`/api/get/salas_inactive`).then(response => {
               data = response;
            })
            this.data = data.data;
        }catch(error){
           data = error;
           this.data.error = error;
        }
        return data;
    },
    getSalaDelete : async function(){
        let data  = '';
        try{
            await  this.api.get(`/api/get/salas_delete`).then(response => {
               data = response;
            })
            this.data = data.data;
        }catch(error){
           data = error;
           this.data.error = error;
        }
        return data;
    },
    getSalasForCadena : async function(cadena){
        let data  = '';
        try{
            await  this.api.get(`/api/get/salas/${cadena}`).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    getSalasForCampanaUser : async function(campana){
        let data  = '';
        try{
            await  this.api.get(`/api/get/salas_campana_faldon_user/${campana}`).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    getRegiones : async function(){
        let data  = '';
        try{
            await  this.api.get(`/api/get/regiones`).then(response => {
               data = response;
            })
            this.data = data.data;
        }catch(error){
           data = error;
           this.data.error = error;
        }
        return data;
    },
    getTiposSala : async function(){
        let data  = '';
        try{
            await  this.api.get(`/api/get/tipo_sala`).then(response => {
               data = response;
            })
            this.data = data.data;
        }catch(error){
           data = error;
           this.data.error = error;
        }
        return data;
    },
    getComunas : async function(idProvincia){
        let data  = '';
        try{
            await  this.api.get(`/api/get/comunas/${idProvincia}`).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    getComunasByRegion : async function(idRegion){
        let data  = '';
        try{
            await  this.api.get(`/api/get/comunas_ByRegion/${idRegion}`).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    storeSala : async function(ojbSala){
        let data  = '';
        try{
            await  this.api.post(`/api/post/create_sala`, ojbSala).then(response => {
                data = response;
            })
            this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    getSalasDetail : async function(salaId){
        let data  = '';
        try{
            await  this.api.get(`/api/get/edit_sala/${salaId}`).then(response => {
                data = response;
            })
                this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    getCdgDetail : async function(salaId){
        let data  = '';
        try{
            await  this.api.get(`/api/get/cdg_sala/${salaId}`).then(response => {
                data = response;
            })
                this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    updateSala : async function(objSala, idSala){
        let data  = '';
        try{
            await  this.api.put( `/api/put/update_sala/${idSala}`, objSala).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    deleteSala : async function(objSala){
        let data  = '';
        try{
            await  this.api.post( `/api/post/delete_sala`, objSala).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    statusSalas : async function(objSala){
        let data  = '';
        try{
            await  this.api.post( `/api/post/status_sala`, objSala).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    /*FIN DE MODULO SALAS*/
    /*MODULO DE CADENAS*/
    getCadenas : async function(){
       let data  = '';
       try{
            await  this.api.get(`/api/get/cadenas`).then(response => {
               data = response;
            })
            this.data = data.data;
        }catch(error){
           data = error;
           this.data.error = error;
        }
        return data;
    },
    getCadenasUsuario : async function(){
        let data  = '';
        try{
             await  this.api.get(`/api/get/cadenas_user`).then(response => {
                data = response;
             })
             this.data = data.data;
         }catch(error){
            data = error;
            this.data.error = error;
         }
         return data;
     },
    getCadenasQr : async function(){
        let data  = '';
        try{
             await  this.api.get(`/api/get/cadenas_qr`).then(response => {
                data = response;
             })
             this.data = data.data;
         }catch(error){
            data = error;
            this.data.error = error;
         }
         return data;
     },
    getCadenaActivas : async function(){
        let data  = '';
        try{
            await  this.api.get(`/api/get/cadenas_active`).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    getCadenaInactive : async function(){
        let data  = '';
        try{
            await  this.api.get(`/api/get/cadenas_inactive`).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    getCadenaDelete : async function(){
        let data  = '';
        try{
            await  this.api.get(`/api/get/cadenas_delete`).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    deleteCadena : async function(objCadena){
        let data  = '';
        try{
            await  this.api.post(`/api/post/delete_cadena`, objCadena).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    statusCadena : async function(objCadena){
        let data  = '';
        try{
            await  this.api.post(`/api/post/status_cadena`, objCadena).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    storeCadena : async function(objCadena){
        let data  = '';
        try{
            await  this.api.post(`/api/post/create_cadena`, objCadena).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    getCadenaDetail : async function(CadenaId){
        let data  = '';
        try{
            await  this.api.get(`/api/get/edit_cadena/${CadenaId}`).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    getCadenaName : async function(CadenaName){
       let data  = '';
       try{
           await  this.api.get(`/api/get/nombre_cadena/${CadenaName}`).then(response => {
               data = response;
           })
            this.data = data.data;
        }catch(error){
           data = error;
           this.data.error = error;
        }
       return data;
    },
    updateCadena : async function(ojbCAdena, idCadena){
        let data  = '';
        try{
            await  this.api.put( `/api/put/update_cadena/${idCadena}`, ojbCAdena).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    /*FIN MODULO DE CADENAS*/
    /*MODULO DE SESIONES */
    getSesionActivas : async function(){
        let data  = '';
        try{
            await  this.api.get(`/api/get/sesion_active`).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    getSesionInactive : async function(){
        let data  = '';
        try{
            await  this.api.get(`/api/get/sesion_inactive`).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    getSesionDelete : async function(){
        let data  = '';
        try{
            await  this.api.get(`/api/get/sesion_delete`).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
        
    },
    getNumeroSesiones : async function(SesionesId){
        let data  = '';
        try{
            await  this.api.get(`/api/get/numero_sesion/${SesionesId}`).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    storeSesiones : async function(objSesion){
        let data  = '';
        try{
            await  this.api.post(`/api/post/create_sesion`, objSesion).then(response => {
                data = response;
            })
            this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;

    },
    getSesionesDetail : async function(SesionesId){
        let data  = '';
        try{
            await  this.api.get(`/api/get/edit_sesion/${SesionesId}`).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    updateSesion : async function(ojbSesion, idSesion){
        let data  = '';
        try{
            await  this.api.put( `/api/put/update_sesion/${idSesion}`, ojbSesion).then(response => {
                data = response;
            })
            this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    statusSesion : async function(objSesion){
        let data  = '';
        try{
            await  this.api.post(`/api/post/status_sesion`, objSesion).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;        
    },
    deleteSesion : async function(objSesion){
        let data  = '';
        try{
            await  this.api.post(`/api/post/delete_sesion`, objSesion).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;   
    },
    /*FIN MODULO DE SESIONES */
    /*MODULO DE Marcas*/
    storeMarca : async function(objMarca){
        let data  = '';
        try{
            await  this.api.post(`/api/post/create_marca`, objMarca).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    getMarcasEspera : async function(){
        let data  = '';
        try{
            await  this.api.get(`/api/get/marca_espera`).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    getMarcasActivas : async function(){
        let data  = '';
        try{
            await  this.api.get(`/api/get/marca_active`).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    getMarcasInactivas : async function(){
        let data  = '';
        try{
            await  this.api.get(`/api/get/marca_inactive`).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    getMarcasDelete : async function(){
        let data  = '';
        try{
            await  this.api.get(`/api/get/marca_delete`).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    statusMarca : async function(objMarca){
        let data  = '';
        try{
            await  this.api.post(`/api/post/status_marca`, objMarca).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    deleteMarca : async function(objMarca){
        let data  = '';
        try{
            await  this.api.post(`/api/post/delete_marca`, objMarca).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    getMarcaDetail : async function(CadenaId){
        let data  = '';
        try{
            await  this.api.get(`/api/get/edit_marca/${CadenaId}`).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    updateMarca : async function(objMarca, idMarca){
        let data  = '';
        try{
            await  this.api.put( `/api/put/update_marca/${idMarca}`, objMarca).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    getMedios : async function(){
        let data  = '';
        try{
            await  this.api.get(`/api/get/medios`).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    getTiposMedios : async function(){
        let data  = '';
        try{
            await  this.api.get(`/api/get/tipos_medios`).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    getTiposVolantes : async function(){
        let data  = '';
        try{
            await  this.api.get(`/api/get/tipos_volantes_catalogos`).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    getTiposPromos : async function(){
        let data  = '';
        try{
            await  this.api.get(`/api/get/get_tipos_promos`).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    getCombinaciones : async function(){
        let data  = '';
        try{
            await  this.api.get(`/api/get/get_combinaciones`).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    getTurnos : async function(){
        let data  = '';
        try{
             await  this.api.get(`/api/get/turnos`).then(response => {
                data = response;
             })
             this.data = data.data;
         }catch(error){
            data = error;
            this.data.error = error;
         }
         return data;
     },
     updateCupoSala : async function(objSala, idSala){
        let data  = '';
        try{
            await  this.api.put( `/api/put/update_sala_cupo_total/${idSala}`, objSala).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    storeSalaSeccionCupo : async function(ojbSala){
        let data  = '';
        try{
            await  this.api.post(`/api/post/create_sala_seccion_cupo`, ojbSala).then(response => {
                data = response;
            })
            this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    getSeccionesCupos : async function(salaId){
        let data  = '';
        try{
            await  this.api.get(`/api/get/get_secciones_cupo/${salaId}`).then(response => {
                data = response;
            })
                this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    deleteSalaSeccionCupo : async function(idSeccioncupo){
        let data  = '';
        try{
            await  this.api.delete( `/api/delete/delete_sala_seccion_grupo/${idSeccioncupo}`).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    getSalaSeccionCupos : async function(salaId , seccionId){
        let data  = '';
        try{
            await  this.api.get(`/api/get/get_sala_seccion_cupo/${salaId}/${seccionId}`).then(response => {
                data = response;
            })
                this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    getCsrfToken : async function(){
        let data  = '';
        try{
            await  this.api.get(`/api/ttk`).then(response => {
                data = response;
            })
                this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    /*getCadenas : async function(){
        let data  = '';
        try{
             await  this.api.get(`/api/get/cadenas`).then(response => {
                data = response;
             })
             this.data = data.data;
         }catch(error){
            data = error;
            this.data.error = error;
         }
         return data;
    },
    getCadenaActivas : async function(){
        let data  = '';
        try{
            await  this.api.get(`/api/get/cadenas_active`).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    getCadenaInactive : async function(){
        let data  = '';
        try{
            await  this.api.get(`/api/get/cadenas_inactive`).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    getCadenaDelete : async function(){
        let data  = '';
        try{
            await  this.api.get(`/api/get/cadenas_delete`).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    deleteMarca : async function(objCadena){
        let data  = '';
        try{
            await  this.api.post(`/api/post/delete_cadena`, objCadena).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    statusCadena : async function(objCadena){
        let data  = '';
        try{
            await  this.api.post(`/api/post/status_cadena`, objCadena).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    storeMarca : async function(objMarca){
        let data  = '';
        try{
            await  this.api.post(`/api/post/create_marca`, objMarca).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    getMarcaDetail : async function(CadenaId){
        let data  = '';
        try{
            await  this.api.get(`/api/get/edit_cadena/${CadenaId}`).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },
    getCadenaName : async function(CadenaName){
    let data  = '';
    try{
        await  this.api.get(`/api/get/nombre_cadena/${CadenaName}`).then(response => {
            data = response;
        })
            this.data = data.data;
        }catch(error){
        data = error;
        this.data.error = error;
        }
    return data;
    },
    updateMarca : async function(ojbCAdena, idCadena){
        let data  = '';
        try{
            await  this.api.put( `/api/put/update_cadena/${idCadena}`, ojbCAdena).then(response => {
                data = response;
            })
        this.data = data.data;
        }catch(error){
            data = error;
            this.data.error = error;
        }
        return data;
    },*/
}
export default AdminServices;