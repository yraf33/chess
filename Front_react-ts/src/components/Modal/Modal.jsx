import { createPortal } from 'react-dom';
import {useRef, useEffect} from 'react';
import './Modal.css'


export default function Modal ({children, active, setActive }) {

    
    return (
        <dialog className={active ? 'modal active' : 'modal'} onClick={() => setActive(false)}>
            <div className={active ? 'modal-content active' : 'modal-content'}  onClick={e => e.stopPropagation()}> 
                {children}
            </div>
        </dialog>
    )
}