import React  from 'react'
import HeaderHtml from '../LayoutOut/HeaderHtml';
//import LoadingOverlay from 'react-loading-overlay';

import Footer from '../LayoutOut/Footer';
function Layout(props) {
    return (
      <React.Fragment>
        <HeaderHtml/>
        {props.children}
        <Footer/>
      </React.Fragment>
    );
  }

export default Layout;
