import React, { Component } from 'react'
import ModalLg from '../../ModalLg';
import LoadingOverlay from 'react-loading-overlay';
import Dropzone from 'react-dropzone-uploader';
import { Multiselect } from 'multiselect-react-dropdown';

export default class MateriaPOP extends Component {
    //agregada esta funcion para validacion
    handleFileValidation = ({ meta }) => {
        const { name } = meta;
        const ext = name.split('.').pop().toLowerCase();
        if (ext !== 'pdf') {
            return 'Solo se permiten archivos PDF';
        }
        return null;
    };

    render() {
        const propsInt = this.props;
        const stateFather = this.props.stateFather;
        return (
            <ModalLg  isOpen={propsInt.isOpen}  onClose={propsInt.onClose} modalTitle={propsInt.modalTitle}>
                <div className="modal fade" id="modal-lg" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title font-weight-bold">{propsInt.modalTitle}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span onClick={propsInt.clearVarModal} aria-hidden="true">×</span>
                        </button>
                    </div>                

                    <form onSubmit={propsInt.handleSubmitBsModal}>
                        <div className="modal-body">
                        {/* <LoadingOverlay active={stateFather.loadingMateriales} spinner text='Cargando contenido...' > */}
                            <div>
                                <div className="form-group">
                                    <label htmlFor className="col-sm-2 col-form-label">Material:</label>
                                    <div className="col-sm-9">
                                    <Multiselect
                                        options={stateFather.listaMateriales} 
                                        onSelect={propsInt.onSelectMaterial} 
                                        onRemove={propsInt.onRemoveMaterial}
                                        selectedValues={stateFather.listMaterialesSeleted} 
                                        displayValue="nombre" 
                                    />
                                    </div>
                                    {stateFather.errorsMaterial.medida_materia.length > 0 && <span className='error error-class-i'>{stateFather.errorsMaterial.medida_materia}</span>}
                                </div>
                                <div className="form-group">
                                        <label htmlFor className="col-sm-2 col-form-label">Cargar Archivo:</label>
                                        <div className="col-sm-6">
                                        <div className="custom-file">
                                            <Dropzone
                                                minSizeBytes="1"
                                                maxSizeBytes="5000000"
                                                maxFiles={1}
                                                multiple={false}
                                                //initialFiles={[dataAll.fileEdit]}
                                                inputContent="Arrastre o seleccione su imagen"
                                                getUploadParams={propsInt.getUploadParams}
                                                onChangeStatus={propsInt.handleChangeStatus}
                                                accept=".pdf" //se agrega esto para que aceptoe solo PDF
                                                validate={this.handleFileValidation} //validar solo PDF
                                                styles={{ dropzone: { minHeight: 150, maxHeight: 150, minWidth:600, maxWidth:600 } }}
                                            >
                                            </Dropzone> 
                                            {stateFather.errorsMaterial.file.length > 0 && <span className='error error-class-i'>{stateFather.errorsMaterial.file}</span>}
                                        </div>
                                        </div>
                                       
                                        
                                    </div>

                                    <div className="form-group">&emsp; &emsp; </div>
                                    <div className="form-group">&emsp; &emsp; </div>

                                <div className="modal-footer row">
                                <div className="col-12 d-flex justify-content-between">
                                    <button  type="submit" className="btn btn-primary">Guardar</button>
                                    <button type="button" onClick={propsInt.clearVarModal} className="btn btn-danger" data-dismiss="modal">Cerrar</button>
                                </div>
                                </div>

                                    

                                    
                            </div>


                             
                             {/* </LoadingOverlay> */}
                        </div>                        
                    </form>                    
                </div>
                </div>
                </div>
            </ModalLg>
        )
    }
}
