import React, { useState } from 'react';
import Backdrop from './Backdrop';
import "./Modal.scss";

const Modal = (props) => {
    return (
        <div >
            <Backdrop show={props.visible} clicked={props.onCancel}/>
            { props.visible ? 
            (
                <div className="modal">
                    <button className="close-button" onClick={props.onCancel}>X</button>
                    { props.children }
                </div> 
            ) : null }
        </div>
    )
}

export default Modal