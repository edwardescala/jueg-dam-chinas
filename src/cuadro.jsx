import React from 'react';
import './cuadro.css';

const Cuadro = (props) => {
    
    let cuadroColor = props.value ? "cuadro cuadro-blanco pieza" : "cuadro cuadro-negro";
    let color_pieza = props.value;
    return (
       <button 
            className={`${cuadroColor} ${color_pieza}`} 
            onClick={props.onClick}
        >
           
       </button>
    );
};

export default Cuadro;