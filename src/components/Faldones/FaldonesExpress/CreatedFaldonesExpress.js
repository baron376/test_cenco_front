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
import swal from 'sweetalert';

export default class CreatedFaldonesExpress extends Component {
    state = {
        datefrom: '',
        sapInfoVisible: false,
        formatoInfoVisible: false, 
        precioInfoVisible: false,
        tmpInfoVisible: false,
        tcInfoVisible: false,
        nombreInfoVisible: false,
        showCombinacion: false,
        faldones:[ { 
            name: '',
            cod_barra: '',
            precio_referencia_moda: '',
            tmp: '',
            tc: '',
            financiamiento:'',
            dateFrom: null,
            dateTo: null,
            umb: '',
            cuotas: '',
            cae: '',
            costo_total: '',
            showCuotasCaeCostoTotal: false,
            tipos_promo_selected: [],
            combinacion: '',
            valor_cuota:'',
            showCombinacion: false
        }],
        showNewFaldonFields: false,
        faldonesCreados: [], // Nuevo estado para almacenar faldones creados
        numFaldones: 1, // Contador para el número de faldones creados
        nextFaldonIndex: 1,
        //nuevosFaldones: [{ id: 0, dateFrom: null, dateTo: null }]
    };
    
    toggleSapInfo = () => {
        this.setState((prevState) => ({
            sapInfoVisible: !prevState.sapInfoVisible,
        }));
    };

    toggleNombreInfo = () => {
        this.setState((prevState) => ({
            nombreInfoVisible: !prevState.nombreInfoVisible,
        }));
    };

    toggleFormatoInfo = () => {
        this.setState((prevState) => ({
            formatoInfoVisible: !prevState.formatoInfoVisible,
        }));
    };

    toggleTmpInfo = () => {
        this.setState((prevState) => ({
            tmpInfoVisible: !prevState.tmpInfoVisible,
        }));
    };    
        
    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    setWrapperRef = (node) => {
        this.wrapperRef = node;
    }

