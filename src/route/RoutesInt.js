import React from "react";
import { Route , Switch} from "react-router-dom";
import Init from '../components/Init';
import DashboardContainer from '../components/Dashboard/DashboardContainer';
import Layout from '../components/layout/Layout';
import Users from '../components/Security/Users/UsersContainer';
import UsersProveedor from '../components/Proveedor/UsersProveedor/UsersProveedorContainer';
import Cadenas from '../components/Administrator/Cadena/CadenaContainer';
import Sesiones from '../components/Administrator/Sesiones/SesionesContainer';
import Salas from '../components/Administrator/Sala/SalasContainer';
import Roles from '../components/Security/Roles/RolesContrainer';
import AdminFaldonesContainers from '../components/Faldones/Admin/AdminFaldonesContainers';
import NotFount from '../components/layout/NotFound';
import CreatedFaldonesContainer from '../components/Faldones/Admin/CreatedFaldonesContainer';
import EditFaldonesContainers from '../components/Faldones/Admin/EditFaldonesContainers';
import StockDataSalasContainers from '../components/Faldones/Admin/StockDataSalasContainers';
import ShowFaldonesContainers from '../components/Faldones/Admin/ShowFaldonesContainers';
import CreatedCampanaContainers from '../components/Campana/Admin/CreatedCampanaContainers';
import CreatedMantencionContainers from '../components/Mantencion/Admin/CreatedMantencionContainers';
import EditarMantencionContainers from '../components/Mantencion/Admin/EditarMantencionContainers';
import AdminCampanasContainers from '../components/Campana/Admin/AdminCampanasContainers';
import AdminCampanasProveedorContainers from '../components/Proveedor/Campanas/AdminCampanasProveedorContainers';
import AdminCampanasMantencionContainers from '../components/Mantencion/Admin/AdminMantencionContainers';
import SubirPropuestaContainer from '../components/Proveedor/Campanas/SubirPropuestaContainer';
import VerPropuestaContainer from '../components/Proveedor/Campanas/VerCampanaContainer';
import GestionarCampanaContainers from '../components/Campana/Admin/GestionarCampanaContainers';
import GestionarMantencionContainers from '../components/Mantencion/Admin/GestionarMantencionContainers';
import VerCampanaContainers from '../components/Campana/Admin/VerCampanaContainer';
import VerMantencionContainers from '../components/Mantencion/Admin/VerMantencionContainers';
import EditarCampanaContainer from '../components/Campana/Admin/EditarCampanaContainer';
import Marca from '../components/Administrator/Marca/MarcaContainer';
import RolesProveedores from '../components/Proveedor/RolesProveedor/RolesProveedoresContrainer';
import PlantillasContainer from "../components/Faldones/Plantillas/PlantillasContainer";
import FaldonesExpressContainer from './../components/Faldones/FaldonesExpress/FaldonesExpressContainer';
import CreatedFaldonesExpressContainers  from './../components/Faldones/FaldonesExpress/CreatedFaldonesExpressContainers';
import EditFaldonesExpressContainers from './../components/Faldones/FaldonesExpress/EditFaldonesExpressContainers';
import ShowFaldonesExpressContainers from '../components/Faldones/FaldonesExpress/ShowFaldonesExpressContainer';
import AdminCampanasPromotorasContainers from '../components/CampanaPromotoras/AdminCampanasPromotorasContainers';
import CreatedCampanaPromotorasContainers from '../components/CampanaPromotoras/CreatedCampanaPromotorasContainers';
import EditCampanaPromotorasContainers from '../components/CampanaPromotoras/EditCampanaPromotorasContainers';
import SalaCupoContainers from '../components/Administrator/Sala/SalaCupoContainer'; 
import ShowCampanaPromotorasContainers from '../components/CampanaPromotoras/ShowCampanaPromotorasContainers';
import UploadMaterialCampanaPromotorasContainers from '../components/CampanaPromotoras/UploadMaterialCampanaPromotorasContainers';
import GestionarCampanaPromotorasContainers from '../components/CampanaPromotoras/GestionarCampanaPromotorasContainers';
import AdminCampanaInternaContainers from '../components/CampanaInterna/Admin/AdminCampanaInternaContainers';
import AdminComentariosCampanaInternaContainers from '../components/CampanaInterna/Admin/AdminComentariosCampanaInternaContainers';
import CreatedCampanaInternaContainers from '../components/CampanaInterna/Admin/CreatedCampanaInternaContainers';
import VerCampanaInternaContainers from '../components/CampanaInterna/Admin/VerCampanaInternaContainers';
import EditarCampanaInternaContainers from '../components/CampanaInterna/Admin/EditarCampanaInternaContainers';
import RevisarCampanaInternaContainers from '../components/CampanaInterna/Admin/RevisarCampanaInternaContainers';
import AdminIncidenciasContainers from '../components/Incidencias/AdminIncidenciasContainers';
import CreatedIncidenciasContainers from '../components/Incidencias/CreatedIncidenciasContainers';
import EditIncidenciasContainers from '../components/Incidencias/EditIncidenciasContainers'; 
import ShowIncidenciasContainers from '../components/Incidencias/ShowIncidenciasContainers';
import AdminProveedorIncidenciasContainers from '../components/Proveedor/Incidencias/AdminIncidenciasContainers';
import ShowProveedorIncidenciasContainers from '../components/Proveedor/Incidencias/ShowIncidenciasContainers';
import ProveedorContainer from '../components/Administrator/Proveedor/ProveedorContainer';
import Materiales from "../components/Faldones/Admin/Materiales";
import MaterialesMantencion from "../components/Mantencion/Materiales";
import MaterialesProveedor from "../components/Proveedor/Campanas/Materiales";
import AdminRepositorios from "../components/Repositorios/AdminRepositorios";
import CreatedRepositorio from "../components/Repositorios/CreatedRepositorio";
import EditarRepositorio from "../components/Repositorios/EditarRepositorio";
import CreatedCampanaProveedoresNewContainers from '../components/CampanaProveedoresNew/Admin/CreatedCampanaContainers';
import AdminCampanasProveedoresNewContainers from '../components/CampanaProveedoresNew/Admin/AdminCampanasContainers';
import EditarCampanaProveedoresNewContainer from '../components/CampanaProveedoresNew/Admin/EditarCampanaContainer';
import GestionarCampanaProveedoresNewContainers from '../components/CampanaProveedoresNew/Admin/GestionarCampanaContainers';
import VerCampanaNewContainers from '../components/CampanaProveedoresNew/Admin/VerCampanaContainer';
import AdminCampanasProveedorNewContainers from '../components/Proveedor/CampanasNew/AdminCampanasProveedorContainers';
import SubirPropuestaNewContainer from '../components/Proveedor/CampanasNew/SubirPropuestaContainer';
import VerPropuestaNewContainer from '../components/Proveedor/CampanasNew/VerCampanaContainer';
import Created2CampanaContainers from "../components/CampanaProveedoresNew/Admin/Created2CampanaContainers";

