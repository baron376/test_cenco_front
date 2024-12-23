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
import { Link } from 'react-router-dom';
import { Collapse } from 'react-bootstrap';

import { faUpload, faTimesCircle, faTrash, faInfoCircle, faPlus, faTimes, faFilter, faSearch, faDownload } from '@fortawesome/free-solid-svg-icons';

export default class CreatedCampanas extends Component {
    state = {
        selectedZonas:[],
        selectedElementos:[],
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
        mostrarConCupones: true,
        isOpenZonas: true,
        isOpenElementos: false,
        zonasConCupo: [],
        zonasSinCupo: [],
        zonasSeleccionadas: [],
        mostrarZonasConCupones: true,
        mostrarZonasSinCupones: true,
        selectedSalas: [],
        zonasData: {}, // Asumiendo que sigues usando este objeto para almacenar la información agrupada
        zonasArray: [],
        elementosArray: [],
        showModal: false,
        modalSala: null
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
    setMostrarZonasConCupones = (checked) => {
        this.setState({ mostrarZonasConCupones: checked });
    }
    
    setMostrarZonasSinCupones = (checked) => {
        this.setState({ mostrarZonasSinCupones: checked });
    }
    toggleCollapse = (section) => {
        this.setState(prevState => ({
            [section]: !prevState[section]
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
    
        handleCheckboxChange = (idZona) => {
            console.log('idZona::: ', idZona);
            console.log(`Checkbox cambiado para la zona con ID ${idZona}`);
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
            console.log('updatedSelectedZonas::: ', updatedSelectedZonas);
            this.setState({ selectedZonas: updatedSelectedZonas });
        };

        // handleSelectAllChange = (zonas) => {
        //     if (this.state.selectedZonas.length === zonas.length) {
        //         this.setState({ selectedZonas: [] });
        //     } else {
        //         this.setState({ selectedZonas: zonas.map(zona => zona.id) });
        //     }
        // }

        // handleSelectAllChange = (zonas, zona_cups) => {
        //     console.log('zona_cups', zona_cups);
        //     const selectedZonas = this.state.selectedZonas.length === zonas.length ? [] : zonas.map(zona => zona.id);
        //     console.log('selectedZonas', selectedZonas);
        //     const selectedSalas = selectedZonas.length ? zonas.flatMap(zona => zona.salas.map(sala => sala.id)) : [];
        //     console.log('selectedSalas', selectedSalas);
        //     this.setState({ selectedZonas, selectedSalas });
        // }

        // handleSelectAllChange = (zonas, zona_cups) => {
        //     console.log('zona_cups', zona_cups);
        
        //     const selectedZonas = this.state.selectedZonas.length === zonas.length ? [] : zonas.map(zona => zona.id);
        //     console.log('selectedZonas', selectedZonas);
        
        //     const selectedSalas = selectedZonas.length ? 
        //         zonas.flatMap(zona => 
        //             zona.salas
        //                 .filter(sala => {
        //                     const zonaCup = zona_cups.find(cup => cup.id_zona === zona.id);
        //                     return zonaCup && zonaCup.salas.some(cupSala => cupSala.id === sala.id);
        //                 })
        //                 .map(sala => sala.id)
        //         ) : [];
        
        //     console.log('selectedSalas', selectedSalas);
        //     this.setState({ selectedZonas, selectedSalas });
        // }
    
        handleSelectAllChange = (zonas, zona_cups) => {
            console.log('zona_cups', zona_cups);
        
            const selectedZonas = this.state.selectedZonas.length === zonas.length ? [] : zonas.map(zona => zona.id);
            console.log('selectedZonas', selectedZonas);
        
            const selectedSalas = selectedZonas.length ? 
                zonas.flatMap(zona => 
                    zona.salas
                        .filter(sala => {
                            const zonaCup = zona_cups.find(cup => cup.id_zona === zona.id);
                            return zonaCup && zonaCup.salas.some(cupSala => cupSala.id === sala.id);
                        })
                        .map(sala => sala.id)
                ) : [];
        
            console.log('selectedSalas', selectedSalas);
        
            // Crear el array de zonasArray actualizado
            const updatedZonasArray = selectedZonas.length ? 
                zonas.map(zona => {
                    const zonaCup = zona_cups.find(cup => cup.id_zona === zona.id);
                    const salas = zona.salas.filter(sala => zonaCup && zonaCup.salas.some(cupSala => cupSala.id === sala.id))
                                            .map(sala => ({
                                                idSala: sala.id,
                                                nombre: sala.nombre_sap,
						cdgLocal: sala.cdg_local,
                                                direccion: sala.direccion
                                            }));
                    return {
                        id: zona.id,
                        nombre: zona.nombre,
                        salas: salas
                    };
                }).filter(zona => zona.salas.length > 0) : [];
        
            console.log('Zonas seleccionadas actualizadas:', updatedZonasArray);
        
            this.setState({ 
                selectedZonas, 
                selectedSalas,
                zonasArray: updatedZonasArray 
            });
        };


        handleElementoCheckboxChange = (elementoId, elementoName, desde, hasta) => {
            const isSelected = this.state.selectedElementos.includes(elementoId);
            let updatedSelectedElementos = [...this.state.selectedElementos];
            let updatedElementosArray = [...this.state.elementosArray]; // Nuevo array para almacenar la información de los elementos
        
            if (isSelected) {
                updatedSelectedElementos = updatedSelectedElementos.filter(id => id !== elementoId);
            } else {
                updatedSelectedElementos.push(elementoId);
            }
        
            // Buscar el elemento correspondiente en el array o crear una nueva entrada si no existe
            let elementoIndex = updatedElementosArray.findIndex(elemento => elemento.id === elementoId);
            if (elementoIndex === -1) {
                updatedElementosArray.push({
                    id: elementoId,
                    nombre: elementoName,
                    desde: desde,
                    hasta: hasta
                });
            } else {
                // Si el elemento ya existe, actualizar sus datos
                updatedElementosArray[elementoIndex] = {
                    id: elementoId,
                    nombre: elementoName,
                    desde: desde,
                    hasta: hasta
                };
            }
        
            this.setState({ 
                selectedElementos: updatedSelectedElementos, 
                elementosArray: updatedElementosArray // Actualizar el estado con el nuevo array de elementos
            }, () => {
                console.log("Elementos seleccionados actualizados:", this.state.elementosArray);
            });
        };

        handleSalaCheckboxChange = (idZona, zonaName, idSala, salaName, saleDireccion) => {
            const isSelected = this.state.selectedSalas.includes(idSala);
            let updatedSelectedSalas = [...this.state.selectedSalas];
            let updatedSelectedZonas = [...this.state.selectedZonas];
            let updatedZonasArray = [...this.state.zonasArray]; // Nuevo array para almacenar la información de las zonas
        
            if (isSelected) {
                updatedSelectedSalas = updatedSelectedSalas.filter(salaId => salaId !== idSala);
                if (!this.state.zonasArray.some(zona => zona.id === idZona && zona.salas.some(sala => sala.idSala !== idSala))) {
                    updatedSelectedZonas = updatedSelectedZonas.filter(zonaId => zonaId !== idZona);
                }
            } else {
                updatedSelectedSalas.push(idSala);
                if (!updatedSelectedZonas.includes(idZona)) {
                    updatedSelectedZonas.push(idZona);
                }
            }
        
            // Buscar la zona correspondiente en el array o crear una nueva entrada si no existe
            let zonaIndex = updatedZonasArray.findIndex(zona => zona.id === idZona);
            if (zonaIndex === -1) {
                updatedZonasArray.push({
                    id: idZona,
                    nombre: zonaName,
                    salas: []
                });
                zonaIndex = updatedZonasArray.length - 1;
            }
        
            // Actualizar la lista de salas de la zona correspondiente
            if (isSelected) {
                updatedZonasArray[zonaIndex].salas = updatedZonasArray[zonaIndex].salas.filter(sala => sala.idSala !== idSala);
            } else {
                updatedZonasArray[zonaIndex].salas.push({
                    idSala: idSala,
                    nombre: salaName,
                    direccion: saleDireccion
                });
            }
        
            this.setState({ 
                selectedSalas: updatedSelectedSalas, 
                selectedZonas: updatedSelectedZonas,
                zonasArray: updatedZonasArray // Actualizar el estado con el nuevo array de zonas
            }, () => {
                console.log("Zonas seleccionadas actualizadas:", this.state.zonasArray);
            });
        };

        agregarElemento = () => {
            const nuevosElementos = [...this.state.elementos];
            nuevosElementos.push({ selectedValues: [], dateRange: [null, null] });
            this.setState({ elementos: nuevosElementos });
            this.props.setFechasAr(nuevosElementos);
            // Puedes realizar cualquier acción adicional aquí si es necesario
        };

        setMostrarConCupones = (value) => {
            console.log('sin cupos', value)
            this.setState({ mostrarConCupones: value });
        };

        handleDownloadClick = () => {
            // Aquí puedes pasar el ID de la campaña como argumento
            this.props.handleDownload(this.props.state.responseData?.data?.campana.id);
          };

        handleSearchClick = (sala) => {
            console.log(sala);
            this.setState({ showModal: true, modalSala: sala });
        }

        handleCloseModal = () => {
            this.setState({ showModal: false, modalSala: null });
        }

        formatDateString = (dateString) => {
            const date = new Date(dateString);
            const day = date.getDate();
            const month = date.getMonth() + 1; // getMonth() devuelve el mes base 0 (enero = 0), sumamos 1 para obtener el mes real
            return `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}`;
        }
        
    render() {
        const dataAll = this.props.state; 
        const campana = dataAll.responseData?.data?.campana || null
        const formato = dataAll.responseData?.data?.formato || null
        const propsInt = this.props;
        const currentDate = new Date();
        const { fechas } = this.state;
        const { elementos, dateRanges, zonasSinCupo, zonasConCupo, mostrarZonasSinCupones, mostrarZonasConCupones, selectedZonas, selectedSalas, mostrarConCupones, zonasFiltradas, isOpenZonas, isOpenElementos, showModal, modalSala  } = this.state;
             
            console.log('dataAll.responseData: ', dataAll.responseData);
            const zonas = !mostrarConCupones ? 
            (dataAll.responseData && dataAll.responseData.data && dataAll.responseData.data.zona_sin_cups ? 
                dataAll.responseData.data.zona_sin_cups.map(zona => ({ ...zona, conCupos: false })) :
                []) : 
            (dataAll.responseData && dataAll.responseData.data && dataAll.responseData.data.zona_cups ? 
                dataAll.responseData.data.zona_cups.map(zona => ({ ...zona, conCupos: true })) :
                []);
        
                console.log('zonas:: ', zonas);
            const filteredZonas = zonas.filter(zona => this.state.selectedZonas.includes(zona.id_zona));
                console.log('filteredZonas:: ', filteredZonas);
          
            const zonasSeleccionadas = this.state.zonasArray;
            const elementosSelected = dataAll.responseData && dataAll.responseData.data ? dataAll.responseData.data.elementos :  [];

        return (            
                <div className="col-10 tabs cont-height">
                    <h2 className="mt-4 mb-4">Cupones disponibles</h2>

                    <div className="white-container">
                        <h3 className="mb-4"> <FontAwesomeIcon icon={faFilter} style={{ fontSize: '0.75em' }}/> Buscar</h3>
                        <div className="form-group row">
                            <div className="col-sm-12 col-lg-3 mb-4">
                                <Multiselect
                                singleSelect
                                    options={dataAll.listaCadenasCreate} 
                                    onSelect={propsInt.onSelectCadenas} 
                                    onRemove={propsInt.onRemovCadenas}
                                    selectedValues={dataAll.listaCadenasSeleccionadas} 
                                    displayValue="nombre"
                                    placeholder="Cadena"
                                />
                                {dataAll.errorsForm.cadena.length > 0 && <span className='error'>{dataAll.errorsForm.cadena}</span>}
                            </div>

                            <div className="col-sm-12 col-lg-3 mb-4">
                            <Multiselect
                                options={dataAll.listaTipoSalas} 
                                onSelect={propsInt.onSelectTipoSalas} 
                                onRemove={propsInt.onRemoveTipoSalas}
                                selectedValues={dataAll.TipoSalaseleccionada} 
                                displayValue="nombre"
                                placeholder="Formato"
                            />
                            {dataAll.errorsForm.salas.length > 0 && <span className='error error-class-i'>{dataAll.errorsForm.salas}</span>}
                            </div>

                            <div className="col-sm-12 col-lg-3 mb-4">
                                <div className="multiselect-container-admin position-relative">
                                    <Multiselect
                                        options={dataAll.listaZonas}
                                        onSelect={propsInt.onSelectZonas}
                                        onRemove={propsInt.onRemovZonas}
                                        selectedValues={dataAll.listZonasSeleted}
                                        displayValue="nombre"
                                        placeholder="Zonas"
                                        className="multiselect-custom"
                                        showCheckbox
                                    />
                                    <FontAwesomeIcon icon={faSearch} className="search-icon" />
                                    {dataAll.errorsForm.zona.length > 0 && <span className='error error-class-i'>{dataAll.errorsForm.zona}</span>}
                                </div>
                            </div>

                            <div className="col-sm-12 col-lg-3 mb-4">
                                <div className="multiselect-container-admin">
                                    <Multiselect
                                        options={dataAll.listaSalas.map(option => ({ ...option, display_nombre_sap: option.display_nombre_sap.toUpperCase() }))} 
                                        onSelect={propsInt.onSelectSalas} 
                                        onRemove={propsInt.onRemovSalas}
                                        selectedValues={dataAll.listSalasSeleted} 
                                        displayValue="display_nombre_sap"
                                        placeholder="Locales"
                                        showCheckbox
                                        style={{
                                            chips: {
                                              'white-space': 'normal'
                                            }
                                          }}
                                    />
                                    <FontAwesomeIcon icon={faSearch} className="search-icon" />
                                    {dataAll.errorsForm.salas.length > 0 && <span className='error error-class-i'>{dataAll.errorsForm.salas}</span>}
                                </div>
                            </div>

                            <div className="col-sm-12 col-lg-3 mb-4">
                                <Multiselect
                                    singleSelect
                                    options={dataAll.espaciosDatas} 
                                    onSelect={propsInt.onSelectEspacios} 
                                    onRemove={propsInt.onRemoveEspacios}
                                    selectedValues={dataAll.espaciosSeleccionada} 
                                    displayValue="nombre" 
                                    placeholder="Sección"
                                />
                                {dataAll.errorsForm.espacio.length > 0 && <span className='error error-class-i'>{dataAll.errorsForm.espacio}</span>}
                            </div>

                            <div className="col-sm-12 col-lg-3 mb-4">
                                <Multiselect
                                    singleSelect
                                    options={dataAll.listaSecciones} 
                                    onSelect={propsInt.onSelectSecciones} 
                                    onRemove={propsInt.onRemovSecciones}
                                    selectedValues={dataAll.listSeccionesSeleted} 
                                    displayValue="nombre"
                                    placeholder="Sub-sección"
                                />
                                {dataAll.errorsForm.seccion.length > 0 && <span className='error error-class-i'>{dataAll.errorsForm.seccion}</span>}
                            </div>

                            <div className="col-sm-12 col-lg-3 mb-4">
                                <Multiselect
                                    singleSelect
                                    options={dataAll.listaSubSecciones} 
                                    onSelect={propsInt.onSelectSubSecciones} 
                                    onRemove={propsInt.onRemovSubSecciones}
                                    selectedValues={dataAll.listSubSeccionesSeleted} 
                                    displayValue="nombre"
                                    placeholder="Categoría"
                                />
                                {dataAll.errorsForm.sub_seccion.length > 0 && <span className='error error-class-i'>{dataAll.errorsForm.sub_seccion}</span>}
                            </div>

                            <div className="col-sm-12 col-lg-3 mb-4">
                                <Multiselect
                                        singleSelect
                                        options={dataAll.listaVisibilidadCampana} 
                                        onSelect={propsInt.onSelectVisibilidadCampana} 
                                        onRemove={propsInt.onRemoveVisibilidadCampana}
                                        selectedValues={dataAll.listVisibilidadCampanaSeleted} 
                                        displayValue="name" 
                                        placeholder="Visibilidad campaña"
                                    />
                                {dataAll.errorsForm.visibilidadCampana.length > 0 && <span className='error error-class-i'>{dataAll.errorsForm.visibilidadCampana}</span>}
                            </div>

                            <div className="col-sm-12 col-lg-3 mb-4">
                                <Multiselect
                                        singleSelect
                                        options={dataAll.listaTpCampana} 
                                        onSelect={propsInt.onSelectTpCampana} 
                                        onRemove={propsInt.onRemovTpCampana}
                                        selectedValues={dataAll.listTpCampanaSeleted} 
                                        displayValue="name" 
                                        placeholder="Tipo de campaña"
                                    />
                                {dataAll.errorsForm.tpCampana.length > 0 && <span className='error error-class-i'>{dataAll.errorsForm.tpCampana}</span>}
                            </div>
                            <div className="col-sm-12 col-lg-12 mb-4">
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
                                                showCheckbox
                                            />
                                            {/* {dataAll.errorsForm.desde.length > 0 && <span className='error error-class-i'>{dataAll.errorsForm.desde}</span>} */}
                                        </div>

                                        <div className="col-sm-2">
                                            <div>
                                                <DatePicker
                                                    showIcon
                                                    className="input-datapiker input-custom date-picker w-100"
                                                    dateFormat="dd/MM/yyyy"
                                                    selected={elemento.dateRange[0]}
                                                    onChange={(date) => {
                                                        const nuevosElementos = [...elementos];
                                                        nuevosElementos[index].dateRange[0] = date;
                                                        this.setState({ elementos: nuevosElementos });
                                                        this.props.setFechasAr(nuevosElementos);
                                                    }}
                                                    placeholderText="Desde"
                                                />
                                            </div>
                                            {dataAll.errorsForm.desde && dataAll.errorsForm.desde[index] && (
                                                <span className='error error-class-i'>{dataAll.errorsForm.desde[index]}</span>
                                            )}
                                        </div>

                                        <div className="col-sm-2">
                                            <div>
                                                <DatePicker
                                                    showIcon
                                                    className="input-datapiker input-custom w-100"
                                                    dateFormat="dd/MM/yyyy"
                                                    selected={elemento.dateRange[1]}
                                                    onChange={(date) => {
                                                        const nuevosElementos = [...elementos];
                                                        nuevosElementos[index].dateRange[1] = date;
                                                        this.setState({ elementos: nuevosElementos });
                                                        this.props.setFechasAr(nuevosElementos);
                                                    }}
                                                    placeholderText="Hasta"
                                                />
                                            </div>
                                            {dataAll.errorsForm.hasta && dataAll.errorsForm.hasta[index] && (
                                                <span className='error error-class-i'>{dataAll.errorsForm.hasta[index]}</span>
                                            )}
                                        </div>
                                        <div className="col-12 col-md-2">
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
                                <button className="btn btn-primary btn-block" onClick={propsInt.handleSubmitBs}>Buscar</button>
                            </div>
                        </div>

                        <div className="d-flex justify-content-between align-items-center">
                            <h3 className="mt-4 mb-4"><strong>Resultados</strong></h3>
                            {
                                campana && (
                                    <h4>
                                        <a href="#" className="btn btn-outline-primary download-button" onClick={this.handleDownloadClick}>
                                            Descargar <FontAwesomeIcon icon={faDownload} style={{ fontSize: '17px', fontWeight: 'lighter' }} />
                                        </a>
                                    </h4>
                                )
                            }
                        </div>

                        {!dataAll.responseData ? (
                            <div className="no-cupons">
                                <h3><img alt='Cencocheck' src={process.env.PUBLIC_URL + '/dist/img/ic-nocupons.svg'}/>¡No hay cupos aún!</h3>
                                <p>Aquí es donde podrás ver los cupos disponibles.</p>
                            </div>
                        ) : (
                            <div style={{ display: 'grid', gridTemplateColumns: '0.4fr 1fr', gap: '10px'}}>
                                {/* Sección de cupones disponibles */}
                                
                                <div>
                                    <div className="sidebar_results">
                                        <div className="form-switch">
                                            <h3><strong>Cupos disponibles</strong></h3>
                                            <div className="switch-container" style={{ display: 'flex', alignItems: 'center' }}>
                                                <span style={{ marginRight: '10px' }}>Con cupos</span>
                                                <label className="switch">
                                                    <input type="checkbox" checked={mostrarConCupones} onChange={(e) => this.setMostrarConCupones(e.target.checked)} />
                                                    <span className="slider round"></span>
                                                </label>
                                                <span style={{ marginLeft: '10px' }}>Sin cupos</span>
                                            </div>
                                        </div>

                                        <div className="accordion" id="accordionExample">
                                            <div className="">
                                                <div className="" id="headingZonas">
                                                    <h2 className="mb-0 d-flex justify-content-between align-items-center">
                                                        <button 
                                                            className="btn btn-accordion d-flex justify-content-between align-items-center w-100" 
                                                            type="button" 
                                                            onClick={() => this.toggleCollapse('isOpenZonas')}
                                                            aria-expanded={isOpenZonas ? 'true' : 'false'}
                                                            aria-controls="collapseZonas">
                                                            Zonas 
                                                            <svg width="18" height="11" viewBox="0 0 18 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.00003 10.7774L0.217529 1.27118L1.28253 0.117432L9.00003 8.48618L16.7175 0.117432L17.7825 1.27118L9.00003 10.7774Z" fill="#373737"/>
                                                            </svg>

                                                        </button>
                                                    </h2>
                                                </div>
                                                <div id="collapseZonas" 
                                                    className={`collapse ${isOpenZonas ? 'show' : ''}`} 
                                                    aria-labelledby="headingZonas" 
                                                    data-parent="#accordionExample">
                                                    <div className="card-body bg-light">
                                                        <div className="px-3">
                                                            <div className="row">
                                                                <div className="col-12 mb-2">
                                                                    <input 
                                                                        type="checkbox" 
                                                                        className="form-check-input custom-checkbox" 
                                                                        id="selectAll" 
                                                                        checked={selectedZonas.length === dataAll.responseData.data.zonas.length}
                                                                        onChange={() => this.handleSelectAllChange(dataAll.responseData.data.zonas, dataAll.responseData.data.zona_cups)} 
                                                                    />
                                                                    <label className="form-check-label" htmlFor="selectAll">
                                                                        TODAS
                                                                    </label>
                                                                </div>
                                                                {dataAll.responseData.data.zonas && dataAll.responseData.data.zonas.map((zona) => (
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
                                                </div>
                                            </div>

                                            <div className="">
                                                <div className="" id="headingElementos">
                                                    <h2 className="mb-0 d-flex justify-content-between align-items-center">
                                                        <button 
                                                            className="btn btn-accordion d-flex justify-content-between align-items-center w-100 collapsed" 
                                                            type="button" 
                                                            onClick={() => this.toggleCollapse('isOpenElementos')}
                                                            aria-expanded={isOpenElementos ? 'true' : 'false'}
                                                            aria-controls="collapseElementos">
                                                            Elementos
                                                            <svg width="18" height="11" viewBox="0 0 18 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.00003 10.7774L0.217529 1.27118L1.28253 0.117432L9.00003 8.48618L16.7175 0.117432L17.7825 1.27118L9.00003 10.7774Z" fill="#373737"/>
                                                            </svg>
                                                        </button>
                                                    </h2>
                                                </div>
                                                <div 
                                                    id="collapseElementos" 
                                                    className={`collapse ${isOpenElementos ? 'show' : ''}`} 
                                                    aria-labelledby="headingElementos" 
                                                    data-parent="#accordionExample">
                                                    <div className="card-body bg-light">
                                                        <div className="px-3">
                                                            <div className="row">

                                                                {/* Mapeo de los elementos existentes */}
                                                                {dataAll.responseData.data.elementos && dataAll.responseData.data.elementos.map((elemento, index) => (
                                                                    <div className="col-12 mb-2" key={index}>
                                                                        <li className="form-check-label" htmlFor={`perm_${elemento.id}`}>
                                                                            {elemento.name}
                                                                            <br />
                                                                            Desde:  {elemento.campana_elementos.desde} - Hasta: {elemento.campana_elementos.hasta}
                                                                        </li>
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
                                    <div className="accordion" id="accordionZonesMain">
                                        {filteredZonas.map((zona, index) => (
                                            <div className="panel" key={index}>
                                                <div className="" id={`headingZonafiltrada${zona.id}`}>
                                                    <h2 className="mb-0 d-flex justify-content-between align-items-center">
                                                        <button className="btn btn-accordion d-flex justify-content-between align-items-center w-100" type="button" data-toggle="collapse" data-target={`#collapseZonafiltrada${zona.id_zona}`} aria-expanded="true" aria-controls={`collapseZonafiltrada${zona.id_zona}`}>
                                                            {zona.nombre_zona}
                                                            <svg width="18" height="11" viewBox="0 0 18 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.00003 10.7774L0.217529 1.27118L1.28253 0.117432L9.00003 8.48618L16.7175 0.117432L17.7825 1.27118L9.00003 10.7774Z" fill="#373737"/>
                                                            </svg>
                                                        </button>
                                                    </h2>
                                                </div>
                                                <div id={`collapseZonafiltrada${zona.id_zona}`} className="collapse" aria-labelledby={`headingZonafiltrada${zona.id_zona}`} data-parent="#accordionZonesMain">
                                                <div className="panel-body">
                                                    {zona.salas && zona.salas.length > 0 ? (
                                                        <div className="row">
                                                            {zona.salas.map((sala, salaIndex) => (
                                                                <div className="col-sm-6 mb-2" key={salaIndex}>
                                                                    <div className="card card-style">
                                                                        <div className="card-body d-flex justify-content-between align-items-center">
                                                                            <div>
                                                                                <h5 className="card-title">{sala.display_nombre_sap}</h5>
                                                                                <p className="card-text">{sala.direccion}</p>
                                                                            </div>
                                                                            <div>
                                                                                {zona.conCupos ? (
                                                                                    <input
                                                                                        type="checkbox"
                                                                                        className="custom-checkbox"
                                                                                        name={`checkbox_${sala.id}`}
                                                                                        value={sala.id}
                                                                                        id={`checkbox_${sala.id}`}
                                                                                        onChange={() => this.handleSalaCheckboxChange(zona.id_zona, zona.nombre_zona, sala.id, sala.display_nombre_sap, sala.direccion)}
                                                                                        checked={selectedSalas.includes(sala.id)}
                                                                                    />
                                                                                ) : (
                                                                                    <FontAwesomeIcon 
                                                                                        icon={faSearch} 
                                                                                        style={{ cursor: 'pointer', fontSize: '1.75em', paddingLeft: '10px' }} 
                                                                                        onClick={() => this.handleSearchClick(sala)}
                                                                                    />
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    ) : (
                                                        <p>No hay salas disponibles en esta zona.</p>
                                                    )}
                                                </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            
                        )}
                        <div className="footer-button d-flex justify-content-end">
                            {/* <Link to={`/CrearCampanaProveedoresNew/cuposCamapana-${JSON.stringify(campana)}`}> */}
                            <Link
                                to={{
                                    pathname: "/CrearCampanaProveedoresNew/cuposCamapana",
                                    state: { campana: JSON.stringify(campana), formato: JSON.stringify(formato), zonasSeleccionadas: zonasSeleccionadas, elementosSelected: elementosSelected  }
                                }}
                            >
                                <button type="button" className="btn btn-primary" disabled={(!campana || zonasSeleccionadas.length < 1 || !mostrarConCupones || filteredZonas.filter((z) => { return (z.salas && z.salas.length > 0)}).length < 0 )}>
                                    Siguiente
                                </button>
                            </Link>
                        </div>
                        { zonasSeleccionadas.length < 1 && <p className='d-flex justify-content-end'>Seleccione las zonas y locales deseados.</p> }

                        {showModal && modalSala && (
                        <div className="modal show" style={{ display: 'block' }}>
                            <div className="modal-dialog modal-dialog-scrollable">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Sala: {modalSala.display_nombre_sap}</h5>
                                        <button type="button" className="close" onClick={this.handleCloseModal}>
                                            <span>&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="row">
                                            <div className="col-12">
                                                <h5>Elementos no disponibles</h5>
                                                {modalSala.campana_elementos && modalSala.campana_elementos.length > 0 ? (
                                                    <ul>
                                                        {modalSala.campana_elementos.map((elemento, index) => (
                                                            <div key={index} style={{ display: 'flex', marginBottom: '10px' }}>
                                                            <div style={{ flex: 1, marginRight: '10px' }}>
                                                                {elemento.elementos.name}
                                                            </div>
                                                            <div style={{ flex: 1 }}>
                                                                Fecha: {elemento.fecha}
                                                            </div>
                                                        </div>
                                                        ))}
                                                    </ul>
                                                ) : (
                                                    <p>No hay fechas no disponibles.</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" onClick={this.handleCloseModal}>Cerrar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    </div>
            </div>
        )
    }
}
