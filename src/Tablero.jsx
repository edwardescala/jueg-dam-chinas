import React, { Component } from 'react';
import Cuadro from './cuadro';
import './tablero.css';

class Tablero extends Component {
    
    render() {
        const turno = this.props.juegBlancas ? 'juegan las blancas' : 'juegan las negras';
        return (
            <div className = "contenedor">
                <div>{turno}</div>
                <div className="contenedor-filas">
                        {
                            this.props.cuadros.map((value1, index1) => {
                            return value1.map((value2, index2) => {
                                    return(
                                        <Cuadro key={index2} 
                                        value={value2} 
                                        color = {this.props.getColorPieza(index1, index2)}
                                        onClick={ value2 ? ()=>{this.props.onClick(index1, index2)} : null}
                                        />
                                        )
                                    })
                            })
                            
                        }
                </div>
            </div>
        );
    }
}

export default Tablero;