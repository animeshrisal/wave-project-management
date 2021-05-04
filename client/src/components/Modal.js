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
                    { props.children }
                    <button onClick={props.onOk}> A </button>
                    <button onClick={props.onCancel}>A </button>
                </div> 
            ) : null }
        </div>
    )
}

export default Modal