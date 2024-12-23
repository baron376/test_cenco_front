import React, { Component } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Multiselect } from 'multiselect-react-dropdown';
import 'react-dropzone-uploader/dist/styles.css';
import Dropzone from 'react-dropzone-uploader';
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../../styles/faldones.css';
import LoadingOverlay from 'react-loading-overlay';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
export default class EditFaldones extends Component {
    render() {
        const dataAll = this.props.state;
        const propsInt = this.props;
        if(this.props.state.fileEdit){
        return (
                <div className="col-10 tabs cont-height">
                    <LoadingOverlay active={dataAll.loading} spinner text='Cargando contenido...' >
                    <h2 className="mt-4 mb-4 font-weight-bold pl-3">Editar Campaña Faldones</h2>
                    <form  onSubmit={propsInt.handleSubmitBs}>
                    
                        <div className="modal-body">
                        <div className="form-group">
                            <label htmlFor className="col-sm-2 col-form-label">Cadena:</label>
                            <div className="col-sm-6">
                            <div className="form-check form-inline pt-1 pl-0 row" onChange={propsInt.handleCheckChieldElement}>
                                {dataAll.listaCadenasCreate.map(({ id , nombre , isChecked} , i) =>(
                                    <div className="form-inline col-sm-4">
                                    <input  name='cadena' id='cadena' className="form-check-input" type="radio" value={id} checked={isChecked}/>
                                     
                                    <label className="form-check-label" htmlFor>{nombre}</label>
                                    </div>
                                ))}
                            </div>
                            {dataAll.errorsForm.cadenas.length > 0 && <span className='error error-class-i'>{dataAll.errorsForm.cadenas}</span>}
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor className="col-sm-2 col-form-label">Nombre:</label>
                            <div className="col-sm-6">
                            <input type="text" onKeyDown={propsInt.onlyLetter}  value={dataAll.name} onChange={propsInt.handleChangeI} className="form-control" id="name" name="name" placeholder="Ingrese Nombre de la Campaña" />
                            {dataAll.errorsForm.name.length > 0 && <span className='error error-class-i'>{dataAll.errorsForm.name}</span>}
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor className="col-sm-2 col-form-label">Desde:</label>
                            <div className="col-sm-6">
                            <DatePicker className="input-datapiker" dateFormat="dd/MM/yyyy" selected={dataAll.dateFrom} onChange={(date) => propsInt.setDateFrom(date)} > </DatePicker>
                            &emsp;<FontAwesomeIcon icon={faCalendar} />
                            {dataAll.errorsForm.datefrom.length > 0 && <span className='error error-class-i'>{dataAll.errorsForm.datefrom}</span>}
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor className="col-sm-2 col-form-label">Hasta:</label>
                            <div className="col-sm-3">
                            <DatePicker className="input-datapiker" dateFormat="dd/MM/yyyy" selected={dataAll.dateTo} onChange={(date) => propsInt.setDateTo(date)} > </DatePicker>
                            &emsp;<FontAwesomeIcon icon={faCalendar} />
                            {dataAll.errorsForm.dateto.length > 0 && <span className='error error-class-i'>{dataAll.errorsForm.dateto}</span>}
                            </div>
                        </div>
                        

                        <div className="form-group">
                            <label htmlFor className="col-sm-2 col-form-label">Salas:</label>
                            <div className="col-sm-6">
                            <Multiselect
                                selectionLimit="1"
                                options={dataAll.listSalasCreated} 
                                onSelect={propsInt.onSelectSalas} 
                                onRemove={propsInt.onRemoveSalas}
                                selectedValues={dataAll.listSalasSeleted} 
                                displayValue="display_nombre_sap" 
                            />
                            </div>
                            <div className="col-sm-2 mt-2">
                            {/* <a href="/prueba" className="btn-link">Preview</a> */}
                            </div>
                            <div className="col-sm-12">
                                <div className='row'>
                                <div className='col-sm-2'>
                                </div>
                                <div className='col-sm-6'>
                                {dataAll.errorsForm.sala.length > 0 && <span className='error error-class-i'>{dataAll.errorsForm.sala}</span>}
                                </div>
                                </div>
                            </div>
                        </div>


                        <div className="form-group">
                            <label htmlFor className="col-sm-2 col-form-label">Plantilla:</label>
                            <div className="col-sm-6">
                            <Multiselect
                                selectionLimit="1"
                                options={dataAll.listPlantillasCreated} 
                                onSelect={propsInt.onSelectPlantillas} 
                                onRemove={propsInt.onRemovePlantillas}
                                selectedValues={dataAll.listPlantillasSeleted} 
                                displayValue="descripcion" 
                            />
                            </div>
                            <div className="col-sm-2 mt-2">
                            {/* <a href="/prueba" className="btn-link">Preview</a> */}
                            </div>
                            <div className="col-sm-12">
                                <div className='row'>
                                <div className='col-sm-2'>
                                </div>
                                <div className='col-sm-6'>
                                {dataAll.errorsForm.plantilla.length > 0 && <span className='error error-class-i'>{dataAll.errorsForm.plantilla}</span>}
                                </div>
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor className="col-sm-2 col-form-label">Formato:</label>
                            <div className="col-sm-6">
                            <Multiselect
                                selectionLimit="1"
                                options={dataAll.listaFormatCreate} 
                                onSelect={propsInt.onSelectFormatos} 
                                onRemove={propsInt.onRemoveFormatos}
                                selectedValues={dataAll.listaFormatSeleted} 
                                displayValue="nombre" 
                            />
                            </div>
                            <div className="col-sm-12">
                                <div className='row'>
                                <div className='col-sm-2'>
                                </div>
                                <div className='col-sm-6'>
                                {dataAll.errorsForm.formato.length > 0 && <span className='error error-class-i'>{dataAll.errorsForm.formato}</span>}
                                </div>
                                </div>
                            </div>
                        </div>
                        <div className="form-group row" >
                            <label htmlFor className="col-sm-2 col-form-label">QR:</label>
                            <div className="col-sm-6 row" onChange={propsInt.onChangeValueQr}>
                            {dataAll.listaQrOptions.map(({ value , nombre , isChecked} , i) =>(
                                <div className="form-check form-inline col-sm-6">
                                 <input type="radio" value={value} name='qr_option' id='qr_option' checked={isChecked} />
                                 <label className="form-check-label" htmlFor="exampleRadios1">{nombre}</label>
                                </div>
                            ))}
                            </div>
                            <div className="col-sm-12">
                                <div className='row'>
                                <div className='col-sm-2'>
                                </div>
                                <div className='col-sm-6'>
                                {dataAll.errorsForm.qr.length > 0 && <span className='error error-class-i'>{dataAll.errorsForm.qr}</span>}
                                </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor className="col-sm-2 col-form-label">Cargar Archivo:</label>
                            <div className="col-sm-6">
                            <div className="custom-file">
                                 <Dropzone
                                    accept="*,.xls,.xlsx"
                                    minSizeBytes="1"
                                    maxSizeBytes="1000000"
                                    maxFiles={1}
                                    multiple={false}
                                    initialFiles={[dataAll.fileEdit]}
                                    inputContent="Arrastre o seleccione su documento"
                                    getUploadParams={propsInt.getUploadParams}
                                    onChangeStatus={propsInt.handleChangeStatus}
                                    styles={{ dropzone: { minHeight: 100, maxHeight: 150 } }}
                                >
                                </Dropzone>
                            </div>
                            </div>
                            {!dataAll.changeFile &&
                            <div  className="col-sm-2"> <a target="_blank" href={dataAll.urlFileToDownload}> <button type="button" className="btn btn-success">Descargar</button> </a></div>
                            }
                            
                            </div>
                        </div>
                        <div className="col-sm-4"></div>
                            <div className="col-sm-12">
                                <div className='row'>
                                <div className='col-sm-2'>
                                </div>
                                <div className='col-sm-6'>
                                {dataAll.errorsForm.file.length > 0 && <span className='error error-class-i'>{dataAll.errorsForm.file}</span>}
                                </div>
                                </div>
                            </div>
                        
                        <div className="form-group">&emsp; &emsp;</div>
                        <div className="form-group row" >
                        <div className="">
                        <button type="submit" className="btn btn-primary">Guardar</button>
                        <Link to='/Faldones'> <button type="button" className="btn btn-outline-primary" data-dismiss="modal">Volver</button> </Link>
                        </div>
                        </div>
                    </form>
                    </LoadingOverlay>
                </div>

            )
        }else{
             return (
                <div className="col-10 tabs cont-height">
                <LoadingOverlay active={dataAll.loading} spinner text='Cargando contenido...' >
                    <div className="modal-body">
                    </div>
                </LoadingOverlay>
                </div>)
        }
    }
}
