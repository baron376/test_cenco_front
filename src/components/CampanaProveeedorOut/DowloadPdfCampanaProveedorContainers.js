import React, { Component } from 'react'
import CampanaServices from '../../services/CampanasServices';
import swal from 'sweetalert';
import LoadingOverlay from 'react-loading-overlay';
import '../../components/styles/dowload.css'
export default class DowloadPdfCampanaProveedorContainers extends Component {

    state = {
        dataActive:[],
        dataDeteted:[],
        headData:[{
            dataField: '',
            text: ''
          }],
          loadingFaldones:false,
          error:null,
          loading:false,
          loadingDescarga:false
    }

    async componentDidMount(){
        await this.downloadFaldon();
    }

    downloadFaldon= async () =>{
        let campanaPdf = this.props.match.params.id;
        this.setState({loadingDescarga:true , error: null})
        try{
            CampanaServices.downloadDetailsCampana(campanaPdf).then((data) => {
                if(!data.hasOwnProperty('errorInfo')){
                    let responseLocal = data.data;
                    let linkSource = `data:application/octet-stream;base64,${responseLocal.content}`;
                    let downloadLink = document.createElement("a");
                    let fileName = responseLocal.nombre_archivo;
                    downloadLink.href = linkSource;
                    downloadLink.download = fileName;
                    downloadLink.click();
                    this.setState({loadingDescarga:false , error: null})
                swal({
                    title: `PDF descargado con éxito`,
                    text: "!",
                    icon: "success",
                    button: "Ok!",
                });
                }else{
                    swal({
                        title: `Error`,
                        text: "!",
                        icon: "error",
                        button: "Ok!",
                    });
                }
            })
          
        } catch(error){
            this.setState({loadingDescarga:false , error: error})
        }
    }


    render() {
        return (
            <LoadingOverlay active={this.state.loadingDescarga} spinner text='Descargando archivo...' >
            <div className="col-10 tabs heidtmp">
                
            </div> 
            </LoadingOverlay>  
        )
    }
}
