import React, { Component } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Multiselect } from 'multiselect-react-dropdown';
import 'react-dropzone-uploader/dist/styles.css';
//import Dropzone from 'react-dropzone-uploader';
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import Dropzone from 'react-dropzone-uploader';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../../styles/campanasproviders.css';
import '../../styles/Tooltip.css';
import LoadingOverlay from 'react-loading-overlay';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { Collapse } from 'react-bootstrap';

import { faUpload, faTimesCircle, faTrash, faInfoCircle, faPlus, faTimes, faFilter, faSearch } from '@fortawesome/free-solid-svg-icons';

export default class CreatedCampanas extends Component {
    state = {
        selectedZonas:[],
        datefrom:'',
        noHayCupones: false,
        cadenaInfoVisible: false,
        nameInfoVisible: false,
        desdeInfoVisible: false,
        hastaInfoVisible: false,
        proveedorInfoVisible: false,
        formatoInfoVisible: false,
        zonaInfoVisible: false,
        localInfoVisible: false,
        gerenciaInfoVisible: false,
        seccionInfoVisible: false,
        tipodecampanaInfoVisible: false,
        visibilidaddecampanaInfoVisible: false,
        elementosdecampanaInfoVisible: false,
        cuposInfoVisible: false,
        fileNameAreaComercial:[],
        fileNameBasesLegales:[],
        fileAreaComercial:'',
        dataAll: {
            fileNameBasesLegales: ''
        },
        filenameareacomercialok: null,
        //fechas: [{ id: 1 }], 
        fechas: [{ id: 1, elementos: '', fecha: null, dateRange: [null, null] }],
        dateRange: [null, null],
        elementos: [{ id: 1, elementos: '', selectedValues: [], dateRange: [null, null] }],
        dateRanges: [[]],
        hayCupones: false,
        setHayCupones:false,
        isOpen: false,
        mostrarConCupones: false
    }
   
    // Función para manejar el cambio de archivo para las bases legales
    handleFileChangeBasesLegales = (event) => {
        const files = event.target.files; // Obtiene los archivos seleccionados
        console.log ('objeto file ' , files );
       // this.setState({ fileBasesLegales: files }); // Actualiza el estado con los archivos seleccionados
    }


      toggleCupones = () => {
        this.setState((prevState) => ({
            hayCupones: !prevState.hayCupones
        }));
      };

      toggleCollapse = () => {
        this.setState(prevState => ({
            isOpen: !prevState.isOpen
        }));
      };

        eliminarFecha = (index) => {
          const nuevosElementos = this.state.elementos.filter((_, idx) => idx !== index);
          this.setState({ elementos: nuevosElementos });
          this.props.setFechasAr(nuevosElementos);  // Suponiendo que setFechasAr se utiliza para actualizar el estado en el componente padre
      }

        handleChangeDateFrom = (date, index) => {
            const nuevasFechas = [...this.state.fechas];
            nuevasFechas[index].dateFrom = date;
            this.setState({ fechas: nuevasFechas });
            this.props.setFechasAr(nuevasFechas);
            
        }
    
        handleChangeDateTo = (date, index) => {
            const nuevasFechas = [...this.state.fechas];
            nuevasFechas[index].dateTo = date;
            this.setState({ fechas: nuevasFechas });
            this.props.setFechasAr(nuevasFechas);
        }
        handleChangeDateRange = dates => {
            this.setState({ dateRange: dates }); // Actualizar dateRange en el estado del componente
        };

        handleChangeElementos = (value, index) => {
            const { fechas } = this.state;
            const newFechas = [...fechas];
            newFechas[index].elementos = value;
            this.setState({ fechas: newFechas });
        };
    

        handleCheckboxChange(idZona) {
            console.log('idZona::: ', idZona);
            // Verificar si la zona está actualmente seleccionada
            const isSelected = this.state.selectedZonas.includes(idZona);
            // Copiar el estado actual de las zonas seleccionadas
            let updatedSelectedZonas = [...this.state.selectedZonas];
            // Si la zona está seleccionada, quitarla del array de zonas seleccionadas; de lo contrario, agregarla
            if (isSelected) {
                updatedSelectedZonas = updatedSelectedZonas.filter(zonaId => zonaId !== idZona);
            } else {
                updatedSelectedZonas.push(idZona);
            }
            // Actualizar el estado con las zonas seleccionadas actualizadas
            this.setState({ selectedZonas: updatedSelectedZonas });
        };

