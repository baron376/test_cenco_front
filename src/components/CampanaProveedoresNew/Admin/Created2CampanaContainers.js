import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Multiselect } from 'multiselect-react-dropdown';
import CampanasServices from '../../../services/CampanasProveedoresServices';
import swal from 'sweetalert';
import { __esModule } from 'react-datepicker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faTrash } from '@fortawesome/free-solid-svg-icons';
import '../../styles/campanasproviders.css';

const Created2CampanaContainers = () => {
    const location = useLocation();
    const serializedCampana = location.state?.campana;
    const serializedFormato = location.state?.formato;
    const selectedZonas = location.state ? location.state.zonasSeleccionadas : null;
    const elementosArray = location.state ? location.state.elementosSelected : null;
    console.log('elementosArray', elementosArray);
    console.log('selectedZonas', selectedZonas);
    const campana = serializedCampana ? JSON.parse(serializedCampana) : null;
    const formato = serializedFormato ? JSON.parse(serializedFormato) : null;
    //const zonasSeleccionadas = serializedzonasSeleccionadas ? JSON.parse(serializedzonasSeleccionadas) : null;
    
    //console.log(zonasSeleccionadas);
    const [listaProveedores, setListaProveedores] = useState([]);
    const [listProveedorSeleted, setListProveedorSeleted] = useState([]);
    const [errorsForm, setErrorsForm] = useState({ proveedor: '' });
    const [proveedorInfoVisible, setProveedorInfoVisible] = useState(false);
    const [filenameOrdenCompra, setFilenameOrdenCompra] = useState('');
    const [filenameAreaComercial, setFilenameAreaComercial] = useState('');
    const [filenameBasesLegales, setFilenameBasesLegales] = useState('');
    const [fileAreaComercial, setBase64AreaComercial] = useState('');
    const [fileBasesLegales, setbase64BasesLegales] = useState('');
    const [fileOrdenCompra, setBase64OrdenCompra] = useState('');
    const [nombreCampaña, setNombreCampaña] = useState('');
    const [comentarios, setComentarios] = useState('');
    const [nombreCampañaError, setNombreCampañaError] = useState('');
    const history = useHistory();
    const elementosList = elementosArray.map(elemento => (
        <li dangerouslySetInnerHTML={{__html: `<li>${elemento.nombre} - ${elemento.desde}/${elemento.hasta}</li>`}} />
    ));
    useEffect(() => {
        const fetchProveedores = async () => {
            const data = await CampanasServices.getProveedor();
            if (!data.hasOwnProperty('errorInfo')) {
                setListaProveedores(data.data.filter(p => p.tipo === 1));
            } else {
                console.error(data.error);
            }
        };
        fetchProveedores();
    }, []);

    useEffect(() => {
        console.log(formato);
    }, [formato]);

    const onSelectProveedor = (selectedList, _selectedItem) => {
        setListProveedorSeleted(selectedList);
        if (selectedList.length < 1) {
            setErrorsForm({
                ...errorsForm,
                proveedor: 'Debe seleccionar al menos un Proveedor',
            });
        } else {
            setErrorsForm({
                ...errorsForm,
                proveedor: ''
            });
        }
    };

    const onRemovProveedor = (selectedList, _removedItem) => {
        setListProveedorSeleted(selectedList);
        if (selectedList.length < 1) {
            setErrorsForm({
                ...errorsForm,
                proveedor: 'Debe seleccionar al menos un Proveedor',
            });
        } else {
            setErrorsForm({
                ...errorsForm,
                proveedor: '',
                name: ''
            });
        }
    };

    const base64AreaComercialFile = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    };

    const base64BasesLegalesFile = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    };

    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    };

    const setFileOrdenCompra = async (event) => {
        const file = event.target.files[0];
        setFilenameOrdenCompra(file.name);
        try {
            const base64OrdenCompra = await getBase64(file);
            setBase64OrdenCompra(base64OrdenCompra);
        } catch (error) {
            console.error('Error al obtener el Base64:', error);
        }
    };

    const removeFileOrdenCompra = () => {
        setFilenameOrdenCompra('');
    };

    const setFileAreaComercial = async (event) => {
        const file = event.target.files[0];
        console.log(file);
        setFilenameAreaComercial(file.name);
        try {
            const base64AreaComercial = await base64AreaComercialFile(file);
            setBase64AreaComercial(base64AreaComercial);
        } catch (error) {
            console.error('Error al obtener el Base64:', error);
        }
    };

    const removeFileAreaComercial = () => {
        setFilenameAreaComercial('');
    };

    const setFileBasesLegales = async (event) => {
        const file = event.target.files[0];
        setFilenameBasesLegales(file.name);
        try {
            const base64BasesLegales = await base64BasesLegalesFile(file);
            setbase64BasesLegales(base64BasesLegales);
        } catch (error) {
            console.error('Error al obtener el Base64:', error);
        }
    };

    const removeFileBasesLegales = () => {
        setFilenameBasesLegales('');
    };

    const handleNombreCampañaChange = (e) => {
        setNombreCampaña(e.target.value);
        setNombreCampañaError('');
    };

    const handleClickCrearCampaña = async () => {
        if (!nombreCampaña.trim()) {
            setNombreCampañaError('El nombre de la campaña es requerido');
            return;
        }
        swal({
            title: "Procesando",
            text: "Por favor, espera...",
            icon: "info",
            buttons: false,
            closeOnClickOutside: false,
            closeOnEsc: false
        });
    
        try {
            const dataToSend = {
                nombreCampaña: nombreCampaña,
                comentarios: comentarios,
                campana: serializedCampana,
                formato: serializedFormato,
                zonasSeleccionadas: selectedZonas,
                elementosSelected: elementosArray,
                proveedoresSeleccionados: listProveedorSeleted,
                filenameOrdenCompra: filenameOrdenCompra,
                filenameAreaComercial: filenameAreaComercial,
                filenameBasesLegales: filenameBasesLegales,
                fileAreaComercial: fileAreaComercial,
                fileBasesLegales: fileBasesLegales,
                fileOrdenCompra: fileOrdenCompra
                // Agrega más datos según sea necesario
            };
            const data = await CampanasServices.storeCampanaNew(dataToSend);
            swal.close(); // Cerrar el swal de carga

            if (!data.data.hasOwnProperty('errorInfo')) {
                swal({
                    title: `Campaña registrada con éxito`,
                    text: "!",
                    icon: "success",
                    button: "Ok!",
                }).then(() => {
                    history.push("/CampanasProveedoresNew");
                });
            } else {
                console.error(`Error ${data.errorInfo.toString()}`);
                swal({
                    title: `Error ${data.errorInfo.toString()} `,
                    text: "!",
                    icon: "error",
                    button: "Ok!",
                });
            }
        } catch(error) {
            console.error('Error al enviar los datos:', error);
        }
    }
    return (
        <div className="col-10 tabs cont-height">
            <h2 className="mt-4 mb-4"><strong>Cupones disponibles &gt; Crear campaña</strong></h2>
            <div className="white-container">
                <div className="top-info">
                    {campana ? (
                        <div className="row">
                            <div className="col-12 col-md-6">
                                <div className="left-panel">
                                    <p><strong>Cadena:</strong> {campana.cadena?.nombre || 'N/A'}</p>
                                    {formato && (
                                        <div>
                                            <p>
                                                <strong>Formato:</strong> {' '}
                                                {/* Render the "Nombre" field of each object horizontally */}
                                                {formato.map((item, index) => (
                                                    <span key={item.id}>
                                                        {item.nombre} {index === formato.length - 1 ? '' : ', '}
                                                    </span>
                                                ))}
                                            </p>
                                        </div>
                                    )}
                                    <p><strong>Zonas:</strong> {selectedZonas.map(zona => zona.nombre).join(', ') || 'N/A'}</p>
                                    <p><strong>Sección:</strong> {campana.espacio?.descripcion || 'N/A'}</p>
                                    <p><strong>Subsección:</strong> {campana.sesion?.descripcion || 'N/A'}</p>
                                    <div>
                                        <p><strong>Elementos de campaña:</strong></p>
                                        <ul>
                                        {elementosArray.map((elemento, index) => (
                                            <li key={index}>
                                                <strong>Nombre:</strong> {elemento.name} / {elemento.campana_elementos.desde} / {elemento.campana_elementos.hasta}
                                            </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-4">
                                <div className="left-panel">
                                    <div className="form-group">
                                        <label htmlFor="nombreCampaña">Nombre campaña</label>
                                        <input 
                                            type="text" 
                                            id="nombreCampaña" 
                                            placeholder="Ingresar nombre" 
                                            className={`form-control ${nombreCampañaError ? 'is-invalid' : ''}`}
                                            value={nombreCampaña} 
                                            onChange={(e) => setNombreCampaña(e.target.value)} 
                                        />
                                        {nombreCampañaError && <div className="invalid-feedback">{nombreCampañaError}</div>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="proveedor">Proveedor</label>
                                        <Multiselect
                                            selectionLimit={1}
                                            options={listaProveedores}
                                            onSelect={onSelectProveedor}
                                            onRemove={onRemovProveedor}
                                            selectedValues={listProveedorSeleted}
                                            displayValue="nombre"
                                            placeholder="Seleccionar"
                                            className={`${errorsForm.proveedor ? 'is-invalid' : ''}`}
                                        />
                                        {errorsForm.proveedor.length > 0 && <span className='error error-class-i'>{errorsForm.proveedor}</span>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="comentarios">Comentarios</label>
                                        <textarea 
                                            id="comentarios" 
                                            placeholder="Comentarios" 
                                            className="form-control" 
                                            value={comentarios} 
                                            onChange={(e) => setComentarios(e.target.value)} 
                                        />
                                    </div>
                                    <div className="form-group row">
                                            <div className="col-12">
                                                <label htmlFor="orden_compra" className="col-form-label">Orden de compra y/o cotización (Obligatorio || Archivo Maximo 15 MB)</label>
                                                <div className="col-form-label">
                                                    <label htmlFor="orden_compra" className="btn btn-outline-primary">
                                                        <input type="file" className="custom-file-input" id="orden_compra" style={{ display: 'none' }} onChange={setFileOrdenCompra} />
                                                        <FontAwesomeIcon icon={faUpload} style={{ color: '#0D99FF' }} /> <span>Cargar Archivo</span>
                                                    </label>
                                                    <br />
                                                    {filenameOrdenCompra && (
                                                        <div>
                                                            <span>{filenameOrdenCompra}</span>
                                                            <FontAwesomeIcon icon={faTrash} style={{ color: 'red', marginLeft: '10px', cursor: 'pointer' }} onClick={removeFileOrdenCompra} />
                                                        </div>
                                                    )}
                                                    {!filenameOrdenCompra && (
                                                        <span className='error error-class-i'>El archivo es requerido</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <div className="col-12">
                                                <label htmlFor="area_comercial" className="col-form-label">Visto bueno área comercial (opcional)</label>
                                                <div className="col-form-label">
                                                    <label htmlFor="area_comercial" className="btn btn-outline-primary">
                                                        <input type="file" className="custom-file-input" id="area_comercial" style={{ display: 'none' }} onChange={setFileAreaComercial} />
                                                        <FontAwesomeIcon icon={faUpload} style={{ color: '#0D99FF' }} /> <span>Cargar Archivo</span>
                                                    </label>
                                                    <br />
                                                    {filenameAreaComercial && (
                                                        <div>
                                                            <span>{filenameAreaComercial}</span>
                                                            <FontAwesomeIcon icon={faTrash} style={{ color: 'red', marginLeft: '10px', cursor: 'pointer' }} onClick={removeFileAreaComercial} />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <div className="col-12">
                                                <label htmlFor="bases_legales" className="col-form-label">Bases Legales (opcional)</label>
                                                <div className="col-form-label">
                                                    <label htmlFor="bases_legales" className="btn btn-outline-primary">
                                                        <input type="file" className="custom-file-input" id="bases_legales" style={{ display: 'none' }} onChange={setFileBasesLegales} />
                                                        <FontAwesomeIcon icon={faUpload} style={{ color: '0D99FF' }} /> <span>Cargar Archivo</span>
                                                    </label>
                                                    <br />
                                                    {filenameBasesLegales && (
                                                        <div>
                                                            <span>{filenameBasesLegales}</span>
                                                            <FontAwesomeIcon icon={faTrash} style={{ color: 'red', marginLeft: '10px', cursor: 'pointer' }} onClick={removeFileBasesLegales} />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                </div>
                            </div>
                            
                        </div>
                    ) : (
                        <div>No hay datos de campaña</div>
                    )}
                </div>
                <p><strong>Cupos disponibles</strong></p>
                <div className="accordion" id="zonasSeleccionadasAccordion">
                    {selectedZonas.map((zona, index) => (
                        <div key={index}>
                            <div id={`headingZona${index}`}>
                                <h2 className="mb-0">
                                    <button className="btn btn-accordion d-flex justify-content-between align-items-center w-100" type="button" data-toggle="collapse" data-target={`#collapseZona${index}`} aria-expanded="true" aria-controls={`collapseZona${index}`}>
                                        {zona.nombre}
                                        <svg width="18" height="11" viewBox="0 0 18 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M9.00003 10.7774L0.217529 1.27118L1.28253 0.117432L9.00003 8.48618L16.7175 0.117432L17.7825 1.27118L9.00003 10.7774Z" fill="#373737"/>
                                        </svg>
                                    </button>
                                </h2>
                            </div>
                            <div id={`collapseZona${index}`} className="collapse" aria-labelledby={`headingZona${index}`} data-parent="#zonasSeleccionadasAccordion">
                                <div className="card-body">
                                    <ul>
                                        {zona.salas.map((sala, salaIndex) => (
                                            <li key={salaIndex}>
                                                <strong>{sala.nombre}</strong>  
                                                <br />
                                                {sala.direccion}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="col-12 text-right mt-4">
                        <button className="btn btn-primary" onClick={handleClickCrearCampaña}>Crear Campaña</button>
                    </div>

                </div>
            </div>

        </div>



    );
};

export default Created2CampanaContainers;
