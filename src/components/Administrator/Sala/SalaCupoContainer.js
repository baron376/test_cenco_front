import React, { Component } from 'react'
import SalaCupo from './SalaCupo';
import AdminServices from '../../../services/AdminServices';
import CampanasServices from '../../../services/CampanasServices';
import swal from 'sweetalert';
import {getFirtsEmentArray } from '../../../util/formats';
import { faPencilAlt , faEye , faTrashAlt, faFileExcel , faFilePdf ,faCubes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default class SalaCupoContainers extends Component {

    state = {
        loading:false,
        loadinSeccionesCupos:false,
        error:null,
        salaDetailsData:{},
        idCampanaPromo:null,
        nombreSapSala : null,
        cdgLocal : null,
        idSala:null,
        cupoTotalSala:null,
        cupoSeccion:null,
        listaSecciones:[],
        listSeccionesSeleted:null,
        dataSeccionesCupos:[],
        errorsForm:{
            cupo_total:'',
            seccion:'',
            cupo_seccion:'',
            cupo_disponible:''
        },
        objectTosend:{
            id_sala:null,
            id_seccion:null,
            cupo_promo:null,
        },
        headData:[{
            dataField: '',
            text: ''
          }],
          cupoTotalUtilizadoSala : null,
          salaSeccionCupoPreSave :null
    }
    constructor(){
        super();
        this.getDetailsSala.bind(this)
    }
    trasfData = async function(){
        this.setState({
            loading:true,
        });
        const columns = [
             {
                dataField: 'seccion',
                text: 'Sección',
                    formatter:this.seccionFormater,
                    headerStyle: {
                        width: '20%'
                    },
                sort: true,
            }, 
            {
                dataField: 'cupo_promo',
                text: 'Cupo',
                headerStyle: {
                    width: '8%'
                },
                sort: true,
            },
            {
                dataField: 'actions',
                text: 'Acciones',
                formatter:this.actionsFormater.bind(this),
                headerStyle: {
                    width: '20%'
                  }
            },
      
        ];
          this.setState({
            loading:false,
            headData: columns,
        });
    }
    async componentDidMount(){
        await this.getDetailsSala();
        await this.trasfData();
        await this.getSeccionesCupo();
        await this.getSecciones();
        await this.preSelectObject();
    }
    getDetailsSala = async function(salaId){
        let idCampanaPromoEdit = this.props.match.params.id;
        this.setState({loading:true , error: null , idCampanaPromo: idCampanaPromoEdit})
        await AdminServices.getSalasDetail(idCampanaPromoEdit).then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                this.setState({loading:false, salaDetailsData: data.data});
            }else{
                this.setState({ loading:false , error : data.error})
            }
        })
    }
    getSeccionesCupo = async function(salaId){
        let idCampanaPromoEdit = this.props.match.params.id;
        this.setState({loading:true , error: null , idCampanaPromo: idCampanaPromoEdit})
        await AdminServices.getSeccionesCupos(idCampanaPromoEdit).then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                let cupoUtilizados  =0;
                data.data.forEach(cupo => {
                    cupoUtilizados = cupoUtilizados+cupo.cupo_promo;
                })
                this.setState({loading:false, dataSeccionesCupos: data.data , cupoTotalUtilizadoSala :cupoUtilizados});
            }else{
                this.setState({ loading:false , error : data.error})
            }
        })
    }
    getSecciones = async function(){
        this.setState({loading:true , error: null})
         await CampanasServices.getSecciones().then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                this.setState({
                    loading:false,
                    listaSecciones: data.data,
                });
            }else{
                this.setState({ loading:false , error : data.error})
            }
        });
    }
    
    preSelectObject = async function(){
        this.setState({loading:true , error: null})
        let idSalaLocal = this.state.salaDetailsData.id;
        let localNombreSap = this.state.salaDetailsData.nombre_sap;
        let cogLocal = this.state.salaDetailsData.cdg_local;
        let cupoTotalLocal = this.state.salaDetailsData.cupo_total_promo;
        this.setState({loading:false  , nombreSapSala:localNombreSap , cdgLocal: cogLocal  , idSala : idSalaLocal , cupoTotalSala:cupoTotalLocal })
    }
    onlyNumber = e =>{
        const key = e.keyCode || e.which;
        if (!((key >= 48 && key <= 57) || (key >= 96 && key <= 105)) && key !== 8 && key !== 0) {
            e.preventDefault();
         }
    }
    onlyNumberandK = e =>{
        const key = e.keyCode || e.which;
        if (!((key >= 48 && key <= 57) || key === 75 || key === 107 ||(key >= 96 && key <= 105)) && key !== 8 && key !== 0) {
            e.preventDefault();
        }
    }
    handleChangeI = e =>{
        this.setState({
            [e.target.name] : e.target.value
        });
        e.preventDefault();
        const { name, value } = e.target;
        let errors = this.state.errorsForm;

        switch (name) {
            case 'cupoTotalSala':
                errors.cupo_total ='';
                if(value===''){
                    errors.cupo_total =' El cupo total de la sala es requerido';
                }else{
                    this.updateSala(value);
                }
            break;
            case 'cupoSeccion':
                errors.cupo_seccion ='';
                if(value===''){
                    errors.cupo_total =' El cupo de la sección es requerido';
                }
            break;
         
            default:
              break;
          }
        this.setState({errors, [name]: value});
    }
    updateSala = async function(cupo){ 
        this.setState({loading:true})
        let UpdateSala = ({
            cupo_total_promo:cupo
        });
        try{
            AdminServices.updateCupoSala(UpdateSala, this.state.idSala).then((data) => {
                console.log('actualizo ?' ,data)
                if(!data.hasOwnProperty('errorInfo')){
                    console.log('actualizada')
                }else{
                    this.setState({cupoTotalSala:null })
                    swal({
                        title: `Error ${data.errorInfo.toString()} `,
                        text: "!",
                        icon: "error",
                        button: "Ok!",
                    });
                }
            })
            this.setState({loading:false , error: null})
        } catch(error){
            this.setState({loading:false , error: error})
        }
    }
    onSelectSecciones = (selectedList, _selectedItem) =>{
        this.setState({
            listSeccionesSeleted : selectedList
        })
        if(selectedList.length<1){
            this.setState({
                errorsForm: {
                  ...this.state.errorsForm,
                  seccion: 'Debe seleccionar al menos un seccion'
                }
              });
        }else{
            this.setState({
                errorsForm: {
                  ...this.state.errorsForm,
                  seccion: ''
                }
              });
        }   
    }
    onRemovSecciones = (selectedList, _removedItem) => {
        this.setState({
            listSeccionesSeleted : selectedList
        })
        if(selectedList.length<1){
            this.setState({
                errorsForm: {
                  ...this.state.errorsForm,
                  seccion: 'Debe seleccionar al menos una sección'
                }
              });
        }else{
            this.setState({
                errorsForm: {
                  ...this.state.errorsForm,
                  seccion: ''
                }
              });
        }
    }
    handleSubmitBs = async e =>{
        e.preventDefault();
        this.setState({loading: true});
        await this.validateFormPreSubmit();
        if(this.validateForm(this.state.errorsForm)) {
            await this.construcObjt();
            await this.AddSalaSeccionCupo();
        }else{
            console.error('Invalid Form')
        }
        this.setState({loading: false});
    }
    construcObjt = async function(){
        let objectTosend= {
            id_sala:this.state.idSala,
            id_seccion:getFirtsEmentArray(this.state.listSeccionesSeleted),
            cupo_promo: this.state.cupoSeccion,
        }
        this.setState({objectTosend:  objectTosend});        
        console.log('OBJ PROMOTORAS::::::----',objectTosend)
    }
    AddSalaSeccionCupo = async function(){
        try{
         await AdminServices.storeSalaSeccionCupo(this.state.objectTosend).then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                swal({
                    title: `Cupo se Seccion Agregado con Éxito`,
                    text: "!",
                    icon: "success",
                    button: "Ok!",
                });
                this.getSeccionesCupo();
                this.setState({cupoSeccion:  null , listSeccionesSeleted:null});
                //this.props.history.push("/CampanasPromotoras")
            }else{
                    swal({
                        title: `Error ${data.errorInfo.toString()} `,
                        text: "!",
                        icon: "error",
                        button: "Ok!",
                    });
                }
            })
        } catch(error){
            this.setState({loading:false , error: error})
        }
    }
    getSalaSeccionCupo = async function(salaId ,seccionId){
        await AdminServices.getSalaSeccionCupos(salaId ,seccionId).then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                console.log('validación pre guardado' , data);
                this.setState({salaSeccionCupoPreSave: data.data });
            }else{
                this.setState({ loading:false , error : data.error})
            }
        })
    }
    async validateFormPreSubmit(){
        await this.getSalaSeccionCupo(this.state.idSala, getFirtsEmentArray(this.state.listSeccionesSeleted).id);
        let errors = this.state.errorsForm;
        errors.cupo_seccion ='';
        errors.seccion='';
        errors.cupo_total = '';
        errors.cupo_disponible = '';
        if(this.state.listSeccionesSeleted === null){
            errors.seccion='Debe Seleccionar al menos 1 sección !'; 
        }
        if(this.state.cupoTotalSala === null || this.state.cupoTotalSala <= 0 ||  this.state.cupoTotalSala==''){
            errors.cupo_total = 'Cupo Total de la Sala es requerido';
        }
        if(this.state.cupoSeccion === null || this.state.cupoSeccion <= 0 ||  this.state.cupoSeccion==''){
            errors.cupo_seccion = 'Cupo de la seccion es requerido';
        }
        if(this.state.cupoTotalSala < (Number(this.state.cupoTotalUtilizadoSala)+Number(this.state.cupoSeccion))){
            errors.cupo_disponible = 'No se puede agregar el cupo de la seccion Verifique el cupo total de la sala';
        }
        if(this.state.salaSeccionCupoPreSave.length>0){
            errors.cupo_disponible = 'Cupo de la seccion ya fue agregado verifique y elimine si desea cambiar su valor';
        }
        console.log('errores antes del submit' , errors)
        this.setState({errorsForm:errors});
    }
    validateForm = (errors) => {
        let valid = true;
        Object.values(errors).forEach(
          (val) => val.length > 0 && (valid = false)
        );
        return valid;
    }
    seccionFormater (cell){
        let namesCad = cell.nombre
        return namesCad;
    }
    actionsFormater(cell , row){
        return(
        <div>
           &emsp;
            <button  title="Eliminar"   className="btn btn-danger" onClick={() => {this.deleteSalaSeccionCupo(row.id)}}> <FontAwesomeIcon icon={faTrashAlt} /> </button>
            &emsp;
        </div>
        )
    }
    deleteSalaSeccionCupo = async function(SeccionCupo){
        console.log('pruebaaaa')
        this.setState({loadinSeccionesCupos:true , error: null})
        swal({
            title: "Esta seguro que desea Eliminar el cupo?",
            text: "No podrá recuperar los datos de la misma!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                try{
                    AdminServices.deleteSalaSeccionCupo(SeccionCupo).then((data) => {
                        if(!data.hasOwnProperty('errorInfo')){
                        swal({
                            title: `Cupo eliminado con éxito`,
                            text: "!",
                            icon: "success",
                            button: "Ok!",
                        });
                        this.getSeccionesCupo();
                        }else{
                            swal({
                                title: `Error ${data.errorInfo.toString()} `,
                                text: "!",
                                icon: "error",
                                button: "Ok!",
                            });
                        }
                    })
                    this.setState({loadinSeccionesCupos:false , error: null})
                } catch(error){
                    this.setState({loadinSeccionesCupos:false , error: error})
                }
            }
        });
    }
    render() {
        return (
            <SalaCupo 
            state = {this.state}
            onlyNumber={this.onlyNumber}
            handleChangeI={this.handleChangeI}
            onSelectSecciones={this.onSelectSecciones}
            onRemovSecciones={this.onRemovSecciones}
            handleSubmitBs={this.handleSubmitBs}>
            </SalaCupo>
        )
    }
}