        agregarElemento = () => {
            const nuevosElementos = [...this.state.elementos];
            nuevosElementos.push({ selectedValues: [], dateRange: [null, null] });
            this.setState({ elementos: nuevosElementos });
            this.props.setFechasAr(nuevosElementos);
            // Puedes realizar cualquier acción adicional aquí si es necesario
        };

        setMostrarConCupones = (value) => {
            console.log('vino al cambio', value)
            this.setState({ mostrarConCupones: value });
        };
        

    render() {
        const dataAll = this.props.state; 
        console.log(dataAll.responseData);
        const propsInt = this.props;
        const currentDate = new Date();
        const { fechas } = this.state;
        const { elementos, dateRanges, noHayCupones, hayCupones, setHayCupones, isOpen, mostrarConCupones, zonasFiltradas   } = this.state;

        const elementos_cupos = dataAll.responseData && dataAll.responseData.data && dataAll.responseData.data.elementos ? dataAll.responseData.data.elementos : [];

        console.log("elementos:", elementos_cupos);

        // Filtrar las zonas con y sin cupo
        const zonasConCupo = elementos_cupos.flatMap(elemento => elemento.zonascon_cupo || []);
        const zonasSinCupo = elementos_cupos.flatMap(elemento => elemento.zonassin_cupo || []);

        console.log("zonasConCupo:", zonasConCupo);
        console.log("zonasSinCupo:", zonasSinCupo);

        return (            
                <div className="col-10 tabs cont-height">
                    <h2 className="mt-4 mb-4">Cupones disponibles</h2>
                    <h3 className="mt-4 mb-4"> <FontAwesomeIcon icon={faFilter} style={{ fontSize: '0.75em' }}/> <strong>Buscar</strong></h3>

                    <div className="white-container sa">
                        <div className="form-group row">
                            <div className="col-sm-12 col-lg-2">
                                <Multiselect
                                singleSelect
                                    options={dataAll.listaCadenasCreate} 
                                    onSelect={propsInt.onSelectCadenas} 
                                    onRemove={propsInt.onRemovCadenas}
                                    selectedValues={dataAll.listaCadenasSeleccionadas} 
                                    displayValue="nombre"
                                    placeholder="Cadena"
                                />
                            </div>

                            <div className="col-sm-12 col-lg-2">
                            <Multiselect
                                options={dataAll.listaTipoSalas} 
                                onSelect={propsInt.onSelectTipoSalas} 
                                onRemove={propsInt.onRemoveTipoSalas}
                                selectedValues={dataAll.TipoSalaseleccionada} 
                                displayValue="nombre"
                                placeholder="Formato"
                            />
                            </div>

                            <div className="col-sm-12 col-lg-2">
                            <div className="multiselect-container-admin position-relative">
                                <Multiselect
                                    options={dataAll.listaZonas.map(option => ({ ...option, nombre: option.nombre.toUpperCase() }))}
                                    onSelect={propsInt.onSelectZonas}
                                    onRemove={propsInt.onRemovZonas}
                                    selectedValues={dataAll.listZonasSeleted}
                                    displayValue="nombre"
                                    placeholder="Zonas"
                                    className="multiselect-custom"
                                />
                                <FontAwesomeIcon icon={faSearch} className="search-icon" />
                            </div>
                            </div>

                            <div className="col-sm-12 col-lg-2">
                                <div className="multiselect-container-admin">
                                    <Multiselect
                                        options={dataAll.listaSalas.map(option => ({ ...option, display_nombre_sap: option.display_nombre_sap.toUpperCase() }))} 
                                        onSelect={propsInt.onSelectSalas} 
                                        onRemove={propsInt.onRemovSalas}
                                        selectedValues={dataAll.listSalasSeleted} 
                                        displayValue="display_nombre_sap"
                                        placeholder="Locales"
                                    />
                                    <FontAwesomeIcon icon={faSearch} className="search-icon" />
                                </div>
                            </div>

                            <div className="col-sm-12 col-lg-2">
                                <Multiselect
                                    singleSelect
                                    options={dataAll.espaciosDatas} 
                                    onSelect={propsInt.onSelectEspacios} 
                                    onRemove={propsInt.onRemoveEspacios}
                                    selectedValues={dataAll.espaciosSeleccionada} 
                                    displayValue="nombre" 
                                    placeholder="Sección"
                                />
                            </div>

                            <div className="col-sm-12 col-lg-2">
                                <Multiselect
                                    singleSelect
                                    options={dataAll.listaSecciones} 
                                    onSelect={propsInt.onSelectSecciones} 
                                    onRemove={propsInt.onRemovSecciones}
                                    selectedValues={dataAll.listSeccionesSeleted} 
                                    displayValue="nombre"
                                    placeholder="Sub-sección"
                                />
                            </div>
                        </div>

                        <div className="form-group row">
                        <div className="col-sm-12 col-lg-2">
                            <Multiselect
                                    singleSelect
                                    options={dataAll.listaVisibilidadCampana} 
                                    onSelect={propsInt.onSelectVisibilidadCampana} 
                                    onRemove={propsInt.onRemoveVisibilidadCampana}
                                    selectedValues={dataAll.listVisibilidadCampanaSeleted} 
                                    displayValue="name" 
                                    placeholder="Visibilidad campaña"
                                />
                        </div>

                        <div className="col-sm-12 col-lg-2">
                            <Multiselect
                                    singleSelect
                                    options={dataAll.listaTpCampana} 
                                    onSelect={propsInt.onSelectTpCampana} 
                                    onRemove={propsInt.onRemovTpCampana}
                                    selectedValues={dataAll.listTpCampanaSeleted} 
                                    displayValue="name" 
                                    placeholder="Tipo de campaña"
                                />
                        </div>


                        <div className="col-sm-12 col-lg-6">
                                {elementos.map((elemento, index) => (
                                    <div key={index} className="form-group row align-items-center">
                                    <div className="col-12 col-md-4">
                                        <Multiselect
                                        options={dataAll.listaElementosCampana}
                                        onSelect={(selectedList) => {
                                            const nuevosElementos = [...elementos];
                                            nuevosElementos[index].selectedValues = selectedList;
                                            this.setState({ elementos: nuevosElementos });
                                        }}
                                        onRemove={propsInt.onRemoveElementosExhibicion}
                                        selectedValues={elemento.selectedValues}
                                        displayValue="name"
                                        placeholder="Elementos campaña"
                                        />
                                    </div>

                                    <div className="col-12 col-md-4">
                                        <DatePicker
                                        selectsRange
                                        startDate={elemento.dateRange[0]}
                                        endDate={elemento.dateRange[1]}
                                        onChange={(date) => {
                                            const nuevosElementos = [...elementos];
                                            nuevosElementos[index].dateRange = date;
                                            this.setState({ elementos: nuevosElementos });
                                            this.props.setFechasAr(nuevosElementos);
                                        }}
                                        placeholderText="Fechas"
                                        dateFormat="dd-MM-yyyy"
                                        className="input-datapiker input-custom date-picker"
                                        showIcon
                                        />
                                    </div>

                                    <div className="col-12 col-md-4">
                                        {index !== 0 ? (
                                        <button type="button" className="btn btn-danger" onClick={() => this.eliminarFecha(index)}>
                                            <FontAwesomeIcon icon={faTimes} />
                                        </button>
                                        ) : (
                                        <button type="button" className="btn-no-bg" onClick={this.agregarElemento}>
                                            <FontAwesomeIcon icon={faPlus} /> <strong>Agregar elemento</strong>
                                        </button>
                                        )}
                                    </div>
                                    </div>
                                ))}
                        </div>

                        <div className="col-sm-12 col-lg-2">
                            <button className="btn btn-primary custom-button" onClick={propsInt.handleSubmitBs}>Buscar</button>
                        </div>
                        </div>         

                        <h3 className="mt-4 mb-4"><strong>Resultados</strong></h3>

                        {!dataAll.responseData ? (
                            <div style={{ textAlign: 'center' }}>
                                <h3><strong>¡No hay cupos aún!</strong></h3>
                                <p><strong>Aquí es donde podrás ver los cupos disponibles.</strong></p>
                            </div>
                        ) : (
                            <div style={{ display: 'grid', gridTemplateColumns: '0.4fr 1fr', gap: '10px'}}>
                                {/* Sección de cupones disponibles */}
                                
                                <div>
                                    <div style={{ marginBottom: '20px', backgroundColor: '#f0f0f0', borderRadius: '10px', marginLeft: '20px', paddingLeft: '1.25rem'  }}>
                                    <div className="form-check form-switch">
                                        <h3><strong>Cupones disponibles</strong></h3>
                                        <div className="switch-container" style={{ display: 'flex', alignItems: 'center' }}>
                                            <span style={{ marginRight: '10px' }}>Con cupos</span>
                                            <label className="switch">
                                                <input type="checkbox" checked={mostrarConCupones} onChange={() => this.setMostrarConCupones(!mostrarConCupones)} />

                                                <span className="slider round"></span>
                                            </label>
                                            <span style={{ marginLeft: '10px' }}>Sin cupos</span>
                                        </div>
                                    </div>


                                        <div className="accordion" id="accordionExample"> 
                                            <div className="panel">
                                                <div className="panel-heading bg-light" id="headingZonas">
                                                    <h2 className="mb-0 d-flex justify-content-between align-items-center">
                                                        <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseZonas" aria-expanded="true" aria-controls="collapseZonas">
                                                            Zonas
                                                        </button>
                                                        <i className="fas fa-chevron-down"></i>
                                                    </h2>
                                                </div>

                                                <div id="collapseZonas" className={`collapse ${dataAll.responseData && dataAll.responseData.data && dataAll.responseData.data.zonas ? 'show' : ''}`} aria-labelledby="headingZonas" data-parent="#accordionExample">
                                                    <div className="panel-body bg-light">
                                                        <div className="px-3">
                                                            <div className="row">
                                                            {dataAll.responseData.data.zonas && dataAll.responseData.data.zonas.map((zona, index) => (
                                                <div className="col-12 mb-2" key={zona.id}>
                                                    <input 
                                                        type="checkbox" 
                                                        className="form-check-input custom-checkbox" 
                                                        name="permissions[]" 
                                                        value={zona.id} 
                                                        id={`perm_${zona.id}`} 
                                                        checked={this.state.selectedZonas.includes(zona.id)} 
                                                        onChange={() => this.handleCheckboxChange(zona.id)} 
                                                    />
                                                    <label className="form-check-label" htmlFor={`perm_${zona.id}`}>
                                                        {zona.nombre.toUpperCase()}
                                                    </label>
                                                </div>
                                            ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex justify-content-center bg-light">
                                                        <i className="fas fa-chevron-up mt-2"></i>
                                                    </div>
                                                </div>
                                            </div>


                                            <div className="panel">
                                                <div className="panel-heading bg-light" id="headingElementos">
                                                    <h2 className="mb-0 d-flex justify-content-between align-items-center">
                                                        <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseElementos" aria-expanded="false" aria-controls="collapseElementos">
                                                            Elementos
                                                        </button>
                                                        <i className="fas fa-chevron-down"></i>
                                                    </h2>
                                                </div>
                                                <div id="collapseElementos" className={`collapse ${dataAll.responseData && dataAll.responseData.data && dataAll.responseData.data.elementos ? 'show' : ''}`} aria-labelledby="headingElementos" data-parent="#accordionExample">
                                                    <div className="panel-body bg-light">
                                                        <div className="px-3">
                                                            <div className="row">
                                                                {/* Checkbox para "Todos" */}
                                                                <div className="col-12 mb-2">
                                                                    <input 
                                                                        type="checkbox" 
                                                                        className="form-check-input custom-checkbox" 
                                                                        name="permissions[]" 
                                                                        value={0} 
                                                                        id={`perm_0`} 
                                                                        checked={this.state.selectedZonas.includes(0)} 
                                                                        onChange={() => this.handleCheckboxChange(0)} 
                                                                    />
                                                                    <label className="form-check-label" htmlFor={`perm_0`}>
                                                                        TODOS
                                                                    </label>
                                                                </div>

                                                                {/* Mapeo de los elementos existentes */}
                                                                {dataAll.responseData.data.elementos && dataAll.responseData.data.elementos.map((elemento, index) => (
                                                                    <div className="col-12 mb-2" key={index}>
                                                                        <input 
                                                                            type="checkbox" 
                                                                            className="form-check-input custom-checkbox" 
                                                                            name="permissions[]" 
                                                                            value={elemento.id} 
                                                                            id={`perm_${elemento.id}`} 
                                                                            checked={this.state.selectedZonas.includes(elemento.id)} 
                                                                            onChange={() => this.handleCheckboxChange(elemento.id)} 
                                                                        />
                                                                        <label className="form-check-label" htmlFor={`perm_${elemento.id}`}>
                                                                            {elemento.name}
                                                                            <br />
                                                                            Desde:  {elemento.campana_elementos.desde} - Hasta: {elemento.campana_elementos.hasta}
                                                                        </label>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="accordion" id="accordionExample">
                                        {mostrarConCupones
                                            ? zonasConCupo.map((zona, index) => (
                                                <div className="panel" key={index}>
                                                    <div className="panel-heading bg-light" id={`headingZona${index}`}>
                                                        <h2 className="mb-0 d-flex justify-content-between align-items-center">
                                                            <button className="btn btn-link" type="button" data-toggle="collapse" data-target={`#collapseZona${index}`} aria-expanded="true" aria-controls={`collapseZona${index}`}>
                                                                {zona.nombre}
                                                            </button>
                                                            <i className="fas fa-chevron-down"></i>
                                                        </h2>
                                                    </div>
                                                    <div id={`collapseZona${index}`} className="collapse" aria-labelledby={`headingZona${index}`} data-parent="#accordionExample">
                                                        <div className="panel-body">
                                                            {zona.salas && zona.salas.map((sala, salaIndex) => (
                                                                <div key={salaIndex}>
                                                                    <h4>Salas asociadas:</h4>
                                                                    <div className="row">
                                                                        <div className="col-md-6 mb-2">
                                                                            <div className="card">
                                                                            <div className="card-body d-flex justify-content-between align-items-center">
                                                                                <div>
                                                                                    <h5 className="card-title">{sala.display_nombre_sap}</h5>
                                                                                    <p className="card-text">{sala.direccion}</p>
                                                                                </div>
                                                                                <div>
                                                                                    <input 
                                                                                        type="checkbox"
                                                                                        className="form-check-input custom-checkbox" 
                                                                                        name={`checkbox_${sala.id}`} 
                                                                                        value={sala.id} 
                                                                                        id={`checkbox_${sala.id}`} 
                                                                                        checked={true} 
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                            : zonasSinCupo.map((zona, index) => (
                                                <div className="panel" key={index}>
                                                    <div className="panel-heading bg-light" id={`headingZona${index}`}>
                                                        <h2 className="mb-0 d-flex justify-content-between align-items-center">
                                                            <button
                                                                className="btn btn-link"
                                                                type="button"
                                                                data-toggle="collapse"
                                                                data-target={`#collapseZona${index}`}
                                                                aria-expanded="true"
                                                                aria-controls={`collapseZona${index}`}
                                                            >
                                                                {zona.nombre}
                                                            </button>
                                                            <i className="fas fa-chevron-down"></i>
                                                        </h2>
                                                    </div>
                                                    <div id={`collapseZona${index}`} className="collapse" aria-labelledby={`headingZona${index}`} data-parent="#accordionExample">
                                                        <div className="panel-body">
                                                            {zona.salas && zona.salas.map((sala, salaIndex) => (
                                                                <div className="row" key={salaIndex}>
                                                                    <div className="col-md-6 mb-2">
                                                                        <div className="card">
                                                                        <div className="card-body d-flex justify-content-between align-items-center">
                                                                                <div>
                                                                                    <h5 className="card-title">{sala.display_nombre_sap}</h5>
                                                                                    <p className="card-text">{sala.direccion}</p>
                                                                                </div>
                                                                                <div>
                                                                                    <input 
                                                                                        type="checkbox"
                                                                                        className="form-check-input custom-checkbox" 
                                                                                        name={`checkbox_${sala.id}`} 
                                                                                        value={sala.id} 
                                                                                        id={`checkbox_${sala.id}`} 
                                                                                        checked={true} 
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>

                            </div>
                        )}
                        <div className="d-flex justify-content-end">
                        </div>
                    </div>
               </div>

        )
    }
}
