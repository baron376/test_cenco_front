import React, { Component } from 'react'
export default class Init extends Component {

    
    render() {
        let lsn = parseInt(localStorage.getItem('lsn'));
        if(lsn === 0){
            setTimeout(()=>{
                console.log('aqui es donde recarga');
                //window.location.reload();
            }, 500);
            localStorage.setItem('lsn', 1);
        }
        return (
            <div className="col-10 tabs">
                <h2 className="mt-4 mb-4">Inicio</h2>
            </div>      
        )
    }
}
