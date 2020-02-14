import React from 'react'
import classes from './Modal.module.css'
import Aux from '../../hoc/Aux'
import Backdrop from '../UI/Backdrop'

const Modal = (props) => {
    return (
        <Aux>
            <Backdrop show={props.show} clicked={props.clicked}/>
            <div 
            className={classes.Modal}
            style={{
                transform: props.show ? 'translateY(0)': 'translateY(-100vh)',
                opacity: props.show ? '1' : '0'
            }}>
                {props.children}
            </div>
        </Aux>
    )
}

export default Modal