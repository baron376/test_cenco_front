import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Multiselect } from 'multiselect-react-dropdown';
import 'react-dropzone-uploader/dist/styles.css';
import Dropzone from 'react-dropzone-uploader';
import { faCalendar, faPlus, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../../styles/faldones.css';
import LoadingOverlay from 'react-loading-overlay';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

export default class EditFaldonesExpress extends Component {
    state = {
        datefrom: '',
        sapInfoVisible: false,
        precioInfoVisible: false,
        tmpInfoVisible: false,
        tcInfoVisible: false,
        showCombinacion: false,
        faldones: [{
            name: '',
            cod_barra: '',
            precio_referencia_moda: '',
            tmp: '',
            tc: '',
            financiamiento: '',
            dateFrom: null,
            dateTo: null,
            umb: '',
            cuotas: '',
            cae: '',
            costo_total: '',
            showCuotasCaeCostoTotal: false,
            tipos_promo_selected: [],
            combinacion: '',
            showCombinacion: false
        }],
        showNewFaldonFields: false,
        faldonesCreados: [],
        numFaldones: 1,
        nextFaldonIndex: 1,
    };

    toggleSapInfo = () => {
        this.setState((prevState) => ({
            sapInfoVisible: !prevState.sapInfoVisible,
        }));
    };

    handleNewFaldonChange = (e) => {
        const { name, value } = e.target;
        this.setState(prevState => ({
            newFaldon: {
                ...prevState.newFaldon,
                [name]: value
            }
        }));
    }

    addNewFaldon = () => {
        const nuevosfaldones = [...this.state.faldones];
        nuevosfaldones.push({
            id: nuevosfaldones.length, name: null, cod_barra: null, precio_referencia_moda: null, tmp: null, tc: null,
            dateFrom: null, dateTo: null, cuotas: '', cae: '', costo_total: '', tipos_promo: '', tipos_promo_selected: [], combinacion: ''
        });
        this.setState({ faldones: nuevosfaldones }, () => {
            this.props.setFechasAr(nuevosfaldones);
        });
        console.log("Algo alante ----- ", this.state.faldones);
    };

    deleteFaldon = (index) => {
        this.setState(prevState => ({
            faldones: prevState.faldones.filter((_, i) => i !== index),
        }));
    };

    handleChangeFaldon = (e, index) => {
        const { name, value } = e.target;
        this.setState(prevState => ({
            faldones: prevState.faldones.map((faldon, i) =>
                i === index ? { ...faldon, [name]: value } : faldon
            ),
        }));
    };

    handleChangeFaldonDate = (date, index, field) => {
        this.setState(prevState => ({
            faldones: prevState.faldones.map((faldon, i) =>
                i === index ? { ...faldon, [field]: date } : faldon
            )
        }));
    };

    handleMultiselectChange(selectedList, index, fieldName) {
        const nuevosfaldones = [...this.state.faldones];
        nuevosfaldones[index][fieldName] = selectedList[0];

        if (fieldName === 'tipos_promo' && selectedList[0].nombre === 'PACK') {
            nuevosfaldones[index].showCombinacion = true;
        }

        this.setState({ faldones: nuevosfaldones });
    }

    handleMultiselectRemove(selectedItem, index, fieldName) {
        const nuevosfaldones = [...this.state.faldones];
        nuevosfaldones[index][fieldName] = '';
        nuevosfaldones[index].tipos_promo_selected = [];
        console.log(fieldName)
        if (fieldName === 'tipos_promo') {
            nuevosfaldones[index].showCombinacion = false;
           }
        this.setState({ faldones: nuevosfaldones });
    }

    handleChangeFaldonFinanciamiento = (e, index) => {
        const { value } = e.target;
        const { faldones } = this.state;
        faldones[index].financiamiento = value;
        faldones[index].showCuotasCaeCostoTotal = (value === '1');
        this.setState({ faldones });
    };

    async setFaldonesHijo(){
        let fechasint = this.props.state;
        this.setState({ faldones: this.props.state.faldones });
    }

    render() {
        const dataAll = this.props.state;
        console.log('dataAll:::', dataAll);
        const propsInt = this.props;
        const { faldones } = this.state;
        console.log(this.state);
        //this.state.faldones= this.props.state.faldones;
        const { showNewFaldonFields, newFaldon, faldonesCreados, numFaldones, showCuotasCaeCostoTotal } = this.state;
        return (
            <div className="col-10 tabs cont-height">
                <LoadingOverlay active={dataAll.loading} spinner text='Cargando contenido...'>
                    <LoadingOverlay active={dataAll.loadingCreated} spinner text='Validando Archivo ......'>
                        <h2 className="mt-4 mb-4 font-weight-bold pl-3">Editar Faldón Express</h2>
                        <form onSubmit={propsInt.handleSubmitBs}>
                            <div className="modal-body">
                                <div className="form-group row" style={{ marginLeft: '10px' }}>
                                    <div className="col-sm-5">
                                        <label htmlFor="cadena" className="col-form-label"><strong>Cadena</strong></label>
                                        <Multiselect
                                            singleSelect
                                            options={dataAll.listaCadenasCreate || []}
                                            onSelect={propsInt.onSelectCadenas}
                                            onRemove={propsInt.onRemovCadenas}
                                            selectedValues={dataAll.listaCadenasSeleccionadas}
                                            displayValue="nombre"
                                            placeholder="Seleccionar" />
                                    </div>

                                    <div className="col-sm-5">
                                        <label htmlFor="plantilla" className="col-form-label"><strong>Plantilla:</strong></label>
                                        <Multiselect
                                            selectionLimit="1"
                                            options={dataAll.listPlantillasCreated || []}
                                            onSelect={propsInt.onSelectPlantillas}
                                            onRemove={propsInt.onRemovePlantillas}
                                            selectedValues={dataAll.listPlantillasSeleted}
                                            displayValue="descripcion" />
                                    </div>
                                </div>

                                <div className="form-group row" style={{ marginLeft: '10px' }}>
                                    <div className="col-sm-5">
                                        <label htmlFor="formato" className="col-form-label"><strong>Formato</strong></label>
                                        <Multiselect
                                            selectionLimit="1"
                                            options={dataAll.listaFormatCreate || []}
                                            onSelect={propsInt.onSelectFormatos}
                                            onRemove={propsInt.onRemoveFormatos}
                                            selectedValues={dataAll.listaFormatSeleted}
                                            displayValue="nombre" />
                                    </div>
                                    {dataAll.errorsForm.formato.length > 0 && <span className='error error-class-i'>{dataAll.errorsForm.formato}</span>}
                                </div>

                                {faldones.map((faldon, index) => (
                                    <div key={index}>
                                        {/* Financiamiento Section */}
                                        <div className="form-group row" style={{ marginLeft: '10px' }}>
                                            <div className="col-sm-5">
                                                <label htmlFor className="col-form-label"><strong>Financiamiento:</strong></label>
                                                <div className="col-sm-6 row">
                                                    {dataAll.listaOptions.map(({ value, nombre }, i) => (
                                                        <div className="form-check form-inline col-sm-6" key={i}>
                                                            <input 
                                                                type="radio" 
                                                                value={value} 
                                                                name={`finan_option_${index}`} 
                                                                id={`finan_option_${index}_${i}`} 
                                                                style={{ marginRight: '10px' }} 
                                                                checked={faldon.financiamiento === value}
                                                                onChange={(e) => this.handleChangeFaldonFinanciamiento(e, index)}
                                                            />
                                                            <label className="form-check-label" htmlFor={`finan_option_${index}_${i}`}>{nombre}</label>
                                                        </div>
                                                    ))}
                                                </div>
                                                {faldon.errors?.financiamiento && <span className='error error-class-i'>{faldon.errors.financiamiento}</span>}
                                            </div>
                                        </div>
                                        {faldon.showCuotasCaeCostoTotal && (
                                            <div>
                                                <div className="form-group row" style={{ marginLeft: '10px' }}>
                                                    <div className="col-sm-5">
                                                        <label htmlFor="cuotas" className="col-form-label"><strong>Cuotas</strong></label>
                                                        <input 
                                                            type="text" 
                                                            onKeyDown={propsInt.onlyNumber}  
                                                            value={faldon.cuotas} 
                                                            onChange={(e) => this.handleChangeFaldon(e, index)} 
                                                            className="form-control input-custom" 
                                                            id="cuotas"
                                                            name="cuotas" 
                                                            placeholder="Cuotas"
                                                            disabled={!faldon.showCuotasCaeCostoTotal} // Deshabilitar el input
                                                        />
                                                        {faldon.errors?.cuotas && <span className='error error-class-i'>{faldon.errors.cuotas}</span>}
                                                    </div>

                                                    <div className="col-sm-5">
                                                        <label htmlFor="cae" className="col-form-label"><strong>CAE</strong></label>
                                                        <input 
                                                            type="number"  
                                                            value={faldon.cae} 
                                                            onChange={(e) => this.handleChangeFaldon(e, index)} 
                                                            className="form-control input-custom" 
                                                            id="cae"  
                                                            name="cae" 
                                                            placeholder="CAE"
                                                            disabled={!faldon.showCuotasCaeCostoTotal} // Deshabilitar el input
                                                        />
                                                        {faldon.errors?.cae && <span className='error error-class-i'>{faldon.errors.cae}</span>}
                                                    </div>
                                                </div>

                                                <div className="form-group row" style={{ marginLeft: '10px' }}>
                                                    <div className="col-sm-5">
                                                        <label htmlFor="costo_total" className="col-form-label"><strong>Costo Total</strong></label>
                                                        <input 
                                                            type="text" 
                                                            onKeyDown={propsInt.onlyNumber}  
                                                            value={faldon.costo_total} 
                                                            onChange={(e) => this.handleChangeFaldon(e, index)} 
                                                            className="form-control input-custom" 
                                                            id="costo_total" 
                                                            name="costo_total" 
                                                            placeholder="Costo Total"
                                                            disabled={!faldon.showCuotasCaeCostoTotal} // Deshabilitar el input
                                                        />
                                                        {faldon.errors?.costo_total && <span className='error error-class-i'>{faldon.errors.costo_total}</span>}
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        <div className="form-group row" style={{ marginLeft: '10px' }}>
                                            <div className="col-sm-5">
                                                <label htmlFor="name" className="col-form-label"><strong>Nombre genérico oferta:</strong></label>
                                                <input 
                                                    type="text" 
                                                    value={faldon.name} 
                                                   // selected={faldon[index].nombre}
                                                    onChange={(e) => this.handleChangeFaldon(e, index)}
                                                    className="form-control input-custom" 
                                                    id="name" 
                                                    name="name" 
                                                    placeholder="Ingresar nombre genérico de la oferta"/>
                                                {faldon.errors && faldon.errors.name && <span className='error error-class-i'>{faldon.errors.name}</span>}
                                            </div>
                                            <div className="col-sm-5 position-relative">
                                                <label htmlFor="cod_barra" className="col-form-label">
                                                    <strong>SAP código de barra</strong>
                                                    <FontAwesomeIcon
                                                        icon={faInfoCircle}
                                                        style={{ marginLeft: '5px', cursor: 'pointer' }}
                                                        onClick={this.toggleSapInfo}
                                                    />
                                                </label>
                                                <div style={{ position: 'relative', width: '100%' }}>
                                                    <input 
                                                        type="text" 
                                                        onKeyDown={propsInt.onlyNumber}  
                                                        value={faldon.cod_barra} 
                                                        onChange={(e) => this.handleChangeFaldon(e, index)} 
                                                        className="form-control input-custom" 
                                                        id="cod_barra" 
                                                        name="cod_barra" 
                                                        placeholder="Ingresar sap o código de barra"
                                                    />
                                                    {this.state.sapInfoVisible && (
                                                        <div 
                                                            className="sap-info-modal"
                                                            style={{
                                                                position: 'absolute',
                                                                top: '-100%', // Mover arriba para estar encima del icono
                                                                left: '50%', // Centrar respecto al input
                                                                transform: 'translateX(-100%)', // Centrar respecto al input
                                                                backgroundColor: '#062a4e', // Fondo azul
                                                                color: 'white', // Texto blanco
                                                                border: '1px solid #ccc',
                                                                padding: '10px',
                                                                borderRadius: '5px',
                                                                boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.1)',
                                                                zIndex: '9999'
                                                            }}
                                                        >
                                                            <p>Falta completar este campo.</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-group row" style={{ marginLeft: '10px' }}>
                                            <div className="col-sm-5">
                                                <label htmlFor="umb" className="col-form-label"><strong>UMB:</strong></label>
                                                <Multiselect
                                                    selectionLimit="1"
                                                    options={dataAll.listaUmbCreate} 
                                                    onSelect={(selectedList) => this.handleMultiselectChange(selectedList, index, 'umb')}
                                                    onRemove={(selectedItem) => this.handleMultiselectRemove(selectedItem, index, 'umb')}
                                                    selectedValues={faldon.umbSelected} 
                                                    displayValue="nombre"/>
                                            </div>

                                            <div className="col-sm-5">
                                                <label htmlFor="precio_referencia_moda" className="col-form-label"><strong>Precio Referencia:</strong></label>
                                                <input 
                                                    type="text" 
                                                    onKeyDown={propsInt.onlyNumber}  
                                                    value={faldon.precio_referencia_moda} 
                                                    onChange={(e) => this.handleChangeFaldon(e, index)}
                                                    className="form-control input-custom" 
                                                    id="precio_referencia_moda" 
                                                    name="precio_referencia_moda" 
                                                    placeholder="Ingresar precio referencia"/>
                                                {faldon.errors && faldon.errors.precio_referencia_moda.length > 0 && <span className='error error-class-i'>{faldon.errors.precio_referencia_moda}</span>}
                                            </div>
                                        </div>
                                        
                                        <div className="form-group row" style={{ marginLeft: '10px' }}>
                                            <div className="col-sm-5">
                                                <label htmlFor="tipos_promo" className="col-form-label"><strong>Tipos Promo</strong></label>
                                                <Multiselect
                                                    selectionLimit="1"
                                                    options={dataAll.listaTiposPromosCreated} 
                                                    onSelect={(selectedList) => this.handleMultiselectChange(selectedList, index, 'tipos_promo')}
                                                    onRemove={(selectedItem) => this.handleMultiselectRemove(selectedItem, index, 'tipos_promo')}
                                                    selectedValues={faldon.tipos_promo_selected} 
                                                    displayValue="nombre"/>
                                            </div>

                                            {faldon.showCombinacion && (
                                                <div className="col-sm-5">
                                                    <label htmlFor="combinacion" className="col-form-label"><strong>Combinación:</strong></label>
                                                    <input 
                                                        type="text" 
                                                        value={faldon.combinacion} 
                                                        onChange={(e) => this.handleChangeFaldon(e, index)} 
                                                        className="form-control input-custom" 
                                                        name="combinacion" 
                                                        placeholder="Combinación"/>
                                                    {dataAll.errorsForm.combinacion.length > 0 && <span className='error error-class-i'>{dataAll.errorsForm.combinacion}</span>}
                                                </div>
                                            )}
                                        </div>

                                        <div className="form-group row" style={{ marginLeft: '10px' }}>
                                            <div className="col-sm-5">
                                                <label htmlFor="tmp" className="col-form-label"><strong>Tmp</strong></label>
                                                <input 
                                                    type="text" 
                                                    onKeyDown={propsInt.onlyNumber}  
                                                    value={faldon.tmp} 
                                                    onChange={(e) => this.handleChangeFaldon(e, index)}
                                                    className="form-control input-custom" 
                                                    id="tmp" 
                                                    name="tmp" 
                                                    placeholder="TMP" />
                                                {faldon.errors && faldon.errors.tmp && <span className='error error-class-i'>{faldon.errors.tmp}</span>}
                                            </div>

                                            <div className="col-sm-5">
                                                <label htmlFor="tc" className="col-form-label"><strong>TC</strong></label>
                                                <input 
                                                    type="text" 
                                                    onKeyDown={propsInt.onlyNumber}  
                                                    value={faldon.tc} 
                                                    onChange={(e) => this.handleChangeFaldon(e, index)} 
                                                    className="form-control input-custom" 
                                                    id="tc" 
                                                    name="tc" 
                                                    placeholder="TC" />
                                                {faldon.errors && faldon.errors.tc && <span className='error error-class-i'>{faldon.errors.tc}</span>}
                                            </div>
                                        </div>

                                        <div className="form-group row" style={{ marginLeft: '10px' }}>
                                            <div className="col-sm-5">
                                                <label htmlFor="desde" className="col-form-label"><strong>Desde:</strong></label>
                                                <div>
                                                    <DatePicker
                                                        showIcon
                                                        className="input-datapiker input-custom date-picker"
                                                        dateFormat="dd/MM/yyyy"
                                                        selected={faldon.dateFrom} 
                                                        onChange={(date) => this.handleChangeFaldonDate(date, index, 'dateFrom')}
                                                        placeholderText="Ingresar Fecha"/>
                                                    {faldon.errors && faldon.errors.desde && <span className='error error-class-i'>{faldon.errors.desde}</span>}
                                                </div>
                                            </div>

                                            <div className="col-sm-5">
                                                <label htmlFor="hasta" className="col-form-label"><strong>Hasta:</strong></label>
                                                <div>
                                                    <DatePicker
                                                        showIcon
                                                        className="input-datapiker input-custom"
                                                        dateFormat="dd/MM/yyyy"
                                                        selected={faldon.dateTo} 
                                                        onChange={(date) => this.handleChangeFaldonDate(date, index, 'dateTo')}
                                                        placeholderText="Ingresar Fecha"/>
                                                    {faldon.errors && faldon.errors.hasta && <span className='error error-class-i'>{faldon.errors.hasta}</span>}
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                ))}

                                
                                <div className="form-group row" style={{ marginTop: '5%' }}>
                                    <div className="col-sm-5">
                                    <button type="button" className="btn btn-secondary" onClick={this.addNewFaldon}>
                                        <FontAwesomeIcon icon={faPlus} /> Agregar nuevo faldón
                                    </button>
                                    </div>
                                </div> 
                            </div>
                        </form>
                    </LoadingOverlay>
                </LoadingOverlay>
            </div>
        );
    }
}
