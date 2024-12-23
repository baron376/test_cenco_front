import React, { Component } from 'react'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import LoadingOverlay from 'react-loading-overlay';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import {hasPermission} from '../../util/auth';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

export default class Dashboard extends Component {
    render() {
        const { SearchBar } = Search;
        const dataAll = this.props.state;
        return (
            <React.Fragment>
                <div className="col-10 bg-grey tabs">
                    <h2 className="mt-4 mb-4">Dashboard</h2>
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <a className="nav-link active" id="activos-tab" data-toggle="tab" href="#activos" role="tab" aria-controls="activos" aria-selected="true">Activos</a>
                        </li>
                        <li className="nav-item" role="presentation">
                            <a className="nav-link" id="pendientes-tab" data-toggle="tab" href="#pendientes" role="tab" aria-controls="pendientes" aria-selected="false">Pendientes</a>
                        </li>
                    </ul>
                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade show active" id="activos" role="tabpanel" aria-labelledby="activos-tab">
                            <div className="row">
                                <div className="col-4">
                                    {hasPermission([401]) &&
                                    <Card className="mb-4">
                                        <Card.Body>
                                            <Card.Title>
                                                <svg width="66" height="83" viewBox="0 0 66 83" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.25 0H41.25L66 24.75V74.25C66 78.7875 62.2875 82.5 57.75 82.5H8.20875C3.67125 82.5 0 78.7875 0 74.25V8.25C0 3.7125 3.7125 0 8.25 0ZM16.5 66H49.5V57.75H16.5V66ZM49.5 49.5H16.5V41.25H49.5V49.5ZM37.125 6.1875V28.875H59.8125L37.125 6.1875Z" fill="#126AB0"/>
                                                </svg>
                                                <p>
                                                    Campañas faldones:
                                                    <span>{dataAll.campanasActivas}</span>
                                                </p>
                                            </Card.Title>
                                        </Card.Body>
                                    </Card>}

                                    {hasPermission([412]) &&
                                    <Card className="mb-4">
                                        <Card.Body>
                                            <Card.Title>
                                                <svg width="66" height="83" viewBox="0 0 66 83" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.25 0H41.25L66 24.75V74.25C66 78.7875 62.2875 82.5 57.75 82.5H8.20875C3.67125 82.5 0 78.7875 0 74.25V8.25C0 3.7125 3.7125 0 8.25 0ZM16.5 66H49.5V57.75H16.5V66ZM49.5 49.5H16.5V41.25H49.5V49.5ZM37.125 6.1875V28.875H59.8125L37.125 6.1875Z" fill="#126AB0"/>
                                                </svg>
                                                <p>
                                                    Campañas faldones express:
                                                    <span>{dataAll.campanasExpressActivas}</span>
                                                </p>
                                            </Card.Title>
                                        </Card.Body>
                                    </Card>}
                                </div>
                                <div className="col-4">
                                    {hasPermission([900,901,902,903,904,905,906,907,908]) &&
                                    <Card className="mb-4">
                                        <Card.Body>
                                            <Card.Title>
                                                <svg width="71" height="71" viewBox="0 0 71 71" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M54.8636 0V12.9091H71L65.675 66.2559C65.3523 68.9023 63.1255 71 60.4145 71H54.9282L54.8636 45.1818C54.8636 31.5305 44.8591 23.1073 33.015 20.3641L32.2727 12.9091H48.4091V0H54.8636ZM3.25955 70.9677C1.45227 70.9677 0 69.5155 0 67.7082V64.5455H48.4414V67.7082C48.4414 69.5155 46.9891 70.9677 45.1818 70.9677H3.25955ZM24.2045 25.7859C12.1023 25.7859 0 32.2727 0 45.1818H48.4091C48.4091 32.2727 36.3068 25.7859 24.2045 25.7859ZM48.4091 51.6364H0V58.0909H48.4091V51.6364Z" fill="#0D99FF"/>
                                                </svg>
                                                <p>
                                                    Campaña Promotoras:
                                                    <span>{dataAll.campanasPromotorasActivas}</span>
                                                </p>
                                            </Card.Title>
                                        </Card.Body>
                                    </Card>}
                                    {hasPermission([300,301,302,303,304,305,306,306,307,308,505]) &&
                                    <Card className="mb-4">
                                        <Card.Body>
                                            <Card.Title>
                                                <svg width="73" height="81" viewBox="0 0 73 81" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M64.8 8.1H47.871C46.17 3.402 41.715 0 36.45 0C31.185 0 26.73 3.402 25.029 8.1H8.1C3.645 8.1 0 11.745 0 16.2V72.9C0 77.355 3.645 81 8.1 81H64.8C69.255 81 72.9 77.355 72.9 72.9V16.2C72.9 11.745 69.255 8.1 64.8 8.1ZM36.45 8.1C38.6775 8.1 40.5 9.9225 40.5 12.15C40.5 14.3775 38.6775 16.2 36.45 16.2C34.2225 16.2 32.4 14.3775 32.4 12.15C32.4 9.9225 34.2225 8.1 36.45 8.1ZM12.15 48.6L28.35 64.8L60.75 32.4L55.0395 26.649L28.35 53.3385L17.8605 42.8895L12.15 48.6Z" fill="#0D99FF"/>
                                                </svg>
                                                <p>
                                                    Campaña Proveedores:
                                                    <span>{dataAll.campanasProveedoresActivas}</span>
                                                </p>
                                            </Card.Title>
                                        </Card.Body>
                                    </Card>}
                                </div>
                                <div className="col-4">
                                    {hasPermission([800,801,802,803,804,805,806,807]) &&
                                    <Card className="mb-4">
                                        <Card.Body>
                                            <Card.Title>
                                                <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M66.5 0H3.5C1.55556 0 0 1.55556 0 3.5V66.5C0 68.0556 1.55556 70 3.5 70H66.5C68.0556 70 70 68.0556 70 66.5V3.5C70 1.55556 68.0556 0 66.5 0ZM23.3333 15.5556H15.5556V23.3333H23.3333V15.5556ZM54.4444 15.5556H31.1111V23.3333H54.4444V15.5556ZM54.4444 31.1111H31.1111V38.8889H54.4444V31.1111ZM31.1111 46.6667H54.4444V54.4444H31.1111V46.6667ZM15.5556 31.1111H23.3333V38.8889H15.5556V31.1111ZM23.3333 46.6667H15.5556V54.4444H23.3333V46.6667ZM7.77778 62.2222H62.2222V7.77778H7.77778V62.2222Z" fill="#FF8A00"/>
                                                </svg>
                                                <p>
                                                    Campaña Interna:
                                                    <span>{dataAll.campanasInternasActivas}</span>
                                                </p>
                                            </Card.Title>
                                        </Card.Body>
                                    </Card>}
                                    {hasPermission([700,701,702,703,704,705,706,707,708,709,710,711,712,713,714,715]) &&
                                    <Card className="mb-4">
                                        <Card.Body>
                                            <Card.Title>
                                                <svg width="71" height="71" viewBox="0 0 71 71" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M35.9478 6.12852C29.4318 -0.367519 19.6739 -1.69258 11.8287 2.12101L25.8982 16.1473L16.1727 25.8429L2.10324 11.8166C-1.68969 19.67 -0.360546 29.3333 6.15551 35.8293C12.1853 41.8406 21.003 43.4242 28.4916 40.6124L58.0246 70.0547C59.2889 71.3151 61.3313 71.3151 62.5956 70.0547L70.0518 62.6214C71.3161 61.361 71.3161 59.3249 70.0518 58.0645L40.6485 28.7192C43.6309 21.1567 42.0749 12.2367 35.9478 6.12852Z" fill="#FF8A00"/>
                                                </svg>
                                                <p>
                                                    Mantenciones:
                                                    <span>{dataAll.mantencionesActivas}</span>
                                                </p>
                                            </Card.Title>
                                        </Card.Body>
                                    </Card>}
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade show pendientes" id="pendientes" role="tabpanel" aria-labelledby="pendientes-tab">
                            <div className="row">
                                <div className="col-4">
                                    {hasPermission([401]) &&
                                    <Card className="mb-4">
                                        <Card.Body>
                                            <Card.Title>
                                                <svg width="66" height="83" viewBox="0 0 66 83" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.25 0H41.25L66 24.75V74.25C66 78.7875 62.2875 82.5 57.75 82.5H8.20875C3.67125 82.5 0 78.7875 0 74.25V8.25C0 3.7125 3.7125 0 8.25 0ZM16.5 66H49.5V57.75H16.5V66ZM49.5 49.5H16.5V41.25H49.5V49.5ZM37.125 6.1875V28.875H59.8125L37.125 6.1875Z" fill="#126AB0"/>
                                                </svg>
                                                <p>
                                                    Campañas faldones:
                                                    <span>{dataAll.campanasPendientes}</span>
                                                </p>
                                            </Card.Title>
                                        </Card.Body>
                                    </Card>}

                                    {hasPermission([412]) &&
                                    <Card className="mb-4">
                                        <Card.Body>
                                            <Card.Title>
                                                <svg width="66" height="83" viewBox="0 0 66 83" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.25 0H41.25L66 24.75V74.25C66 78.7875 62.2875 82.5 57.75 82.5H8.20875C3.67125 82.5 0 78.7875 0 74.25V8.25C0 3.7125 3.7125 0 8.25 0ZM16.5 66H49.5V57.75H16.5V66ZM49.5 49.5H16.5V41.25H49.5V49.5ZM37.125 6.1875V28.875H59.8125L37.125 6.1875Z" fill="#126AB0"/>
                                                </svg>
                                                <p>
                                                    Campañas faldones express:
                                                    <span>{dataAll.campanasExpressPendientes}</span>
                                                </p>
                                            </Card.Title>
                                        </Card.Body>
                                    </Card>}
                                </div>
                                <div className="col-4">
                                    {hasPermission([900,901,902,903,904,905,906,907,908]) &&
                                    <Card className="mb-4">
                                        <Card.Body>
                                            <Card.Title>
                                                <svg width="71" height="71" viewBox="0 0 71 71" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M54.8636 0V12.9091H71L65.675 66.2559C65.3523 68.9023 63.1255 71 60.4145 71H54.9282L54.8636 45.1818C54.8636 31.5305 44.8591 23.1073 33.015 20.3641L32.2727 12.9091H48.4091V0H54.8636ZM3.25955 70.9677C1.45227 70.9677 0 69.5155 0 67.7082V64.5455H48.4414V67.7082C48.4414 69.5155 46.9891 70.9677 45.1818 70.9677H3.25955ZM24.2045 25.7859C12.1023 25.7859 0 32.2727 0 45.1818H48.4091C48.4091 32.2727 36.3068 25.7859 24.2045 25.7859ZM48.4091 51.6364H0V58.0909H48.4091V51.6364Z" fill="#0D99FF"/>
                                                </svg>
                                                <p>
                                                    Campaña Promotoras:
                                                    <span>{dataAll.campanasPromotorasPendientes}</span>
                                                </p>
                                            </Card.Title>
                                        </Card.Body>
                                    </Card>}
                                    {hasPermission([300,301,302,303,304,305,306,306,307,308]) &&
                                    <Card className="mb-4">
                                        <Card.Body>
                                            <Card.Title>
                                                <svg width="73" height="81" viewBox="0 0 73 81" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M64.8 8.1H47.871C46.17 3.402 41.715 0 36.45 0C31.185 0 26.73 3.402 25.029 8.1H8.1C3.645 8.1 0 11.745 0 16.2V72.9C0 77.355 3.645 81 8.1 81H64.8C69.255 81 72.9 77.355 72.9 72.9V16.2C72.9 11.745 69.255 8.1 64.8 8.1ZM36.45 8.1C38.6775 8.1 40.5 9.9225 40.5 12.15C40.5 14.3775 38.6775 16.2 36.45 16.2C34.2225 16.2 32.4 14.3775 32.4 12.15C32.4 9.9225 34.2225 8.1 36.45 8.1ZM12.15 48.6L28.35 64.8L60.75 32.4L55.0395 26.649L28.35 53.3385L17.8605 42.8895L12.15 48.6Z" fill="#0D99FF"/>
                                                </svg>
                                                <p>
                                                    Campaña Proveedores:
                                                    <span>{dataAll.campanasProveedoresPendientes}</span>
                                                </p>
                                            </Card.Title>
                                        </Card.Body>
                                    </Card>}
                                </div>
                                <div className="col-4">
                                    {hasPermission([800,801,802,803,804,805,806,807]) &&
                                    <Card className="mb-4">
                                        <Card.Body>
                                            <Card.Title>
                                                <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M66.5 0H3.5C1.55556 0 0 1.55556 0 3.5V66.5C0 68.0556 1.55556 70 3.5 70H66.5C68.0556 70 70 68.0556 70 66.5V3.5C70 1.55556 68.0556 0 66.5 0ZM23.3333 15.5556H15.5556V23.3333H23.3333V15.5556ZM54.4444 15.5556H31.1111V23.3333H54.4444V15.5556ZM54.4444 31.1111H31.1111V38.8889H54.4444V31.1111ZM31.1111 46.6667H54.4444V54.4444H31.1111V46.6667ZM15.5556 31.1111H23.3333V38.8889H15.5556V31.1111ZM23.3333 46.6667H15.5556V54.4444H23.3333V46.6667ZM7.77778 62.2222H62.2222V7.77778H7.77778V62.2222Z" fill="#FF8A00"/>
                                                </svg>
                                                <p>
                                                    Campaña Interna:
                                                    <span>{dataAll.campanasInternasPendientes}</span>
                                                </p>
                                            </Card.Title>
                                        </Card.Body>
                                    </Card>}
                                    {hasPermission([300,301,302,303,304,305,306,306,307,308]) &&
                                    <Card className="mb-4">
                                        <Card.Body>
                                            <Card.Title>
                                                <svg width="71" height="71" viewBox="0 0 71 71" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M35.9478 6.12852C29.4318 -0.367519 19.6739 -1.69258 11.8287 2.12101L25.8982 16.1473L16.1727 25.8429L2.10324 11.8166C-1.68969 19.67 -0.360546 29.3333 6.15551 35.8293C12.1853 41.8406 21.003 43.4242 28.4916 40.6124L58.0246 70.0547C59.2889 71.3151 61.3313 71.3151 62.5956 70.0547L70.0518 62.6214C71.3161 61.361 71.3161 59.3249 70.0518 58.0645L40.6485 28.7192C43.6309 21.1567 42.0749 12.2367 35.9478 6.12852Z" fill="#FF8A00"/>
                                                </svg>
                                                <p>
                                                    Mantenciones:
                                                    <span>{dataAll.mantencionesPendientes}</span>
                                                </p>
                                            </Card.Title>
                                        </Card.Body>
                                    </Card>}
                                </div>
                            </div>
                        </div>
                    </div> 
                </div>  
            </React.Fragment>
        )
    }
}
