import React, { Component } from 'react'
import reactDom from 'react-dom';

export default class ModalLg extends Component {
    render() {
        const propsIn = this.props;
        if(!propsIn.isOpen){
            return null;
        }
        return (
            reactDom.createPortal(
                <div>
                    {propsIn.children}
                </div>
                ,
                document.getElementById('modal') 
             )
        )
    }
}