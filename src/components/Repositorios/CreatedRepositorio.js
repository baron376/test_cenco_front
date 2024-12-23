import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import LoadingOverlay from 'react-loading-overlay';
import Dropzone from 'react-dropzone-uploader';
import ReactSelect  from 'react-select';
import swal from 'sweetalert';
import { useHistory } from "react-router-dom";
import RepositorioUnificadoServices from '../../services/RepositorioUnificadoServices';



function CreatedRepositorio() {

    const history = useHistory(); 
    const [modulos, setModulos] = useState([]);
    const [moduloId, setModuloId] = useState('');
    const [nombreArc, setNombreArc] = useState('');
    const [file, setFile] = useState('');
    const [archivo64, setArchivo64] = useState('');
    const [objeto, setObjeto] = useState([]);
    const [errorsForm, setErrorsForm] = useState({modulo: '', nombre: '', file: '' });
    const [loading, setLoading] = useState([]);
    const [error, setError] = useState([]);
    const [type, setType] = useState('');
    const [isChecked, setIsChecked] = useState(false)
    

    // useEffect(() =>{
    //     getModulos();
    // },[]);

    const dbModulos = [
        {id:4, nombre:'Macros'},
        {id:5, nombre:'Manuales y fichas técnicas Proveedores'},
        {id:7, nombre:'Manuales de Implementación'},
    ];


    const handleSelectChange = ( event ) => {
        setModuloId(event.target.value)
        // let resultado = modulos.find( modulo => Number(modulo.id) === Number(event.target.value));
        // //setNombreArc(resultado.nombre_archivo)
        const { value } = event.target;
        let errors = errorsForm;
                errors.modulo ='';
                errors.nombre ='';
                if(value===''){
                    errors.modulo =' El módulo es requerido';
                }
                if(value===''){
                    errors.nombre =' El nombre del archivo es requerido';
                }
                if(value===''){
                    errors.nombre =' El archivo es requerido';
                }
        
          setErrorsForm({...errorsForm, errors})
        
    }

    const handleChange = ( event ) => {
        
        setIsChecked(!isChecked)
    }

    const getModulos = async function(){
        setLoading(true)
         await RepositorioUnificadoServices.getModulos().then((res) => {
            if(!modulos.hasOwnProperty('errorInfo')){
                // setModulos(res.data)
                setLoading(false)
                }else{
                    setError(res.error)
                }
        })
    }

    const handleSubmit = async e =>{
        e.preventDefault();       
        const objectTosend = {
            nombre: nombreArc,
            nombre_archivo: file,
            url:   file,
            archivo_64: archivo64,
            id_modulo: moduloId,
            descargable: isChecked,
        }
        
        setObjeto( objectTosend )
        CreateRepositorio(objectTosend);
    }

    const getUploadParams = ({ file, meta }) => {
        getBase64(file)
        setFile(file.name)
        if (type === 'application/pdf') {
            setType(file.type)
        }
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
        if( status === 'removed' ){
            setFile('');
            setArchivo64('')
            
        }
    
        if( status === 'done' ){
            setType(meta.type)
            setErrorsForm({...errorsForm, file:''})
        }
        if( meta.type === 'application/pdf' ){
            setType(meta.type)
        }
       
       
      }
    
   const CreateRepositorio = (objeto) =>{
        try{
        setLoading(true)
        validateFormPreSubmit()
        if(validateForm(errorsForm)) {
          RepositorioUnificadoServices.storeRepositorio(objeto).then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                swal({
                    title: `Repositorio registrado con éxito`,
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
            setError(error)
            setLoading(false);
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
        if(nombreArc===''){
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
                    <h2 className="mt-4 mb-4 font-weight-bold pl-3">Crear Repositorio</h2>
                    <form onSubmit={ handleSubmit }>
                        <div className="modal-body">
                        <div className="form-group">
                                <label htmlFor className="col-sm-2 col-form-label">Módulo:</label>
                                <div className="col-sm-6">
                                 <select name="select" className='form-control' onChange={ handleSelectChange }>
                                 <option selected disabled>Seleccione</option>
                                 { dbModulos.map(({ id , nombre} , i) =>(<option value={id} >{nombre}</option>))} 
                                </select>
                                {errorsForm.modulo && <div className="alert alert-danger" role="alert">{errorsForm.modulo}</div>}
                                </div>
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor className="col-sm-2 col-form-label">Nombre:</label>
                                <div className="col-sm-6">
                                <input type="text" placeholder='Nombre' value={nombreArc} onChange={e => setNombreArc(e.target.value)} className="form-control"></input>
                                {errorsForm.nombre && <div className="alert alert-danger" role="alert">{errorsForm.nombre}</div>}
                                </div>
                            </div>

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
                                                styles={{ dropzone: { minHeight: 150, maxHeight: 150, minWidth:750, maxWidth:600 } }}
                                            >
                                            </Dropzone> 
                                            {errorsForm.file && <div className="alert alert-danger" role="alert">{errorsForm.file}</div>}
                                        </div>
                                        </div>
                                        
                            </div>

                           
                           
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        { type === 'application/pdf' &&
                        <div className="form-group">
                                <label htmlFor className="col-sm-2 col-form-label">Archivo descargable:</label>
                                <div className="col-sm-6">
                                <input type="checkbox"  onChange={handleChange} ></input>
                                {errorsForm.nombre && <div className="alert alert-danger" role="alert">{errorsForm.nombre}</div>}
                                </div>
                            </div>
                        }
                            <div className="form-group row ">
                                <div className="">
                                    <button type="submit" className="btn btn-primary">Guardar</button>
                                    <Link to='/Repositorios'> <button type="button" className="btn btn-outline-primary" data-dismiss="modal">Cancelar</button> </Link>
                                </div>
                            </div>
                        </div>                   
                    </form>
                    </LoadingOverlay>
                    </div>
    )
}

export default CreatedRepositorio  