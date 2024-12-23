import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import LoadingOverlay from 'react-loading-overlay';
import Dropzone from 'react-dropzone-uploader';
import ReactSelect  from 'react-select';
import swal from 'sweetalert';
import RepositorioUnificadoServices from '../../services/RepositorioUnificadoServices';
import { useHistory } from "react-router-dom";
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';



function EditarRepositorio() {
    const history = useHistory(); 
    const [modulo, setModulo] = useState([]);
    const [nombreArcSelected, setNombreArcSelected] = useState();
    const [modulos, setModulos] = useState([]);
    const [moduloId, setModuloId] = useState('');
    const [nombreArc, setNombreArc] = useState('');
    const [file, setFile] = useState('');
    const [archivo64, setArchivo64] = useState('');
    const [objeto, setObjeto] = useState([]);
    const [fileEdit, setFileEdit] = useState(null);
    const [errorsForm, setErrorsForm] = useState({modulo: '', nombre: '', file: '' });
    const [loading, setLoading] = useState([]);
    const [error, setError] = useState([]);
    const [isChecked, setIsChecked] = useState(false)
    const [type, setType] = useState('');

  
    let params = useParams();

    const dbModulos = [
        {id:4, nombre:'Macros'},
        {id:5, nombre:'Manuales y fichas técnicas Proveedores'},
        {id:7, nombre:'Manuales de Implementación'},
    ];

    useEffect(() =>{
    getModuloEdit();
        // getModulos();
    },[]);

    const handleSelectChange = ( event ) => {
        setModuloId(event.target.value)        
    }

    const handleChange = ( event ) => {
        
        setIsChecked(!isChecked)
    }


    const getModuloEdit = async () =>{
        setLoading(true)
         await RepositorioUnificadoServices.getRepositorioDetail(params.id).then((res) => {
            if(!modulo.hasOwnProperty('errorInfo')){
                setModuloId(res.data.repositorios.modulo_repositorio.id)
                //setModulo(res.data.repositorios.modulo_repositorio.nombre)
                setNombreArcSelected(res.data.repositorios.nombre)
                setIsChecked(res.data.repositorios.descargable)
                if (isChecked) {
                    setType('application/pdf')
                }
                let dataFileLocal = res.data.repositorios;
                let extension = res.data.extension;
                let transFile = `data:${extension};base64,${dataFileLocal.file_64}`;
                fetch(transFile).then(res => {
                    res.arrayBuffer().then(buf => {
                    const fileEdit = new File([buf],   dataFileLocal.nombre_archivo , { type: extension })
                    setFileEdit(fileEdit);
                    setFile(dataFileLocal.nombre_archivo)
                })
             })
                
                setLoading(false)
                }else{
                    setError(res.error)
                }
        })
    }

    const getModulos = async function(){
        setLoading(true)
         await RepositorioUnificadoServices.getModulos().then((res) => {
            if(!modulos.hasOwnProperty('errorInfo')){
                setModulos(res.data)
                setLoading(false)
                }else{
                    setError(res.error)
                }
        })
    }

    const handleSubmit = async e =>{
        e.preventDefault();       
        const objectTosend = {
            nombre: nombreArcSelected,
            nombre_archivo: file,
            url:   file,
            archivo_64: archivo64,
            id_modulo: moduloId,
            descargable: isChecked,
        }
        setObjeto( objectTosend )
        UpdateRepositorio(objectTosend);

    }

    const getUploadParams = ({ file, meta }) => {
        getBase64(file)
        setFile(file.name)
       
        setType(meta.type)
        return { url: 'https://httpbin.org/post' }
    }


   const getBase64= async function(file) {
      
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      
      setArchivo64(reader.result.split(',').pop());

    };
    reader.onerror = function (error) {
    };
    }
    
    const handleChangeStatus = ({ meta }, status) => {

    }
    
    
   const UpdateRepositorio = (objeto) =>{
        try{
        setLoading(true);
        validateFormPreSubmit()
        if(validateForm(errorsForm)) {
          RepositorioUnificadoServices.updateRepositorio(objeto, params.id).then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                swal({
                    title: `Repositorio actualizado con éxito`,
                    text: "!",
                    icon: "success",
                    button: "Ok!",
                });
                history.push("/Repositorios")
            }else{
                    swal({
                        title: `Error ${data.errorInfo.toString()} `,
                        text: "!",
                        icon: "error",
                        button: "Ok!",
                    });
                }
            })
        }else{
            return;
        }
        } catch(error){
            setLoading(false)
            setError(error)
        }
    }

    const  validateFormPreSubmit = () => {
        let errors = errorsForm;
        errors.modulo= '';
        errors.nombre='';
        errors.file='';
        if(moduloId===''){
            errors.modulo = 'El módulo es requerido';
        }
        if(nombreArcSelected===''){
            errors.nombre ='El nombre del archivo es requerido';
        }
        if(file===''){
            errors.file ='El archivo es requerido';
            
        } 
        setErrorsForm({...errorsForm, errors})
    }

    const validateForm = (errors) => {
        let valid = true;
        Object.values(errors).forEach(
          (val) => val.length > 0 && (valid = false)
        );
        return valid;
    }

       
    return (
        
        <div className="col-10 tabs cont-height">
                    <LoadingOverlay  spinner text='Cargando contenido...' >
                    <h2 className="mt-4 mb-4 font-weight-bold pl-3">Editar Repositorio</h2>
                    <form onSubmit={ handleSubmit }>
                        <div className="modal-body">
                        <div className="form-group">
                                <label htmlFor className="col-sm-2 col-form-label">Módulo:</label>
                                <div className="col-sm-6">
                                 <select name="select" className='form-control' onChange={ handleSelectChange }>
                                 <option disabled>Seleccione</option>
                                 { dbModulos.map(({ id , nombre} , i) =>(
                                   id  === moduloId  ? (
                                    <option value={id} selected >{nombre}</option>
                                  ) : (
                                    <option value={id} >{nombre}</option>
                                  )
                                ))} 
                                  
                                </select>
                                </div>
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor className="col-sm-2 col-form-label">Nombre:</label>
                                <div className="col-sm-6">
                                <input type="text" placeholder='Nombre' value={nombreArcSelected} onChange={e => setNombreArcSelected(e.target.value)} className="form-control"></input>
                                {errorsForm.nombre && <span className='error error-class-i'>{errorsForm.nombre}</span>}
                                </div>
                            </div>

                        { fileEdit &&
                            <div className="form-group">
                                        <label htmlFor className="col-sm-2 col-form-label">Cargar Archivo:</label>
                                        <div className="col-sm-2">
                                        <div className="custom-file">
                                            <Dropzone
                                                minSizeBytes="1"
                                                maxSizeBytes="26000000"
                                                maxFiles={1}
                                                multiple={false}
                                                inputContent="Arrastre o seleccione su archivo"
                                                onChangeStatus={handleChangeStatus}
                                                getUploadParams={ getUploadParams }
                                                initialFiles={[fileEdit]}
                                                styles={{ dropzone: { minHeight: 150, maxHeight: 150, minWidth:750, maxWidth:600 } }}
                                            >
                                            </Dropzone> 
                                            {errorsForm.file && <span className='error error-class-i'>{errorsForm.file}</span>}
                                        </div>
                                        </div>
                            </div>
                            }
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        
                        { (type === 'pdf' || type === 'application/pdf')   &&
                        <div className="form-group">
                                <label htmlFor className="col-sm-2 col-form-label">Archivo descargable:</label>
                                <div className="col-sm-6">
                                <input type="checkbox" checked={isChecked} onChange={handleChange}  ></input>
                                </div>
                            </div>
                        }
                            <div className="form-group row ">
                                <div className="">
                                    <button type="submit" className="btn btn-primary">Enviar</button>
                                    <Link to='/Repositorios'> <button type="button" className="btn btn-outline-primary" data-dismiss="modal">Cancelar</button> </Link>
                                </div>
                            </div>
                        </div>                   
                    </form>
                    </LoadingOverlay>
                    </div>
    )
}

export default EditarRepositorio  