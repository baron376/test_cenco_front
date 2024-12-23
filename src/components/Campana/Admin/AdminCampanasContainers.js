import React, { Component } from 'react'
import AdminCampanas from './AdminCampanas.js';
import CampanasServices from '../../../services/CampanasServices';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { customFormatterToView } from '../../../util/formats';
import { faPencilAlt, faEye, faTrashAlt, faFileExcel, faFilePdf, faArrowUp, faThumbsUp, faCog, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import swal from 'sweetalert';
import { hasPermission } from '../../../util/auth';
import env from "react-dotenv";

export default class AdminCampanasContainers extends Component {
    state = {
        dataActive: [],
        dataDeteted: [],
        headData: [{
            dataField: '',
            text: ''
        }],
        loadingFaldones: false,
        error: null,
        loading: false,
        modalIsopen: false,
        modalCreateTitle: '',
        campanaDetailsData: [],
        dataUp: [],
        loadingDescarga: false
    }
    trasfData = async function () {
        this.setState({
            loading: true,
        });
        const columns = [
            {
                dataField: 'cadena',
                text: 'Cadena',
                // formatter:this.cadenaFormater,
                headerStyle: {
                    width: '13%'
                },
                sort: true,
            },
            {
                dataField: 'nombre',
                text: 'Campaña',
                headerStyle: {
                    width: '12%'
                },
                sort: true,
            },
            {
                dataField: 'proveedor',
                text: 'Proveedor',
                // formatter:this.proveedorFormater,
                headerStyle: {
                    width: '13%'
                },
                sort: true,
            },
            {
                dataField: 'vigencia',
                text: 'Vigencia',
                formatter: this.vigenciaFormater,
                headerStyle: {
                    width: '13%'
                },
                sort: true,
            },
            {
                dataField: 'campana_etapa',
                text: 'Etapa',
                // formatter:this.EtapaFormater,
                headerStyle: {
                    width: '13%'
                },
                sort: true,
            },
            {
                dataField: 'campana_estado',
                text: 'Estado',
                // formatter:this.estadoFormater,
                headerStyle: {
                    width: '13%'
                },
                sort: true,
            },
            {
                dataField: 'actions',
                text: 'Acciones',
                formatter: this.actionsFormater.bind(this),
                headerStyle: {
                    width: '15%'
                }
            },
            {
                dataField: 'updated_at',
                text: 'Actualizada',
                formatter: this.ActualizadFormater,
                headerStyle: {
                    width: '13%'
                },
                sort: true,
            },

        ];
        this.setState({
            loading: false,
            headData: columns,
        });
    }
    async componentDidMount() {
        console.log('cargando el componente q es ');
        await this.trasfData();
        await this.getDataAllActive();
        await this.getDataAllup();
        await this.getDataDetele();

    }
    getDataAllActive = async function () {
        this.setState({ loadingFaldones: true, error: null })
        await CampanasServices.getCampanasAll().then((data) => {
            if (!data.hasOwnProperty('errorInfo')) {
                this.setState({ loadingFaldones: false, dataActive: data.data });
            } else {
                this.setState({ loadingFaldones: false, error: data.error })
            }
        })
    }

    getDataAllup = async function () {
        this.setState({ loadingFaldones: true, error: null })
        await CampanasServices.getCampanasUp().then((data) => {
            if (!data.hasOwnProperty('errorInfo')) {
                this.setState({ loadingFaldones: false, dataUp: data.data });
            } else {
                this.setState({ loadingFaldones: false, error: data.error })
            }
        })
    }
    getDataDetele = async function () {
        this.setState({ loadingFaldones: true, error: null })
        await CampanasServices.getCampanaDelete().then((data) => {
            if (!data.hasOwnProperty('errorInfo')) {
                this.setState({ loadingFaldones: false, dataDeteted: data.data });
            } else {
                this.setState({ loadingFaldones: false, error: data.error })
            }
        })
    }
    vigenciaFormater(cell, row) {
        return customFormatterToView(row.desde) + ' - ' + customFormatterToView(row.hasta)
    }
    ActualizadFormater(cell, row) {
        return customFormatterToView(row.updated_at)
    }
    cadenaFormater(cell) {
        let namesCad = cell.nombre
        return namesCad;
    }

    EtapaFormater(cell) {
        let namesCad = cell.nombre
        return namesCad;
    }

    proveedorFormater(cell) {
        let namesE = cell.nombre
        return namesE;
    }
    estadoFormater(cell) {
        let namesEstd = cell.nombre
        return namesEstd;
    }

    downloadMateriales = async (row) => {
        try {
            let materiales = await CampanasServices.getMateriales(row.id);
            this.downloadUrls(materiales.data)
            // console.log("MATERIALES", materiales)
        } catch (error) {
            console.log(error)
        }
    }
    // downloadUrl = async function(material) {
    //     window.open(env.REACT_APP_BASE_URL+'/'+material.url, '_blank');
    // }
    downloadUrls =  function (files) {
            // async function downloadImage(i) {
            // let url ='https://devapi-cencocheck.mzzo.com/'+files[i].url;
    //         console.log("URL:", url);
    //         await fetch(url, {
    //             mode: 'no-cors',
    //         })

    //             .then( response => {
    //                 console.log("RESPONSE:", response)
    //                 console.log("URL2:", url);

    //                 response.blob()})
    //             .then(blob => {
    //                 console.log("BLOB", blob);
    //                 let blobUrl = window.URL.createObjectURL(blob);
    //                 console.log("bloburl",blobUrl);

    //                 let a = document.createElement('a');
    //                 a.download = url.replace(/^.*[\\\/]/, '');
    //                 a.href = blobUrl;
    //                 document.body.appendChild(a);
    //                 a.click();
    //                 a.remove();

    //             });

    //         setTimeout(function () {
    //             downloadImage(i + 1);
    //         }, 500);

    //     }
    
        function download_next(i) {
            if (i >= files.length) {
                return;
            }
            var a = document.createElement('a');
            a.href = env.REACT_APP_BASE_URL + '/' + files[i].url;
            a.target = '_blank';
            // Use a.download if available, it prevents plugins from opening.
            if ('download' in a) {
                a.download = files[i].name_archivo;
                console.log("REVISION nombre:", a.download)
            }
            // Add a to the doc for click to work.
            (document.body || document.documentElement).appendChild(a);
            if (a.click) {
                a.click(); // The click method is supported by most browsers.
            }
            // Delete the temporary link.
            a.parentNode.removeChild(a);
            // Download the next file with a small timeout. The timeout is necessary
            // for IE, which will otherwise only download the first file.
            setTimeout(function () {
                download_next(i + 1);
            }, 500);
        }
        // Initiate the first download.
        download_next(0);
        // downloadImage(0);
        console.log( "FECHA", new Date());
        console.log("COOKIE",document.cookie);
    }
    

    actionsFormater(cell, row) {
        if (row.deleted_at !== null) {
            return (
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">
                        Seleccionar
                    </button>
                    <div className="dropdown-menu">
                        {hasPermission([306]) &&
                            <Link to={`/VerCampana-${row.id}`}> <button title="Ver Campaña" className="dropdown-item" data-toggle="modal" data-target="#modal-lg-sh"><FontAwesomeIcon icon={faEye} /> Ver Campaña</button></Link>
                        }
                    </div>
                </div>
            )
        }
        else if ((row.id_etapa === 1 || row.id_etapa === 2)) {
            return (
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">
                        Seleccionar
                    </button>
                    <div className="dropdown-menu">
                        {hasPermission([306]) &&
                            <Link to={`/VerCampana-${row.id}`}> <button title="Ver" className="dropdown-item" data-toggle="modal" data-target="#modal-lg-sh"><FontAwesomeIcon icon={faEye} /> Ver detalle</button></Link>
                        }   
                        {hasPermission([301]) &&
                            <Link to={`/EditarCampana-${row.id}`}> <button title="Editar" className="dropdown-item" data-toggle="modal" data-target="#modal-lg-sh"><FontAwesomeIcon icon={faPencilAlt} /> Editar</button></Link>
                        }
                        {hasPermission([302]) &&
                            <Link to={`/CampanasGestion-${row.id}`}> <button title="Gestionar" className="dropdown-item" data-toggle="modal" data-target="#modal-lg-sh"><FontAwesomeIcon icon={faCog} /> Gestionar</button></Link>
                        }                 
                        {hasPermission([306]) &&
                            <button title="Descargar PDF" className="dropdown-item" data-toggle="modal" data-target="#modal-lg" onClick={() => { this.downloadPdf(row.id) }}><FontAwesomeIcon icon={faFilePdf} /> Descargar PDF</button>
                        }
                        {hasPermission([306]) &&
                            <button title="Descargar materiales" className="dropdown-item" data-toggle="modal" data-target="#modal-lg" onClick={() => { this.downloadMateriales(row) }} download><FontAwesomeIcon icon={faArrowDown} /> Descargar materiales</button>
                        }
                        {hasPermission([505]) &&
                            <Link to={`/CampanasSubir-${row.id}`} onClick={(e) => { e.preventDefault(); this.upCampana(row.id); }}>
                                <button title="Subir Campaña" className="dropdown-item" data-toggle="modal" data-target="#modal-lg-sh">
                                    <FontAwesomeIcon icon={faArrowUp} /> Subir Campaña
                                </button>
                            </Link>
                        }
                        {hasPermission([305]) &&
                            <button title="Eliminar" className="dropdown-item btn-delete" onClick={() => { this.deleteCampana(row.id) }}> <FontAwesomeIcon icon={faTrashAlt} /> Eliminar</button>
                        }
                    </div>
                </div>
            )
        }
        else if (row.id_etapa === 3 || row.id_etapa === 4) {
            return (
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">
                        Seleccionar
                    </button>
                    <div className="dropdown-menu">
                        {hasPermission([306]) &&
                            <Link to={`/VerCampana-${row.id}`}> <button title="Ver" className="dropdown-item" data-toggle="modal" data-target="#modal-lg-sh"><FontAwesomeIcon icon={faEye} /> Ver campaña</button></Link>
                        }
                        {hasPermission([306, 505]) &&
                            <button title="Descargar pdf" className="dropdown-item" data-toggle="modal" data-target="#modal-lg" onClick={() => { this.downloadPdf(row.id) }}><FontAwesomeIcon icon={faFilePdf} /> Descargar pdf</button>
                        }
                        {hasPermission([505]) &&
                            <Link to={`/CampanasSubir-${row.id}`}> <button title="Subir Campaña rechazada" className="dropdown-item" data-toggle="modal" data-target="#modal-lg-sh"><FontAwesomeIcon icon={faArrowUp} /> Subir Campaña rechazada</button></Link>
                        }
                        {hasPermission([305]) &&
                            <button title="Eliminar" className="dropdown-item btn-delete" onClick={() => { this.deleteCampana(row.id) }}> <FontAwesomeIcon icon={faTrashAlt} /> Eliminar</button>
                        }
                    </div>
                </div>
            )
        }

        else if (row.id_estado_campana == !1) {
            return (
                <div className="d-flex flex-wrap justify-content-left align-items-center">
                    {hasPermission([306, 505]) &&
                        <button title="Descargar pdf" className="btn btn btn-danger actions-icons-t mb-2 mr-1" data-toggle="modal" data-target="#modal-lg" onClick={() => { this.downloadPdf(row.id) }}><FontAwesomeIcon icon={faFilePdf} /></button>
                    }
                    {hasPermission([306]) &&
                        <Link to={`/VerCampana-${row.id}`}> <button title="Ver" className="btn btn-info mb-2 mr-1" data-toggle="modal" data-target="#modal-lg-sh"><FontAwesomeIcon icon={faEye} /></button></Link>
                    }
                </div>
            )
        }
    }
    downloadPdf = async (idCampanaPro) => {
        let campanaPdf = idCampanaPro;
        this.setState({ loadingDescarga: true, error: null })
        try {
            CampanasServices.downloadDetailsCampana(campanaPdf).then((data) => {
                if (!data.hasOwnProperty('errorInfo')) {
                    let responseLocal = data.data;
                    let linkSource = `data:application/pdf;base64,${responseLocal.content}`;
                    let downloadLink = document.createElement("a");
                    let fileName = responseLocal.nombre_archivo;
                    downloadLink.href = linkSource;
                    downloadLink.download = fileName;
                    downloadLink.click();
                    this.setState({ loadingDescarga: false, error: null })
                    swal({
                        title: `PDF descargado con éxito`,
                        text: "!",
                        icon: "success",
                        button: "Ok!",
                    });
                } else {
                    swal({
                        title: `Error`,
                        text: "!",
                        icon: "error",
                        button: "Ok!",
                    });
                }
            })

        } catch (error) {
            this.setState({ loadingDescarga: false, error: error })
        }
    }
    deleteCampana = async (campana) => {
        console.log('eliminar campana', campana)

        swal({
            title: "Esta seguro que desea Eliminar la campaña?",
            text: "No podrá recuperar los datos de la misma!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    try {
                        CampanasServices.deleteCampana(campana).then((data) => {
                            ;
                            if (!data.hasOwnProperty('errorInfo')) {
                                swal({
                                    title: `Campaña eliminada con éxito`,
                                    text: "!",
                                    icon: "success",
                                    button: "Ok!",
                                });
                                this.trasfData();
                                this.getDataAllActive();
                                this.getDataDetele();
                            } else {
                                swal({
                                    title: `Error ${data.errorInfo.toString()} `,
                                    text: "!",
                                    icon: "error",
                                    button: "Ok!",
                                });
                            }
                        })
                        this.setState({ loading: false, error: null })
                    } catch (error) {
                        this.setState({ loading: false, error: error })
                    }
                }
            });
    }

    upCampana = async (campana) => {
        this.setState({ modalIsopen: true, modalTitle: 'Detalle de Omar', loadingModalShow: true });
        await this.getDetailsCampana(campana);
        await this.setVarShowCadena();
        this.setState({ loadingModalShow: false });
    }

    getDetailsCampana = async function (CadenaId) {
        this.setState({ loading: false, error: null })
        await CampanasServices.getDetailsCampana(CadenaId).then((data) => {
            if (!data.hasOwnProperty('errorInfo')) {
                this.setState({ loading: false, campanaDetailsData: data.data });
                console.log("data:", data)
            } else {
                this.setState({ loading: false, error: data.error })
            }
        })
    }
    setVarShowCadena = async () => {
        this.setState(
            {
                modalTitle: `Subir Campaña ${this.state.campanaDetailsData.nombre}`,
                cadena: this.state.campanaDetailsData.cadena.nombre,
                vigencia: customFormatterToView(this.state.campanaDetailsData.desde) + ' - ' + customFormatterToView(this.state.campanaDetailsData.hasta),
                proveedor: this.state.campanaDetailsData.proveedor.nombre,
                seccion: this.state.campanaDetailsData.sesion.cdg_int + '-' + this.state.campanaDetailsData.sesion.nombre,
                editCadenaEstate: false,
                name: this.state.campanaDetailsData.nombre,
                descripcion: 'CHAOOOOOOO',

            })
        this.setState({ modalIsopen: true })
    }

    editCampana = async (campana) => {
        console.log(' editar campana', campana)
    }

    handleCloseModal = e => {
        this.setState({ modalIsopen: false })
    }

    render() {
        return (
            <AdminCampanas
                state={this.state}
                isOpen={this.state.modalIsopen}
                onCloseModal={this.handleCloseModal}
                modalIsopen={this.state.modalIsopen}
                onOpenModal={this.handleOpenModal}
                modalTitle={this.state.modalTitle}
                downloadPdf={this.downloadPdf}
            >
            </AdminCampanas>
        )
    }
}
