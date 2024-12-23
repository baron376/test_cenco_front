import React, { Component } from 'react'
import LoadingOverlay from 'react-loading-overlay';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { Multiselect } from 'multiselect-react-dropdown';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
export default class SalaCupo extends Component {
    
    render() {
        const dataAll = this.props.state;
        const propsInt = this.props;
        const { SearchBar } = Search;
        const optionsSeccionesCupo = {
            custom: true,
            paginationSize: 3,
            pageStartIndex: 1,
            firstPageText: 'Primera',
            prePageText: 'Anterior',
            nextPageText: 'Siguiente',
            lastPageText: 'Ultima',
            nextPageTitle: 'Primera Pagina',
            prePageTitle: 'Pagina Anterior',
            firstPageTitle: 'Pagina Siguiente',
            lastPageTitle: 'Ultima Pagina',
            totalSize: dataAll.dataSeccionesCupos.length,
            sizePerPageList :[ {
                text: '8', value: 8
              }, {
                text: '16', value: 16
              }, {
                text: 'All', value: dataAll.dataSeccionesCupos.length
              } ]
        };
        const contentTableSecciones = ({ paginationProps, paginationTableProps }) => (
            <div>
              <ToolkitProvider keyField="id" columns={ dataAll.headData } data={ dataAll.dataSeccionesCupos } search >
                {toolkitprops => (
                    <div>
                      <SearchBar { ...toolkitprops.searchProps }  placeholder='Buscar' />
                      <BootstrapTable striped hover { ...toolkitprops.baseProps } { ...paginationTableProps }/>
                    </div>
                  )
                }
              </ToolkitProvider>
              <PaginationListStandalone { ...paginationProps } />
            </div>
        );
        return (
            <React.Fragment>
                <div className="col-10 tabs">
                    <h5 className="mt-4 mb-4">Sala -  {dataAll.cdgLocal} - {dataAll.nombreSapSala}</h5>
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item" role="presentation">
                        <a className="nav-link active" id="activos-tab" data-toggle="tab" href="#activos" role="tab" aria-controls="activos" aria-selected="true">Cupos Promotoras</a>
                        </li>
                        <div className="d-flex col justify-content-end pr-0">
                         <Link to='/Salas'> <button  type="button" data-toggle="modal" data-target="#modal-lg" className="btn btn-danger">Volver</button> </Link>
                        </div>
                    </ul>
                    <LoadingOverlay active={dataAll.loading} spinner text='Cargando contenido...' >
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade show active" id="activos" role="tabpanel" aria-labelledby="activos-tab">
                            <form  onSubmit={propsInt.handleSubmitBs}>
                            &emsp;
                                <div className="form-group">
                                    <label htmlFor className="col-sm-2 col-form-label">Cupos Totales de Sala:</label>
                                    <div className="col-sm-2">
                                    <input type="text" onKeyDown={propsInt.onlyNumber}  value={dataAll.cupoTotalSala} onChange={propsInt.handleChangeI} className="form-control" id="cupoTotalSala" name="cupoTotalSala" placeholder="" />
                                    {dataAll.errorsForm.cupo_total.length > 0 && <span className='error error-class-i'>{dataAll.errorsForm.cupo_total}</span>}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor className="col-sm-2 col-form-label">Cupos Sección:</label>
                                    <div className="col-sm-1">
                                    <input type="text" onKeyDown={propsInt.onlyNumber}  value={dataAll.cupoSeccion} onChange={propsInt.handleChangeI} className="form-control" id="cupoSeccion" name="cupoSeccion" placeholder="" />
                                    {dataAll.errorsForm.cupo_seccion.length > 0 && <span className='error error-class-i'>{dataAll.errorsForm.cupo_seccion}</span>}
                                    </div>
                              
                                        <div className="col-sm-3">
                                            <Multiselect
                                                singleSelect
                                                options={dataAll.listaSecciones} 
                                                onSelect={propsInt.onSelectSecciones} 
                                                onRemove={propsInt.onRemovSecciones}
                                                selectedValues={dataAll.listSeccionesSeleted} 
                                                displayValue="nombre"
                                            />
                                            {dataAll.errorsForm.seccion.length > 0 && <span className='error error-class-i'>{dataAll.errorsForm.seccion}</span>}
                                        </div>
                                        

                                        <div className="col-2 ">
                                        <button type="submit" className="btn btn-primary">Agregar</button>
                                        <Link to='/Salas'> <button type="button" className="btn btn-outline-primary" data-dismiss="modal">Cancelar</button> </Link>
                                        </div>
                                </div>
                                {dataAll.errorsForm.cupo_disponible.length > 0 && <span className='error error-class-i'>{dataAll.errorsForm.cupo_disponible}</span>}
                               
                            </form>

                            <LoadingOverlay active={dataAll.loadinSeccionesCupos} spinner text='Cargando contenido...' >
                            <PaginationProvider pagination={paginationFactory(optionsSeccionesCupo)}>
                                { contentTableSecciones }
                                </PaginationProvider>
                            </LoadingOverlay>
                            </div>
                        </div>
                    </LoadingOverlay>
                  </div>
            </React.Fragment>
        )
    }
}
