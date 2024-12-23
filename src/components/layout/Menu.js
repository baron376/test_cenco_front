import React, { Component } from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import {hasPermission} from '../../util/auth';

export default class Menu extends Component {
    componentDidMount () {
        
    }

    render() {
        return (
            <div className="col-2">
                <div className="sidebar height-100vh   overflow-auto">
                    <nav className="nav flex-column" id="accordion">
                        <Link className="nav-link" to="/Init">Inicio</Link>
                        {hasPermission([401,408 ,412]) &&
                            <a className="nav-link" href="/" data-toggle="collapse" data-target="#navbarToggleFaldones" aria-controls="navbarToggleFaldones" aria-expanded="false" aria-label="Toggle navigation">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.328 0.464L15.528 7.664C15.816 7.952 16 8.36 16 8.8C16 9.24 15.824 9.64 15.528 9.928L9.928 15.528C9.64 15.824 9.24 16 8.8 16C8.36 16 7.96 15.824 7.672 15.536L0.472 8.336C0.176 8.04 0 7.64 0 7.2V1.6C0 0.72 0.72 0 1.6 0H7.2C7.64 0 8.04 0.176 8.328 0.464ZM1.6 2.8C1.6 3.464 2.136 4 2.8 4C3.464 4 4 3.464 4 2.8C4 2.136 3.464 1.6 2.8 1.6C2.136 1.6 1.6 2.136 1.6 2.8Z" fill="#333333"/>
                                </svg>
                                Faldones <img  src={process.env.PUBLIC_URL + '/dist/img/ic-arrow-down.svg'} alt="Desplegable" className="float-right mt-2" />
                            </a>
                        }
                        <div className="collapse" id="navbarToggleFaldones" aria-labelledby="headingOne" data-parent="#accordion">
                            {hasPermission([401]) &&
                                <Link className="nav-link " to="/Faldones">  &emsp; &emsp; Administrar</Link>
                            }
                            {hasPermission([408]) &&
                                <Link className="nav-link" to="/Plantillas"> &emsp; &emsp;Plantillas</Link>
                            }
                            {hasPermission([412]) &&
                                <Link className="nav-link" to="/FaldonesExpress"> &emsp; &emsp;Faldones Express</Link>
                            }
                            {hasPermission([1106,1109]) &&
                            
                                <Link className="nav-link" to="/FaldonesMateriales-4"> &emsp; &emsp;Macros</Link>
                            }
                        </div>

                        {hasPermission([300,301,302,303,304,305,306,306,307,308]) &&  
                            <a className="nav-link" href="/" data-toggle="collapse" data-target="#navbarToggleCampana" aria-controls="navbarToggleCampana" aria-expanded="false" aria-label="Toggle navigation">
                                <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.8 1.6H9.456C9.12 0.672 8.24 0 7.2 0C6.16 0 5.28 0.672 4.944 1.6H1.6C0.72 1.6 0 2.32 0 3.2V14.4C0 15.28 0.72 16 1.6 16H12.8C13.68 16 14.4 15.28 14.4 14.4V3.2C14.4 2.32 13.68 1.6 12.8 1.6ZM7.2 1.6C7.64 1.6 8 1.96 8 2.4C8 2.84 7.64 3.2 7.2 3.2C6.76 3.2 6.4 2.84 6.4 2.4C6.4 1.96 6.76 1.6 7.2 1.6ZM2.4 9.6L5.6 12.8L12 6.4L10.872 5.264L5.6 10.536L3.528 8.472L2.4 9.6Z" fill="#333333"/>
                                </svg>
                                Campaña Proveedor<img  src={process.env.PUBLIC_URL + '/dist/img/ic-arrow-down.svg'} alt="Desplegable" className="float-right mt-2" />
                            </a>
                        }
                        <div className="collapse" id="navbarToggleCampana" aria-labelledby="headingOne" data-parent="#accordion">
                            {hasPermission([300,301,302,303,304,305,306,306,307,308]) &&
                                <Link className="nav-link " to="/Campanas">  &emsp; &emsp; Administrar</Link>
                            }
                            {hasPermission([300]) &&
                                <Link className="nav-link" to="/CrearCampana"> &emsp; &emsp;Crear Nueva</Link>
                            }
                        </div>

                        {hasPermission([900,901,902,903,904,905,906,907,908]) &&  
                            <a className="nav-link" href="/" data-toggle="collapse" data-target="#navbarToggleCampanaPromotoras" aria-controls="navbarToggleCampanaPromotoras" aria-expanded="false" aria-label="Toggle navigation">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.3636 0V2.90909H16L14.8 14.9309C14.7273 15.5273 14.2255 16 13.6145 16H12.3782L12.3636 10.1818C12.3636 7.10545 10.1091 5.20727 7.44 4.58909L7.27273 2.90909H10.9091V0H12.3636ZM0.734545 15.9927C0.327273 15.9927 0 15.6655 0 15.2582V14.5455H10.9164V15.2582C10.9164 15.6655 10.5891 15.9927 10.1818 15.9927H0.734545ZM5.45455 5.81091C2.72727 5.81091 0 7.27273 0 10.1818H10.9091C10.9091 7.27273 8.18182 5.81091 5.45455 5.81091ZM10.9091 11.6364H0V13.0909H10.9091V11.6364Z" fill="#333333"/>
                                </svg>
                                Campañas Promotoras <img  src={process.env.PUBLIC_URL + '/dist/img/ic-arrow-down.svg'} alt="Desplegable" className="float-right mt-2" />
                            </a>
                        }
                        <div className="collapse" id="navbarToggleCampanaPromotoras" aria-labelledby="headingOne" data-parent="#accordion">
                            {hasPermission([900,901,902,903,904,905,906,907,908]) &&
                                <Link className="nav-link " to="/CampanasPromotoras">  &emsp; &emsp; Administrar</Link>
                            }
                            {hasPermission([900]) &&
                                <Link className="nav-link" to="/CrearCampanaPromotoras"> &emsp; &emsp;Crear Nueva</Link>
                            }
                        </div> 

                        {hasPermission([800,801,802,803,804,805,806,807]) &&  
                            <a className="nav-link" href="/" data-toggle="collapse" data-target="#navbarToggleCampanaInterna" aria-controls="navbarToggleCampanaInterna" aria-expanded="false" aria-label="Toggle navigation">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M15.2 0H0.8C0.355556 0 0 0.355556 0 0.8V15.2C0 15.5556 0.355556 16 0.8 16H15.2C15.5556 16 16 15.5556 16 15.2V0.8C16 0.355556 15.5556 0 15.2 0ZM5.33333 3.55556H3.55556V5.33333H5.33333V3.55556ZM12.4444 3.55556H7.11111V5.33333H12.4444V3.55556ZM12.4444 7.11111H7.11111V8.88889H12.4444V7.11111ZM7.11111 10.6667H12.4444V12.4444H7.11111V10.6667ZM3.55556 7.11111H5.33333V8.88889H3.55556V7.11111ZM5.33333 10.6667H3.55556V12.4444H5.33333V10.6667ZM1.77778 14.2222H14.2222V1.77778H1.77778V14.2222Z" fill="#333333"/>
                                </svg>
                                Campañas Internas<img  src={process.env.PUBLIC_URL + '/dist/img/ic-arrow-down.svg'} alt="Desplegable" className="float-right mt-2" />
                            </a>
                        }
                        <div className="collapse" id="navbarToggleCampanaInterna" aria-labelledby="headingOne" data-parent="#accordion">
                            {hasPermission([800,801,802,803,804,805,806,807]) &&
                                <Link className="nav-link " to="/CampanaInterna">  &emsp; &emsp; Administrar</Link>
                            }
                            {hasPermission([801]) &&
                                <Link className="nav-link" to="/CrearCampanaInterna"> &emsp; &emsp;Crear Nueva</Link>
                            }
                            
                        </div>

                        {hasPermission([1001]) &&  
                            <a className="nav-link" href="/" data-toggle="collapse" data-target="#navbarToggleIncidencia" aria-controls="navbarToggleIncidencia" aria-expanded="false" aria-label="Toggle navigation">
                                <svg width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11.2 0H4.8L0.016 4.8L0 14.4C0 15.28 0.72 16 1.6 16H11.2C12.08 16 12.8 15.28 12.8 14.4V1.6C12.8 0.72 12.08 0 11.2 0ZM7.2 12H5.6V10.4H7.2V12ZM5.6 8.8H7.2V4.8H5.6V8.8Z" fill="#333333"/>
                                </svg>
                                Incidencias <img  src={process.env.PUBLIC_URL + '/dist/img/ic-arrow-down.svg'} alt="Desplegable" className="float-right mt-2" />
                            </a>
                        }
                        <div className="collapse" id="navbarToggleIncidencia" aria-labelledby="headingOne" data-parent="#accordion">
                            {hasPermission([1001,1002,1003,1004,1005]) &&
                                <Link className="nav-link " to="/Incidencias">  &emsp; &emsp; Administrar</Link>
                            }
                            {hasPermission([1002]) &&
                                <Link className="nav-link" to="/CrearIncidencias"> &emsp; &emsp;Crear Nueva</Link>
                            }
                        </div>

                        {hasPermission([700,701,702,703,704,705,706,707,708,708,710,711,712,713,714]) &&  
                            <a className="nav-link" href="/" data-toggle="collapse" data-target="#navbarToggleMantencion" aria-controls="navbarToggleMantencion" aria-expanded="false" aria-label="Toggle navigation">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.10092 1.38107C6.63251 -0.0828212 4.43355 -0.381427 2.66562 0.477975L5.83621 3.63882L3.64456 5.82374L0.473969 2.66289C-0.380776 4.43268 -0.0812499 6.61031 1.38716 8.07421C2.74598 9.42886 4.73308 9.78573 6.42065 9.1521L13.076 15.787C13.3609 16.071 13.8211 16.071 14.106 15.787L15.7863 14.1119C16.0712 13.8278 16.0712 13.369 15.7863 13.085L9.16022 6.47193C9.83232 4.7677 9.48166 2.75757 8.10092 1.38107Z" fill="#333333"/>
                                </svg>
                                Mantenciones <img  src={process.env.PUBLIC_URL + '/dist/img/ic-arrow-down.svg'} alt="Desplegable" className="float-right mt-2" />
                            </a>
                        }
                        <div className="collapse" id="navbarToggleMantencion" aria-labelledby="headingOne" data-parent="#accordion">
                            {hasPermission([700,701,702,703,704,705,706,707,708,708,710,711,712,713,714]) &&
                                <Link className="nav-link " to="/Mantencion">  &emsp; &emsp; Administrar</Link>
                            }
                            {hasPermission([701]) &&
                                <Link className="nav-link" to="/CrearMantencion"> &emsp; &emsp;Crear Nueva</Link>
                            }
                            {hasPermission([1107,11010]) &&
                                <Link className="nav-link" to="/MantencionMateriales-7"> &emsp; &emsp;Manuales de implementación</Link>
                            }
                        </div>

                        {hasPermission([500,501,502,503,504,505,506]) &&    
                            <a className="nav-link" href="/" data-toggle="collapse" data-target="#navbarToggleProveedor" aria-controls="navbarToggleProveedor" aria-expanded="false" aria-label="Toggle navigation">
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M13.0263 4.22368H15.6316C16.5955 4.22368 17.3684 4.99658 17.3684 5.96053V15.5132C17.3684 16.4771 16.5955 17.25 15.6316 17.25H1.73684C0.772895 17.25 0 16.4771 0 15.5132V5.96053C0 4.99658 0.772895 4.22368 1.73684 4.22368H4.34211V2.48684C4.34211 1.52289 5.115 0.75 6.07895 0.75H11.2895C12.2534 0.75 13.0263 1.52289 13.0263 2.48684V4.22368ZM11.2895 2.48684H6.07895V4.22368H11.2895V2.48684ZM15.6316 15.5132H1.73684V13.7763H15.6316V15.5132ZM1.73684 11.1711H15.6316V5.96053H13.0263V7.69737H11.2895V5.96053H6.07895V7.69737H4.34211V5.96053H1.73684V11.1711Z" fill="#333333"/>
                                </svg>
                                Proveedor <img  src={process.env.PUBLIC_URL + '/dist/img/ic-arrow-down.svg'} alt="Desplegable" className="float-right mt-2" />
                            </a>
                        }
                        <div className="collapse" id="navbarToggleProveedor" aria-labelledby="headingOne" data-parent="#accordion">
                            {hasPermission([500,501,502,503,504,505,506]) &&
                                <Link className="nav-link " to="/CampanasProv">  &emsp; &emsp; Campañas Proveedores</Link>
                            }
                            {hasPermission([518]) &&
                                <Link className="nav-link " to="/CampanasPromotoras">  &emsp; &emsp; Promotoras</Link>
                            }
                    
                            {hasPermission([516,517]) &&
                                <Link className="nav-link " to="/ProveedorIncidencias">  &emsp; &emsp; Incidencias</Link>
                            }
                            {hasPermission([514]) &&
                                <Link className="nav-link " to="/UsersProveedor">  &emsp; &emsp; Usuarios Proveedores</Link>
                            }
                            {hasPermission([513]) &&
                                <Link className="nav-link" to="/RolesProveedores">&emsp; &emsp; Roles Proveedor</Link>
                            }
                            {hasPermission([1108,11011]) &&
                            <Link className="nav-link" to="/ProveedorMateriales-5"> &emsp; &emsp;Manuales y fichas técnicas</Link>
                            }
                            {hasPermission([500,501,502,503,504,505,506]) &&
                                <Link className="nav-link " to="/CampanasProvNew">  &emsp; &emsp; Campañas Proveedores New</Link>
                            }
                        </div>

                        {hasPermission([210, 211]) &&               
                            <a className="nav-link" href="/" data-toggle="collapse" data-target="#navbarToggleSeguridad" aria-controls="navbarToggleSeguridad" aria-expanded="false" aria-label="Toggle navigation">
                                <svg width="15" height="20" viewBox="0 0 15 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0 4.16667L7.5 0.833336L15 4.16667V9.16667C15 13.7917 11.8 18.1167 7.5 19.1667C3.2 18.1167 0 13.7917 0 9.16667V4.16667ZM2.5 10.8333L5.83333 14.1667L12.5 7.5L11.325 6.31667L5.83333 11.8083L3.675 9.65834L2.5 10.8333Z" fill="#333333"/>
                                </svg>
                                Seguridad <img  src={process.env.PUBLIC_URL + '/dist/img/ic-arrow-down.svg'} alt="Desplegable" className="float-right mt-2" />
                            </a>
                        }
                        <div className="collapse" id="navbarToggleSeguridad" aria-labelledby="headingOne" data-parent="#accordion">
                            {hasPermission([210]) &&
                                <Link className="nav-link " to="/Users"> &emsp;&emsp; Usuarios</Link>
                            }
                            {hasPermission([211]) &&
                                <Link className="nav-link" to="/Roles">&emsp; &emsp; Roles</Link>
                            }
                        </div>

                        {hasPermission([113, 114 , 115,217]) && 
                            <a className="nav-link last-li" href="/" data-toggle="collapse" data-target="#navbarToggleAdministracion" aria-controls="navbarToggleAdministracion" aria-expanded="false" aria-label="Toggle navigation">
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.5 3.5C10.5 5.43375 8.93375 7 7 7C5.06625 7 3.5 5.43375 3.5 3.5C3.5 1.56625 5.06625 0 7 0C8.93375 0 10.5 1.56625 10.5 3.5ZM0 12.25C0 9.9225 4.66375 8.75 7 8.75C9.33625 8.75 14 9.9225 14 12.25V14H0V12.25Z" fill="#333333"/>
                                </svg>
                                Administración <img src={process.env.PUBLIC_URL + '/dist/img/ic-arrow-down.svg'} alt="Desplegable" className="float-right mt-2" />
                            </a>
                        }
                        <div className="collapse" id="navbarToggleAdministracion" aria-labelledby="headingOne" data-parent="#accordion">
                            {hasPermission([113]) &&
                                <Link className="nav-link" to="/Cadenas"> &emsp; &emsp;Cadenas</Link>
                            }
                            {hasPermission([114]) &&
                                <Link className="nav-link" to="/Salas"> &emsp; &emsp; Salas</Link>
                            }
                            {hasPermission([115]) &&
                                <Link className="nav-link" to="/Sesiones"> &emsp; &emsp;Secciones</Link>
                            }
                            {hasPermission([217]) &&
                                <Link className="nav-link" to="/Marcas"> &emsp; &emsp;Marcas</Link>
                            }
                            {hasPermission([219,220]) &&
                                <Link className="nav-link" to="/Proveedor"> &emsp; &emsp;Proveedores</Link>
                            }
                            
                        </div>

                        {hasPermission([1101,1102,1103,1104,1105]) &&
                            <a className="nav-link last-li" href="/" data-toggle="collapse" data-target="#navbarToggleRepositorios" aria-controls="navbarToggleRepositorios" aria-expanded="false" aria-label="Toggle navigation">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M14.4 0H4.8C3.92 0 3.2 0.72 3.2 1.6V11.2C3.2 12.08 3.92 12.8 4.8 12.8H14.4C15.28 12.8 16 12.08 16 11.2V1.6C16 0.72 15.28 0 14.4 0ZM1.6 3.2H0V14.4C0 15.28 0.72 16 1.6 16H12.8V14.4H1.6V3.2ZM5.6 7.2H13.6V5.6H5.6V7.2ZM10.4 10.4H5.6V8.8H10.4V10.4ZM5.6 4H13.6V2.4H5.6V4Z" fill="#333333"/>
                                </svg>
                                Repositorios <img src={process.env.PUBLIC_URL + '/dist/img/ic-arrow-down.svg'} alt="Desplegable" className="float-right mt-2" />
                            </a>
                        }
                        <div className="collapse" id="navbarToggleRepositorios" aria-labelledby="headingOne" data-parent="#accordion">
                        {hasPermission([1101,1102,1103,1104,1105]) &&
                            <Link className="nav-link" to="/Repositorios"> &emsp; &emsp;Administrar</Link>
                        }
                        {hasPermission([1102]) &&
                            <Link className="nav-link" to="/CrearRepositorio"> &emsp; &emsp; Crear</Link>
                        }
                        </div>

                        {hasPermission([300,301,302,303,304,305,306,306,307,308]) &&  
                            <a className="nav-link" href="/" data-toggle="collapse" data-target="#navbarToggleCampanaNew" aria-controls="navbarToggleCampanaNew" aria-expanded="false" aria-label="Toggle navigation">
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M13.0263 4.22368H15.6316C16.5955 4.22368 17.3684 4.99658 17.3684 5.96053V15.5132C17.3684 16.4771 16.5955 17.25 15.6316 17.25H1.73684C0.772895 17.25 0 16.4771 0 15.5132V5.96053C0 4.99658 0.772895 4.22368 1.73684 4.22368H4.34211V2.48684C4.34211 1.52289 5.115 0.75 6.07895 0.75H11.2895C12.2534 0.75 13.0263 1.52289 13.0263 2.48684V4.22368ZM11.2895 2.48684H6.07895V4.22368H11.2895V2.48684ZM15.6316 15.5132H1.73684V13.7763H15.6316V15.5132ZM1.73684 11.1711H15.6316V5.96053H13.0263V7.69737H11.2895V5.96053H6.07895V7.69737H4.34211V5.96053H1.73684V11.1711Z" fill="#333333"/>
                                </svg>
                                Campaña Proveedor New<img  src={process.env.PUBLIC_URL + '/dist/img/ic-arrow-down.svg'} alt="Desplegable" className="float-right mt-2" />
                            </a>
                        }
                        <div className="collapse" id="navbarToggleCampanaNew" aria-labelledby="headingOne" data-parent="#accordion">
                            {hasPermission([300,301,302,303,304,305,306,306,307,308]) &&
                                <Link className="nav-link " to="/CampanasProveedoresNew">  &emsp; &emsp; Administrar</Link>
                            }
                            {hasPermission([300]) &&
                                <Link className="nav-link" to="/CrearCampanaProveedoresNew"> &emsp; &emsp;Crear Nueva</Link>
                            }
                        </div>
                    </nav>
                </div>
            </div>
        )
    }
}
