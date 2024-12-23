import React, { Component } from 'react'
import reactDom from 'react-dom';

export default class Modal extends Component {
    render() {
        const propsIn = this.props;
        if(!propsIn.isOpen){
            return null;
        }
        return (
            reactDom.createPortal(
                
            
                <div className="modal fade" id="modal-xl">
                <div className="modal-dialog modal-xl">
                    {propsIn.children}
                </div>
                </div>



                ,
                document.getElementById('modal') 
             )
        )
    }
}
