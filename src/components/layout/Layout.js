import React, { Component } from 'react'
import Header from '../layout/Header';
import HeaderHtml from '../layout/HeaderHtml';
import Menu from '../layout/Menu';
import Footer from '../layout/Footer';
import withAuth from '../withAuth';
// import GetErrosJs from'../layout/GetErrorJs';
  class Layout extends Component {
    constructor(props) {
        super(props);
    }
    
    
      render() {
        return (
          <React.Fragment>
            {/* <GetErrosJs> */}
           <HeaderHtml/>
            <div className="tab-content" id="nav-tabContent">
             <div className="tab-pane fade show active" id="nav-seguridad" role="tabpanel" aria-labelledby="nav-seguridad-tab">
              {/* <GetErrosJs>  */}
             <Header/>
              {/* </GetErrosJs>  */}
               <div className="container-fluid">
                 <div className="row">
                   <Menu/>
                   {this.props.children}
                 </div>
               </div>
             <Footer/>
             </div>
           </div>
          {/* </GetErrosJs> */}
         </React.Fragment> 
       );
      }
  }
  //export default withAuth(Header)  

export default withAuth(Layout);

