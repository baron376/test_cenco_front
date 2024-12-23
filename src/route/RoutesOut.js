import React from "react";
import { Route , Switch} from "react-router-dom";
import Home from '../components/Home';
import LoginInt from '../components/LoginInt';
import LoginPro from '../components/LoginPro';
import LayoutOut from '../components/LayoutOut/Layout';
import DowloadPdfCampanaProveedorContainers from '../components/CampanaProveeedorOut/DowloadPdfCampanaProveedorContainers';
import DowloadPdfCampanaPromotorasContainers from '../components/CampanaPromotorasOut/DowloadPdfCampanaPromotorasContainers';
import DowloadPdfCampanaProveedorNewContainers from '../components/CampanaProveeedorNewOut/DowloadPdfCampanaProveedorNewContainers';
import RebemberPassword from '../components/RemenberPassword';
import UpdatePassword from  '../components/UpdatePassword';
const RoutesOut = () => (
   <Route path={["/", 
   "/LoginInt", 
   "/LoginPro", 
   '/DowloadPdfCampanaProveedor-:id',
   '/DowloadPdfCampanaProveedorNew-:id',
   '/RemenberPasswordPro',
   '/UpdatePasswordPro-:rememberttk']}>
    <LayoutOut>
    <Switch>
    <Route exact path="/" component={Home} ></Route>
    <Route exact path="/LoginInt" component={LoginInt} ></Route>
    <Route exact path="/LoginPro" component={LoginPro} ></Route>
    <Route exact path="/RemenberPasswordPro" component={RebemberPassword} ></Route>
    <Route exact path="/DowloadPdfCampanaProveedor-:id" component={DowloadPdfCampanaProveedorContainers} />
    <Route exact path="/DowloadPdfCampanaPromotora-:id" component={DowloadPdfCampanaPromotorasContainers} />
    <Route exact path="/UpdatePasswordPro-:rememberttk" component={UpdatePassword} />
    <Route exact path="/DowloadPdfCampanaProveedorNew-:id" component={DowloadPdfCampanaProveedorNewContainers} />
    </Switch>
    </LayoutOut>
    </Route>
);

export default RoutesOut;