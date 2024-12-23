import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {useState, useEffect} from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { faPencilAlt , faTrashAlt, faFileDownload} from "@fortawesome/free-solid-svg-icons";
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import LoadingOverlay from 'react-loading-overlay';
import { Link } from 'react-router-dom';
import env from "react-dotenv";
import swal from 'sweetalert';
import { hasPermission } from '../../util/auth';
import {customFormatterToView} from '../../util/formats';

import RepositorioUnificadoServices from '../../services/RepositorioUnificadoServices';

function AdminRepositorios() {

    const { SearchBar } = Search;
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState([]);
    const [error, setError] = useState([]);

    
    
    useEffect(() =>{
        getData();
    },[]);


   const getData = async function(){
        setLoading(true)
         await RepositorioUnificadoServices.getRepositorios().then((res) => {
            if(!data.hasOwnProperty('errorInfo')){
                setData(res.data)
                    setLoading(false)
                }else{
                    setError(res.error)
                }
        })
    }

    const options = {
        
        hideSizePerPage: true,
        hidePageListOnlyOnePage: true
      };

    const columns =[{
        dataField: 'modulo',
        text: 'Módulo',
        sort: true
    },

    {
        dataField: 'nombre',
        text: 'Repositorio',
        sort: true
    },
    {
        dataField: 'url',
        text: 'Archivo',
        formatter:archivoFormater.bind(this),
        headerStyle: {
            width: '15%'
          }
    },
    {
        dataField: 'fecha',
        text: 'Fecha creación',
        sort: true,
        formatter:fechaFormater.bind(this),
    },
    {
        dataField: 'actions',
        text: 'Acciones',
        formatter:actionsFormater.bind(this),
        headerStyle: {
            width: '15%'
          }
    },

]


function actionsFormater(cell, row) {
    return (
    <div>
        {hasPermission([1103]) &&
        <Link to={`/EditarRepositorio-${row.id}`}> <button   title="Editar" className="btn btn-primary actions-icons-t" data-toggle="modal" data-target="#modal-lg-sh"><FontAwesomeIcon  icon={faPencilAlt}/></button></Link>
        }
        {hasPermission([1104]) &&
        <button  title="Eliminar"   className="btn btn-danger" onClick={() => {deleteRepositorio(row.id)}}> <FontAwesomeIcon icon={faTrashAlt} /> </button>
        }
    </div>
    
    )
  }

  function archivoFormater(cell, row) {
    return (
    <div>
        {hasPermission([1105]) &&
        <div className="col-sm-8">  <button  title="Descargar archivo" className="btn btn btn-primary actions-icons-t" data-toggle="modal" data-target="#modal-lg" onClick={() => {downloadUrl(row.doc_64, row.url, row.nombre_archivo, row.descargable)}} ><FontAwesomeIcon icon={faFileDownload}/></button></div>            
        }
    </div>
    
    )
  }
  
  function fechaFormater(cell , row) {
    return customFormatterToView(row.fecha)
}


    function moduloFormater(cell , row) {
    return row.nombre === 'mantencion' ? 'Mantención' : row.nombre
    }


const downloadUrl = ( material, url, nombre, descargable ) => {

    const BaseUrl = env.REACT_APP_BASE_URL;
    if ( descargable === 1 ) {
        const linkSource = `data:application/pdf;base64,${material}`;
        const downloadLink = document.createElement("a");
        const fileName = nombre;
        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();
    }else{
        window.open(`${BaseUrl}/`+ url, '_blank');
    }
}

  const deleteRepositorio =  (repositorio) =>{
    console.log( 'eliminar repositorio', repositorio)
  
        swal({
            title: "¿Está seguro que desea Eliminar el repositorio?",
            text: "¡No podrá recuperar los datos de la misma!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                try{
                    RepositorioUnificadoServices.deleteRepositorio(repositorio).then((data) => {;
                        if(!data.hasOwnProperty('errorInfo')){
                        swal({
                            title: `Repositorio eliminado con éxito`,
                            icon: "success",
                            button: "Ok!",
                        });
                        getData();
                        }else{
                            swal({
                                title: `Error ${data.errorInfo.toString()} `,
                                text: "!",
                                icon: "error",
                                button: "Ok!",
                            });
                        }
                    })
                    setLoading(false);
                    setError(null);
                } catch(error){
                    setLoading(false);
                    setError(error);
                }
            }
        });
    
}

    return (
        <div className="col-10 tabs">
            <h2 className="mt-4">Repositorios</h2><hr/>
            <div className="d-flex col justify-content-end pr-0 mt-2">
            {hasPermission([1102]) &&
                <Link to='/CrearRepositorio'> <button  type="button" data-toggle="modal" data-target="#modal-lg" className="btn btn-primary">Crear Repositorio</button> </Link>
            }
            </div>
            <ToolkitProvider keyField="id" data={ data } columns={ columns } search>
            {
                props => (
                <div>
                    <SearchBar { ...props.searchProps } placeholder="Buscar" />
                    
                    <LoadingOverlay active={loading} spinner text='Cargando contenido...' >
                    <BootstrapTable striped hover  { ...props.baseProps } keyField='id' data={data}  columns={columns} pagination={paginationFactory(options)} /> 
                    </LoadingOverlay>
                </div>
                )
            }
            </ToolkitProvider>
        </div>
    )
}

export default AdminRepositorios  