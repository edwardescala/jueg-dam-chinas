import React from 'react';
import './cuadro.css';

const Cuadro = (props) => {
    
    let cuadroColor = props.value ? "cuadro cuadro-blanco" : "cuadro cuadro-negro";
    let color_pieza = props.color ==='Blanco' ? 'pieza-blanca' : (props.color === 'Negro' ? 'pieza-negra' : '');
    return (
       <button 
            className={`${cuadroColor} ${color_pieza}`} 
            onClick={props.onClick}
        >
           
       </button>
    );
};

export default Cuadro;