const RoutesInt = () => (
   <Route  path={[
      '/Init', 
      '/Users', 
      '/UsersProveedor',
      '/RolesProveedores', 
      '/Roles', 
      '/Salas', 
      '/Cadenas',
      '/Sesiones', 
      '/Faldones' , 
      '/FaldonesCrear' ,
      '/FaldonesEditar-:id',
      '/FaldonesDetalles-:id',
      '/Campanas',
      '/CrearCampana', 
      '/CampanasProv',
      '/Mantencion',
      '/CrearMantencion',
      '/CampanasSubir-:id', 
      '/CampanasGestion-:id',
      '/VerCampana-:id',
      '/EditarCampana-:id',
      '/EditarMantencion-:id',
      '/VerPropuesta-:id',
      '/Marcas',
      '/VerPropuesta-:id',
      '/Plantillas',
      '/FaldonesExpress',
      '/CrearFaldonExpress',
      "/FaldonesExpressEditar-:id",
      "/FaldonesExpressDetalles-:id",
      '/FaldonesStock-:id',
      '/CampanasPromotoras',
      '/CrearCampanaPromotoras',
      '/EditCampanaPromotoras-:id',
      '/VerMantencion-:id',
      '/MantencionGestion-:id',
      '/SalasCupo-:id',
      '/VerCampanaPromotoras-:id',
      '/SubirMaterialCampanaPromotora-:id',
      '/GestionarCampanaPromotoras-:id' ,
      '/CampanaInterna',
      '/CrearCampanaInterna',
      '/VerCampanaInterna-:id',
      '/EditarCampanaInterna-:id',
      '/RevisarCampanaInterna-:id',
      '/ComentariosCampanaInterna-:id',
      '/Incidencias', 
      '/IncidenciasEditar-:id',
      '/CrearIncidencias',
      '/IncidenciasDetalles-:id',
      '/ProveedorIncidencias',
      '/ProveedorIncidenciasDetalles-:id',
      '/Proveedor',
      '/FaldonesMateriales-:id',
      '/MantencionMateriales-:id',
      '/ProveedorMateriales-:id',
      '/Repositorios',
      '/CrearRepositorio',
      '/EditarRepositorio-:id',
      '/CampanasProveedoresNew',
      '/CrearCampanaProveedoresNew',
      '/EditarCampanaProveedoresNew-:id',
      '/CampanasProveedoresNewGestion-:id',
      '/CampanasProvNew',
      '/CampanasNewSubir-:id',
      '/VerCampanaNew-:id',
      '/VerPropuestaNew-:id',
      '/CrearCampanaProveedoresNew/cuposCamapana'
   ]}>
    <Layout>
    <Switch>
     <Route exact path="/Init" component={DashboardContainer} ></Route>
     <Route exact path="/Users" component={Users} ></Route>
     <Route exact path="/UsersProveedor" component={UsersProveedor} ></Route>
     <Route exact path="/Salas" component={Salas} ></Route>
     <Route exact path="/SalasCupo-:id" component={SalaCupoContainers} ></Route>
     <Route exact path="/Roles" component={Roles} ></Route>
     <Route exact path="/RolesProveedores" component={RolesProveedores} ></Route>
     <Route exact path="/Cadenas" component={Cadenas} ></Route>
     <Route exact path="/Sesiones" component={Sesiones} ></Route>
     <Route exact path="/Faldones" component={AdminFaldonesContainers}></Route> 
     <Route exact path="/FaldonesCrear" component={CreatedFaldonesContainer} ></Route> 
     <Route exact path="/FaldonesEditar-:id" component={EditFaldonesContainers} />
     <Route exact path="/FaldonesDetalles-:id" component={ShowFaldonesContainers} />
     <Route exact path="/Plantillas" component={PlantillasContainer} />
     <Route exact path="/FaldonesExpress" component={FaldonesExpressContainer}></Route> 
     <Route exact path="/Campanas" component={AdminCampanasContainers} />
     <Route exact path="/CrearCampana" component={CreatedCampanaContainers} />
     <Route exact path="/CampanasProv" component={AdminCampanasProveedorContainers} />
     <Route exact path="/Mantencion" component={AdminCampanasMantencionContainers} />
     <Route exact path="/CrearMantencion" component={CreatedMantencionContainers} />
     <Route exact path="/EditarMantencion-:id" component={EditarMantencionContainers} />
     <Route exact path="/CampanasSubir-:id" component={SubirPropuestaContainer} />
     <Route exact path="/CampanasGestion-:id" component={GestionarCampanaContainers} />
     <Route exact path="/MantencionGestion-:id" component={GestionarMantencionContainers} />
     <Route exact path="/VerCampana-:id" component={VerCampanaContainers} />
     <Route exact path="/VerMantencion-:id" component={VerMantencionContainers} />
     <Route exact path="/VerPropuesta-:id" component={VerPropuestaContainer} />
     <Route exact path="/EditarCampana-:id" component={EditarCampanaContainer} />
     <Route exact path="/Marcas" component={Marca} />
     <Route exact path="/CrearFaldonExpress" component={CreatedFaldonesExpressContainers} />
     <Route exact path="/FaldonesExpressEditar-:id" component={EditFaldonesExpressContainers} />
     <Route exact path="/FaldonesExpressDetalles-:id" component={ShowFaldonesExpressContainers} />
     <Route exact path="/FaldonesStock-:id" component={StockDataSalasContainers} />
     <Route exact path="/CampanasPromotoras" component={AdminCampanasPromotorasContainers} />
     <Route exact path="/CrearCampanaPromotoras" component={CreatedCampanaPromotorasContainers} />
     <Route exact path="/EditCampanaPromotoras-:id" component={EditCampanaPromotorasContainers} />
     <Route exact path="/VerCampanaPromotoras-:id" component={ShowCampanaPromotorasContainers} />
     <Route exact path="/SubirMaterialCampanaPromotora-:id" component={UploadMaterialCampanaPromotorasContainers} />
     <Route exact path="/GestionarCampanaPromotoras-:id" component={GestionarCampanaPromotorasContainers} />
     <Route exact path="/CrearCampanaInterna" component={CreatedCampanaInternaContainers} />
     <Route exact path="/VerCampanaInterna-:id" component={VerCampanaInternaContainers} />
     <Route exact path="/EditarCampanaInterna-:id" component={EditarCampanaInternaContainers} />
     <Route exact path="/RevisarCampanaInterna-:id" component={RevisarCampanaInternaContainers} />
     <Route exact path="/CampanaInterna" component={AdminCampanaInternaContainers} />
     <Route exact path="/ComentariosCampanaInterna-:id" component={AdminComentariosCampanaInternaContainers} />
     <Route exact path="/Incidencias" component={AdminIncidenciasContainers}/>
     <Route exact path="/CrearIncidencias" component={CreatedIncidenciasContainers} />
     <Route exact path="/IncidenciasEditar-:id" component={EditIncidenciasContainers} />
     <Route exact path="/IncidenciasDetalles-:id" component={ShowIncidenciasContainers} />
     <Route exact path="/FaldonesMateriales-:id" component={Materiales} />
     <Route exact path="/Repositorios" component={AdminRepositorios} />
     <Route exact path="/EditarRepositorio-:id" component={EditarRepositorio} />
     <Route exact path="/CrearRepositorio" component={CreatedRepositorio} />
     <Route exact path="/MantencionMateriales-:id" component={MaterialesMantencion} />
     <Route exact path="/ProveedorMateriales-:id" component={MaterialesProveedor} />
     <Route exact path="/ProveedorIncidencias" component={AdminProveedorIncidenciasContainers}/>
     <Route exact path="/ProveedorIncidenciasDetalles-:id" component={ShowProveedorIncidenciasContainers} />
     <Route exact path="/Proveedor" component={ProveedorContainer} ></Route>
     <Route exact path="/CampanasProveedoresNew" component={AdminCampanasProveedoresNewContainers} />
     <Route exact path="/CrearCampanaProveedoresNew" component={CreatedCampanaProveedoresNewContainers} />
     <Route exact path="/CrearCampanaProveedoresNew/cuposCamapana" component={Created2CampanaContainers} />
     <Route exact path="/EditarCampanaProveedoresNew-:id" component={EditarCampanaProveedoresNewContainer} />
     <Route exact path="/CampanasProveedoresNewGestion-:id" component={GestionarCampanaProveedoresNewContainers} />
     <Route exact path="/CampanasProvNew" component={AdminCampanasProveedorNewContainers} />
     <Route exact path="/CampanasNewSubir-:id" component={SubirPropuestaNewContainer} />
     <Route exact path="/VerCampanaNew-:id" component={VerCampanaNewContainers} />
     <Route exact path="/VerPropuestaNew-:id" component={VerPropuestaNewContainer} />

     <Route  component={NotFount} ></Route> 
   
     
  
    </Switch>
    </Layout>
    </Route>
);

export default RoutesInt;