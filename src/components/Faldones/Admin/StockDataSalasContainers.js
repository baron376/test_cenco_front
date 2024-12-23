import React, { Component } from 'react';
import StockDataSalas from '../Admin/StockDataSalas';
import FaldonesServices from '../../../services/FaldonesServices';
import {customFormatterDate } from '../../../util/formats';
import AdminServices from '../../../services/AdminServices';
import env from "react-dotenv";

export default class StockDataSalasContainers extends Component {

    state = {
        idCampanaFaldon :null,
        faldonDetailsData:null,
        nombreCampana:'',
        loadingStock:false,
        loading : false,
        error : '',
        name:'',
        dateFrom:null,
        dateTo:'',
        listSalasUser:[],
        salaSelect:null,
        salaSelectId:null,
        dataStockSala:[],
        headData:[{
            dataField: '',
            text: ''
          }],
        baseUrl:null,
        registerDesactivateOrActivate:null
    }
    constructor(){
        super();
        this.getDetailsFaldon.bind(this)
    }
    async componentDidMount(){
        await this.getDetailsFaldon();
        await this.preSelectObject();
        await this.getSalasForLoadStockFaldon();
        await this.trasfData();
    }
    trasfData = async function(){
        this.setState({
            loading:true,
        });
        const columns = [
          {
                dataField: 'count_robot',
                text: 'ID',
                headerStyle: {
                    width: '3%'
                  },
                  sort: true,
          },
          {
                dataField: 'seccion',
                text: 'SECCION',
                headerStyle: {
                    width: '4%'
                },
                sort: true,
          },
          {
                dataField: 'sap',
                text: 'SAP',
                headerStyle: {
                    width: '8%'
                },
                sort: true,
          },
          {
                dataField: 'descripcion',
                text: 'DESCRIPCIÓN',
                headerStyle: {
                    width: '15%'
                },
                sort: true,
          },
          {
            dataField: 'medio',
            text: 'MEDIO',
            headerStyle: {
                width: '7%'
            },
            sort: true,
          },
          {
            dataField: 'tmp',
            text: 'TMP',
            headerStyle: {
                width: '5%'
            },
            sort: true,
          },
          {
            dataField: 'fecha_inicio',
            text: 'FECHA INICIO PROMO',
            headerStyle: {
                width: '10%'
            },
            sort: true,
          },
          {
            dataField: 'fecha_termino',
            text: 'FECHA TERMINO PROMO',
            headerStyle: {
                width: '10%'
            },
            sort: true,
          },
          {
            dataField: 'stock',
            text: 'ACTIVO',
            headerStyle: {
                width: '10%'
            },
            sort: true,
          },
          {
            dataField: 'actions',
            text: 'Dis',
            formatter:this.actionsFormater.bind(this),
            headerStyle: {
                width: '3%'
              }
        },
        ];
          this.setState({
            loading:false,
            headData: columns,
        });
    }
    actionsFormater(cell , row){
   
        return(
            <div>
                &emsp;
                <input name="isGoing" type="checkbox" checked={row.dis}  onChange={() => {this.onChangeCheck(row.id)}}  />
            </div>
            )
        
        
    }
    getDetailsFaldon = async function(){
        this.setState({loading:true , error: null , idCampanaFaldonToEdit:this.props.match.params.id , idCampanaFaldon:this.props.match.params.id })
        const BaseUrl = env.REACT_APP_BASE_URL;
        this.setState({baseUrl:BaseUrl })
        let idCampanaFaldontoEdit = this.props.match.params.id;
        await FaldonesServices.getCampanaDetail(idCampanaFaldontoEdit).then((data) => {
            console.log('data del detalle' , data);
                if(!data.hasOwnProperty('errorInfo')){
                    this.setState({
                        loading:false,
                        faldonDetailsData: data.data,
                    });
                }else{
                    this.setState({ loading:false , error : data.error})
                }
            })
    }
    preSelectObject = async function(){
        this.setState({loading:true , error: null})
        let localname = this.state.faldonDetailsData.nombre;
        let localfrom = customFormatterDate(this.state.faldonDetailsData.desde);
        let localto = customFormatterDate(this.state.faldonDetailsData.hasta);
        this.setState(
            {loading:false, 
             error: null ,
             name:localname,
             dateFrom:localfrom,
             dateTo:localto,
             nombreCampana:localname
         })
     }
     getSalasForLoadStockFaldon = async function(){
        this.setState({loading:true , error: null})
        let idCampanaFaldontoEdit = this.props.match.params.id;
         await AdminServices.getSalasForCampanaUser(idCampanaFaldontoEdit).then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                this.setState({
                    loading:false,
                    listSalasUser: data.data,
                });
            }else{
                this.setState({ loading:false , error : data.error})
            }
        });
    }
    onSelectSalas = (selectedList, _selectedItem) =>{
        this.setState({
            salaSelect : selectedList,
            salaSelectId : _selectedItem.id
        })
        this.getStockCampanaSala(_selectedItem.id);
      
    }
    getStockCampanaSala = async function(idSala){
        this.setState({loadingStock:true , error: null})
        let idCampanaFaldontoEdit = this.props.match.params.id;
         await FaldonesServices.getStockCampanaDetailsSala(idCampanaFaldontoEdit , idSala).then((data) => {
             console.log('esto es la data del stock' , data);
            if(!data.hasOwnProperty('errorInfo')){
                this.setState({
                    loadingStock:false,
                    dataStockSala: data.data,
                });
            }else{
                this.setState({ loadingStock:false , error : data.error})
            }
        });
    }
    onRemoveSalas = (selectedList, _removedItem) => {
        this.setState({
            salaSelect : selectedList
        })
    }
    downloadExcelStock = (idCampana , idSala)=>{
        this.setState({loadingStock:true , error: null});
          FaldonesServices.getDownloadStockCampanaDetailsSala(idCampana , idSala).then((data) => {
             console.log('esto es la data del descargar' , data);
            if(!data.hasOwnProperty('errorInfo')){
                    let responseLocal = data.data;
                    let linkSource = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${responseLocal.content}`;
                    let downloadLink = document.createElement("a");
                    let fileName = responseLocal.nombre_archivo;
                    downloadLink.href = linkSource;
                    downloadLink.download = fileName;
                    downloadLink.click();
                this.setState({
                    loadingStock:false,
                });
            }else{
                this.setState({ loadingStock:false , error : data.error})
            }
        });
    }
    onChangeCheck = async function(idstock){
        console.log('esto es el stock' , idstock);
        this.setState({loadingStock:true , error: null})
         await FaldonesServices.getDesactivateStockCampanaSala(idstock).then((data) => {
             console.log('desactivate stock' , data);
            if(!data.hasOwnProperty('errorInfo')){
                let registerChange = data.data;
                this.setState({
                    loadingStock:false,
                    registerDesactivateOrActivate: data.data,
                });
            }else{
                this.setState({ loadingStock:false , error : data.error})
            }
        });
        await this.getStockCampanaSala(this.state.salaSelectId);
    }
    render() {
        return (
            <StockDataSalas
            state = {this.state}
            onSelectSalas={this.onSelectSalas}
            onRemoveSalas={this.onRemoveSalas}
            downloadExcelStock={this.downloadExcelStock}
            onChangeCheck={this.onChangeCheck}> 
            </StockDataSalas>
        )
    }
}