    handleClickOutside = (event) => {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.setState({
                nombreInfoVisible: false,
                formatoInfoVisible: false,
                sapInfoVisible: false,
                tmpInfoVisible: false
            });
        }
    }

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
        nuevosfaldones.push({ id: nuevosfaldones.length, name: null, cod_barra: null, precio_referencia_moda: null, tmp: null, tc: null, dateFrom: null, dateTo: null, cuotas: '', cae: '', costo_total: '', tipos_promo:'', tipos_promo_selected: [], combinacion: '',valor_cuota:''});
        this.setState({ faldones: nuevosfaldones }, () => {
            // Llamar a setFechasAr después de actualizar el estado
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
        nuevosfaldones[index][fieldName] = selectedList[0]; // Suponiendo que solo se permite seleccionar una opción

        if (fieldName === 'tipos_promo' && selectedList[0].nombre === 'PACK') {
            nuevosfaldones[index].showCombinacion = true;
        }
        if (fieldName === 'tipos_promo') {
            nuevosfaldones[index].tc = '';
            nuevosfaldones[index].tmp = '';
        }
    
        this.setState({ faldones: nuevosfaldones });
    }    


    handleMultiselectRemove(selectedItem, index, fieldName) {
        const nuevosfaldones = [...this.state.faldones];
        nuevosfaldones[index][fieldName] = '';
        nuevosfaldones[index].tipos_promo_selected = [];
        if (fieldName === 'tipos_promo') {
         nuevosfaldones[index].showCombinacion = false;
        }
        this.setState({ faldones: nuevosfaldones });
    }


    handleChangeFaldonFinanciamiento = (e, index) => {
        const { value } = e.target;
        const { faldones } = this.state;
        faldones[index].financiamiento = value;
        faldones[index].showCuotasCaeCostoTotal = (value === '1'); // Actualiza basado en el valor seleccionado
        this.setState({ faldones });
    };

    validatePrecioReferencia = (index) => {
        const { faldones } = this.state;
        const faldon = faldones[index];
        console.log(faldon.tipos_promo?.id);
        
        if (faldon.tmp && faldon.precio_referencia_moda && (faldon.tipos_promo?.id === 1) && this.props.state.listPlantillasSeleted.length > 0 && (this.props.state.listPlantillasSeleted[0]['id'] != 6)) {
            const tmp = parseFloat(faldon.tmp);
            const precioReferencia = parseFloat(faldon.precio_referencia_moda);
            if (precioReferencia < tmp) {
                return false;
            }
        }
    
        return true; // Devuelve verdadero si la validación pasa
    };

    validatePrecioReferenciaTc = (index) => {
        const { faldones } = this.state;
        const faldon = faldones[index];
    
        if (faldon.tmp && faldon.precio_referencia_moda && (faldon.tipos_promo?.id === 1) && this.props.state.listPlantillasSeleted.length > 0 && (this.props.state.listPlantillasSeleted[0]['id'] != 6)) {
            const tc = parseFloat(faldon.tc);
            const precioReferencia = parseFloat(faldon.precio_referencia_moda);
    
            // Verifica si el precio de referencia es mayor que TMP o TC
            if (precioReferencia < tc) {
                return false; // Devuelve falso si el precio de referencia es mayor
            }
        }
    
        return true; // Devuelve verdadero si la validación pasa
    };

    validatevalidateTmpTc = (index) => {
        const { faldones } = this.state;
        const faldon = faldones[index];
        if (faldon.tmp && faldon.tc && this.props.state.listPlantillasSeleted.length > 0 && (this.props.state.listPlantillasSeleted[0]['id'] === 6) && (faldon.tipos_promo?.id != 2)) {
            const tmp = parseFloat(faldon.tmp);
            const tc = parseFloat(faldon.tc);
            if (tc > tmp ) {
                return false;
            }
        }
        return true; 
    };

    validatevalidateTmp= (index) => {
        const { faldones } = this.state;
        const faldon = faldones[index];
        if (faldon.tmp && faldon.tc && this.props.state.listPlantillasSeleted.length > 0 && (this.props.state.listPlantillasSeleted[0]['id'] == 6) && (faldon.tipos_promo?.id === 2)) {
            const tmp = parseFloat(faldon.tmp);
            const tc = parseFloat(faldon.tc);
            if (tmp > tc ) {
                return false;
            }
        }
        return true;
    };

    handleChangeTMP = (e, index) => {
        const { value } = e.target;
        this.setState(prevState => ({
            faldones: prevState.faldones.map((faldon, i) =>
                i === index ? { ...faldon, tmp: value } : faldon
            ),
        }));
    };

    handleChangeTC = (e, index) => {
        const { value } = e.target;
        this.setState(prevState => ({
            faldones: prevState.faldones.map((faldon, i) =>
                i === index ? { ...faldon, tc: value } : faldon
            ),
        }));
    };

    // Agrega esta función para manejar el evento onBlur de TMP
    handleBlurTMP = (e, index) => {
        const isValidPrecioReferencia = this.validatePrecioReferencia(index);
        if (!isValidPrecioReferencia) {
            swal("¡Alerta!", "El TMP no puede ser mayor que precio de referencia", "warning");

            this.setState(prevState => ({
                faldones: prevState.faldones.map((faldon, i) =>
                    i === index ? { ...faldon, tmp: '' } : faldon
                ),
            }));
        }
        const isValidvalidateTmp = this.validatevalidateTmp(index);
        if (!isValidvalidateTmp) {
            swal("¡Alerta!", "El TMP no puede ser mayor que TC", "warning");
        }
    };

    // Agrega esta función para manejar el evento onBlur de TC
    handleBlurTC = (e, index) => {
        // Después de actualizar el estado, validamos el precio de referencia
        // const isValidPrecioReferencia = this.validatePrecioReferenciaTc(index);
        // if (!isValidPrecioReferencia) {
        //     swal("¡Alerta!", "El TC no puede ser mayor que precio de referencia", "warning");

        //     this.setState(prevState => ({
        //         faldones: prevState.faldones.map((faldon, i) =>
        //             i === index ? { ...faldon, tc: '' } : faldon
        //         ),
        //     }));
            
        // }
        const isValidvalidateTc = this.validatevalidateTmpTc(index);
        if (!isValidvalidateTc) {
            swal("¡Alerta!", "El TC no puede ser mayor que TMP", "warning");
            this.setState(prevState => ({
                faldones: prevState.faldones.map((faldon, i) =>
                    i === index ? { ...faldon, tc: '' } : faldon
                ),
            }));

        }

        const isValidvalidateTmp = this.validatevalidateTmp(index);
        if (!isValidvalidateTmp) {
            swal("¡Alerta!", "El TMP no puede ser mayor que TC", "warning");

            this.setState(prevState => ({
                faldones: prevState.faldones.map((faldon, i) =>
                    i === index ? { ...faldon, tc: '' } : faldon
                ),
            }));
        }
    };

    render() {
        const dataAll = this.props.state;
        const propsInt = this.props;
        const { faldones } = this.state;
        const { nombreInfoVisible, formatoInfoVisible } = this.state;
        const { showNewFaldonFields, newFaldon, faldonesCreados, numFaldones, showCuotasCaeCostoTotal } = this.state;
        return (
            <div className="col-10 tabs cont-height">
            <LoadingOverlay active={dataAll.loading} spinner text='Cargando contenido...' >
            <LoadingOverlay active={dataAll.loadingCreated} spinner text='Validando Archivo ......' >
            <h2 className="mt-4 mb-4 font-weight-bold pl-3">Crear Faldón Express</h2>
            <form onSubmit={(e) => propsInt.handleSubmitBs(e, faldones)}>
                <div className="modal-body">
                    <div className="form-group">
                        <label htmlFor="cadena" className="col-sm-2 col-form-label">Cadena:</label>
                        <div className="col-sm-6">
                            <Multiselect
                                singleSelect
                                options={dataAll.listaCadenasCreate} 
                                onSelect={propsInt.onSelectCadenas} 
                                onRemove={propsInt.onRemovCadenas}
                                selectedValues={dataAll.listaCadenasSeleccionadas} 
                                displayValue="nombre"
                                placeholder="Seleccionar"/>
                        </div>
                        {dataAll.errorsForm.cadenas.length > 0 && <span className='error'>{dataAll.errorsForm.cadenas}</span>}
                    </div>
                    <div className="form-group"> 
                        <label htmlFor="plantilla" className="col-sm-2 col-form-label">Plantilla:</label>
                        <div className="col-sm-6">
                            <Multiselect
                                selectionLimit="1"
                                options={dataAll.listPlantillasCreated} 
                                onSelect={propsInt.onSelectPlantillas} 
                                onRemove={propsInt.onRemovePlantillas}
                                selectedValues={dataAll.listPlantillasSeleted} 
                                displayValue="descripcion"/>
                        </div>
                        {dataAll.errorsForm.plantilla.length > 0 && (<span className='error error-class-i'>{dataAll.errorsForm.plantilla}</span>)}
                    </div>

                    <div className="form-group">
                        <label htmlFor="formato" className="col-sm-2 col-form-label">Formato
                            <FontAwesomeIcon
                                icon={faInfoCircle}
                                style={{ marginLeft: '5px', cursor: 'pointer' }}
                                onClick={this.toggleFormatoInfo}
                            />
                        </label>
                        <div className="col-sm-6" ref={this.setWrapperRef}>
                            <Multiselect
                                selectionLimit="1"
                                options={dataAll.listaFormatCreate} 
                                onSelect={propsInt.onSelectFormatos} 
                                onRemove={propsInt.onRemoveFormatos}
                                selectedValues={dataAll.listaFormatSeleted} 
                                displayValue="nombre" 
                            />
                            {this.state.formatoInfoVisible && (
                                <div 
                                className="sap-info-modal"
                                style={{
                                    position: 'absolute',
                                    top: '-162%', // Mover arriba para estar encima del icono
                                    left: '57%', // Centrar respecto al input
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
                                    <p>Seleccionar formato (medida) de faldón.</p>
                                </div>
                                )}
                        </div>
                        {dataAll.errorsForm.formato.length > 0 && (
                            <span className='error error-class-i'>{dataAll.errorsForm.formato}</span>
                            )}
                    </div>

                    {faldones.map((faldon, index) => (
                        <div key={index} className="modal-body" style={{ padding: '0' }}>
                            {/* Financiamiento Section */}
                            <div className="form-group">
                                <label htmlFor="financiamiento" className="col-sm-2 col-form-label">Financiamiento:</label>
                                    <div className="col-sm-6">
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
                            {faldon.showCuotasCaeCostoTotal && (
                                <div className="modal-body" style={{ padding: '0' }}>
                                    <div className="form-group">
                                        <label htmlFor="cuotas" className="col-sm-2 col-form-label">Cuotas</label>
                                        <div className="col-sm-6">
                                            <input type="text" onKeyDown={propsInt.onlyNumber} value={faldon.cuotas} onChange={(e) => this.handleChangeFaldon(e, index)} className="form-control" id="cuotas" name="cuotas" placeholder="Cuotas"disabled={!faldon.showCuotasCaeCostoTotal} // Deshabilitar el input
                                            />
                                        </div>
                                        {faldon.errors?.cuotas && <span className='error error-class-i'>{faldon.errors.cuotas}</span>}
                                    </div>    
                                    <div className="form-group">
                                        <label htmlFor="cae" className="col-sm-2 col-form-label">CAE</label>
                                        <div className="col-sm-6">
                                            <input type="number" value={faldon.cae} onChange={(e) => this.handleChangeFaldon(e, index)} className="form-control" id="cae" name="cae" placeholder="CAE" disabled={!faldon.showCuotasCaeCostoTotal} // Deshabilitar el input
                                            />
                                        </div>
                                        {faldon.errors?.cae && <span className='error error-class-i'>{faldon.errors.cae}</span>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="valor_cuota" className="col-sm-2 col-form-label">Valor Cuota</label>
                                        <div className="col-sm-6">
                                            <input type="text" onKeyDown={propsInt.onlyNumber} value={faldon.valor_cuota} onChange={(e) => this.handleChangeFaldon(e, index)} className="form-control" id="valor_cuota" name="valor_cuota" placeholder="Valor Cuota" disabled={!faldon.showCuotasCaeCostoTotal}
                                            />
                                        </div>
                                        {faldon.errors?.valor_cuota && <span className='error error-class-i'>{faldon.errors.valor_cuota}</span>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="costo_total" className="col-sm-2 col-form-label">Costo Total</label>
                                        <div className="col-sm-6">
                                            <input type="text" onKeyDown={propsInt.onlyNumber} value={faldon.costo_total} onChange={(e) => this.handleChangeFaldon(e, index)} className="form-control" id="costo_total" name="costo_total" placeholder="Costo Total" disabled={!faldon.showCuotasCaeCostoTotal} // Deshabilitar el input
                                            />
                                        </div>
                                        {faldon.errors?.costo_total && <span className='error error-class-i'>{faldon.errors.costo_total}</span>}
                                    </div>
                                </div>
                            )}
                            <div className="form-group">
                                <label htmlFor="name" className="col-sm-2 col-form-label">Nombre genérico oferta:
                                    <FontAwesomeIcon
                                        icon={faInfoCircle}
                                        style={{ marginLeft: '5px', cursor: 'pointer' }}
                                        onClick={this.toggleNombreInfo}
                                    />
                                </label>
                                <div className="col-sm-6" ref={this.setWrapperRef}>
                                    <input type="text" value={faldon.name} onChange={(e) => this.handleChangeFaldon(e, index)} className="form-control" id="name" name="name" placeholder="Ingresar nombre genérico de la oferta"/>
                                    {this.state.nombreInfoVisible && (
                                        <div className="sap-info-modal"
                                        style={{
                                            position: 'absolute',
                                            top: '-187%', // Mover arriba para estar encima del icono
                                            left: '63%', // Centrar respecto al input
                                            transform: 'translateX(-100%)', // Centrar respecto al input
                                            backgroundColor: '#062a4e', // Fondo azul
                                            color: 'white', // Texto blanco
                                            border: '1px solid #ccc',
                                            padding: '10px',
                                            borderRadius: '5px',
                                            boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.1)',
                                            zIndex: '9999'
                                            }}>
                                            <p>se debe ingresar llamado de la promoción.</p>
                                        </div>
                                        )}
                                </div>
                                {dataAll.errorsForm.name.length > 0 && (<span className='error error-class-i'>{dataAll.errorsForm.name}</span>)}
                            </div>
                            <div className="form-group">
                                <label htmlFor="cod_barra" className="col-sm-2 col-form-label">SAP código de barra
                                    <FontAwesomeIcon
                                        icon={faInfoCircle}
                                        style={{ marginLeft: '5px', cursor: 'pointer' }}
                                        onClick={this.toggleSapInfo}
                                    />
                                </label>
                                <div className="col-sm-6" ref={this.setWrapperRef}>
                                    <input type="text" onKeyDown={propsInt.onlyNumber} value={faldon.cod_barra} onChange={(e) => this.handleChangeFaldon(e, index)} className="form-control" id="cod_barra" name="cod_barra" placeholder="Ingresar sap o código de barra"/>
                                    {this.state.sapInfoVisible && (
                                        <div className="sap-info-modal"
                                             style={{
                                                position: 'absolute',
                                                top: '-169%', // Mover arriba para estar encima del icono
                                                left: '45%', // Centrar respecto al input
                                                transform: 'translateX(-100%)', // Centrar respecto al input
                                                backgroundColor: '#062a4e', // Fondo azul
                                                color: 'white', // Texto blanco
                                                border: '1px solid #ccc',
                                                padding: '10px',
                                                borderRadius: '5px',
                                                boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.1)',
                                                zIndex: '9999'
                                            }}>
                                            <p>EAN producto</p>
                                        </div>
                                        )}
                                    </div>
                                    {dataAll.errorsForm.cod_barra.length > 0 && (<span className='error error-class-i'>{dataAll.errorsForm.cod_barra}</span>)}
                                </div>
                            

                            <div className="form-group">
                                <label htmlFor="umb" className="col-sm-2 col-form-label">UMB:</label>
                                <div className="col-sm-6">
                                    <Multiselect
                                        selectionLimit="1"
                                        options={dataAll.listaUmbCreate} 
                                        onSelect={(selectedList) => this.handleMultiselectChange(selectedList, index, 'umb')}
                                        onRemove={(selectedItem) => this.handleMultiselectRemove(selectedItem, index, 'umb')}
                                        selectedValues={faldon.umbSelected} 
                                        displayValue="nombre"/>
                                        {dataAll.errorsForm.umb.length > 0 && (<span className='error error-class-i'>{dataAll.errorsForm.umb}</span>)}
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="precio_referencia_moda" className="col-sm-2 col-form-label">Precio Referencia:</label>
                                <div className="col-sm-6">
                                    <input type="text" onKeyDown={propsInt.onlyNumber} value={faldon.precio_referencia_moda} onChange={(e) => this.handleChangeFaldon(e, index)} className="form-control" id="precio_referencia_moda" name="precio_referencia_moda" placeholder="Ingresar precio referencia"/>
                                </div>
                                {dataAll.errorsForm.precio_referencia_moda.length > 0 && (<span className='error error-class-i'>{dataAll.errorsForm.precio_referencia_moda}</span>)}
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="tipos_promo" className="col-sm-2 col-form-label">Tipos Promo</label>
                                    <div className="col-sm-6">
                                    <Multiselect
                                        selectionLimit="1"
                                        options={dataAll.listaTiposPromosCreated} 
                                        onSelect={(selectedList) => this.handleMultiselectChange(selectedList, index, 'tipos_promo')}
                                        onRemove={(selectedItem) => this.handleMultiselectRemove(selectedItem, index, 'tipos_promo')}
                                        selectedValues={faldon.tipos_promo_selected} 
                                        displayValue="nombre"/>
                                    </div>
                                    {dataAll.errorsForm.tipo_promo.length > 0 && (<span className='error error-class-i'>{dataAll.errorsForm.tipo_promo}</span>)}
                            </div> 
                            {faldon.showCombinacion && (
                                <div className="form-group">
                                    <label htmlFor="combinacion" className="col-sm-2 col-form-label">Combinación:</label>
                                    <div className="col-sm-6">
                                        <input type="text" value={faldon.combinacion} onChange={(e) => this.handleChangeFaldon(e, index)} className="form-control" name="combinacion" placeholder="Combinación"/>
                                    </div>
                                        {/* {dataAll.errorsForm.combinacion.length > 0 && <span className='error error-class-i'>{dataAll.errorsForm.combinacion}</span>} */}
                                </div>   
                            )}
                            <div className="form-group">
                                <label htmlFor="tmp" className="col-sm-2 col-form-label">Tmp
                                    <FontAwesomeIcon
                                        icon={faInfoCircle}
                                        style={{ marginLeft: '5px', cursor: 'pointer' }}
                                        onClick={this.toggleTmpInfo}
                                    />
                                </label>
                                <div className="col-sm-6" ref={this.setWrapperRef}>
                                    <input type="text" onKeyDown={propsInt.onlyNumber} value={faldon.tmp} onChange={(e) => this.handleChangeTMP(e, index)} // Cambio aquí
                                    onBlur={(e) => this.handleBlurTMP(e, index)} // Cambio aquí
                                    className="form-control" d="tmp" name="tmp" placeholder="TMP" />
                                    {this.state.tmpInfoVisible && (
                                        <div className="sap-info-modal"
                                        style={{ position: 'absolute', top: '-187%', // Mover arriba para estar encima del icono
                                        left: '55%', // Centrar respecto al input
                                        transform: 'translateX(-100%)', // Centrar respecto al input
                                        backgroundColor: '#062a4e', // Fondo azul
                                        color: 'white', // Texto blanco
                                        border: '1px solid #ccc', padding: '10px', borderRadius: '5px', boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.1)', zIndex: '9999'
                                        }}>
                                            <p>Ingresar monto para promociones con todo medio de pago: precios, descuentos (no se debe ingresar signo “%”, solo números) y combinaciones tipo MxN (ejemplo 3x2, 2x1, etc.)</p>
                                        </div>
                                        )}
                                    </div>
                                    {dataAll.errorsForm.tmp.length > 0 && (<span className='error error-class-i'>{dataAll.errorsForm.tmp}</span>)}
                               
                                
                                {dataAll.listPlantillasSeleted.length > 0 && dataAll.listPlantillasSeleted[0].descripcion === "OFERTA EXCLUSIVA CON TARJETA Y CANJE" && (
                                <div className="form-group">
                                    <label htmlFor="tc" className="col-sm-2 col-form-label">TC</label>
                                    <div className="col-sm-6">
                                        <input type="text" onKeyDown={propsInt.onlyNumber} value={faldon.tc} onChange={(e) => this.handleChangeTC(e, index)} onBlur={(e) => this.handleBlurTC(e, index)} className="form-control input-custom" id="tc" name="tc" placeholder="TC"/>
                                    </div>
                                    {dataAll.errorsForm.tc.length > 0 && (<span className='error error-class-i'>{dataAll.errorsForm.tc}</span>)}
                                </div>
                                )}
                            </div>
                            <div className="modal-body" style={{ padding: '0' }}>
                                <div className="form-group">
                                    <label htmlFor="desde" className="col-sm-2 col-form-label">Desde:</label>
                                    <div className="col-sm-6">
                                        <DatePicker
                                            showIcon
                                            className="input-datapiker date-picker"
                                            dateFormat="dd/MM/yyyy"
                                            selected={faldon.dateFrom} 
                                            onChange={(date) => this.handleChangeFaldonDate(date, index, 'dateFrom')}
                                            placeholderText="Ingresar Fecha"/>
                                    </div>
                                    {dataAll.errorsForm.datefrom.length > 0 && (<span className='error error-class-i'>{dataAll.errorsForm.datefrom}</span>)}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="hasta" className="col-sm-2 col-form-label">Hasta:</label>
                                    <div className="col-sm-6">
                                        <DatePicker
                                            showIcon
                                            className="input-datapiker"
                                            dateFormat="dd/MM/yyyy"
                                            selected={faldon.dateTo} 
                                            onChange={(date) => this.handleChangeFaldonDate(date, index, 'dateTo')}
                                            placeholderText="Ingresar Fecha"/>
                                    </div>
                                    {dataAll.errorsForm.dateto.length > 0 && (<span className='error error-class-i'>{dataAll.errorsForm.dateto}</span>)}
                                </div>
                            </div>

                            {/* <button type="button" onClick={() => this.deleteFaldon(index)}>Eliminar faldón</button> */}
                            {/* Inserta el hr después del bloque de campos del faldón */}
                            <hr style={{ backgroundColor: 'black', height: '0.5px', marginLeft: '10px', marginRight: '10px', marginTop: '5%' }} />
                            {index != this.state.faldones.length - 1 && <h2 className="mt-4 mb-4 font-weight-bold pl-3">Crear Faldón Express {index + 2}</h2>}
                        </div>
                    ))}

                    {/* <button type="button" onClick={this.addNewFaldon}>Agregar nuevo faldón</button> */}

                   <div className="form-group row" style={{ marginTop: '5%' }}>
                        <div className="col-sm-5">
                        <button type="button" className="btn btn-secondary" onClick={this.addNewFaldon}>
                            <FontAwesomeIcon icon={faPlus} /> Agregar nuevo faldón
                        </button>
                        </div>
                    </div> 

                </div>
                
                <div className="form-group">&emsp; &emsp;</div>
                <div className="form-group row" >
                <div className="">
                <button type="submit" className="btn btn-primary" onClick={() => this.props.setFechasAr(this.state.faldones)}>Guardar</button>

                <Link to='/FaldonesExpress'> <button type="button" className="btn btn-outline-primary" data-dismiss="modal">Volver</button> </Link>
                </div>
                </div>
            </form>
            </LoadingOverlay>
            </LoadingOverlay>
        </div>
        )
    }
}

