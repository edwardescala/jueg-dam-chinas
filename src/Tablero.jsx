import React, { Component } from 'react';
import Cuadro from './cuadro';
import './tablero.css';

class Tablero extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cuadros : [
                ['', 'arfilB','', 'caballoB', '', 'arfilB', '', 'caballoB'],
                ['peonB', '', 'peonB', '', 'peonB', '', 'peonB', ''],
                ['', 'peonB','', 'peonB', '', 'peonB', '', 'peonB'],
                [' ', '', ' ', '', ' ', '', ' ', ''],//
                ['', ' ','', ' ', '', ' ', '', ' '],//
                ['peonN', '', 'peonN', '', 'peonN', '', 'peonN', ''],
                ['', 'peonN','', 'peonN', '', 'peonN', '', 'peonN'],
                ['arfilN', '', 'caballoN', '', 'arfilN', '', 'caballoN', ''],
            ],
        }
        this.nroClicks = 0; 
       this.i_anterior = null;//posicion i  anterior
        this.j_anterior = null;//posicion j anterior
        this.direccion = null; //indica si  se movio a la derecha o a la izquierda cuando se dan 2 pasos
    }
    handleClick(i, j, e) {
        
        this.nroClicks++;
        
        /**
         * si el numero de clicks es par y la posicion del segundo click es distinta a la primera.
         * Esto evita tomar en cuenta a clicks sobre el mismo cuadro*/
        if (this.nroClicks % 2 === 0 && i !==this.i_anterior && j !== this.j_anterior) {
            
            
            const colorPiezaActual = this.getColorPiezaActual(i,j);
            const colorPiezaAnterior = this.getColorPiezaAnterior(this.i_anterior,this.j_anterior);
            
            let unPasoALaDerecha;
            let unPasoALaIzquierda;

            let dosPasosALaDerecha;
            let dosPasosALaIzquierda;
            
            let i_actual;
            const j_actual = this.j_anterior + 1;
            const j_actual_izq = this.j_anterior - 1;
            /**
             * si es verdadero, la pieza que se intenta mover es blanca
             * sino, la pieza es negra*/
            if (colorPiezaAnterior === 'Blanco') {

                i_actual =this.i_anterior + 1;
                /**
                * Se Movera la pieza de cuadro en cuadro, a la izquierda o a la derecha
                * Se verifica la posicion actual, usando la anterior*/
                unPasoALaDerecha = i_actual === i && j_actual===j;
                unPasoALaIzquierda = i_actual === i && j_actual_izq===j;
                
                /**
                *  se Movera la pieza saltando un cuadro, a la izquierda o a la derecha
                * Se verifica la posicion actual, usando la anterior*/
                dosPasosALaDerecha =this.i_anterior + 2 === i && this.j_anterior + 2 === j;
                dosPasosALaIzquierda =this.i_anterior  + 2 === i && this.j_anterior - 2 === j;
            
            }else{

                i_actual = this.i_anterior - 1;

                unPasoALaDerecha = i_actual === i && j_actual ===j;
                unPasoALaIzquierda = i_actual === i && j_actual_izq === j;

                dosPasosALaDerecha =this.i_anterior - 2 === i && this.j_anterior + 2 ===j;
                dosPasosALaIzquierda =this.i_anterior  - 2 === i && this.j_anterior - 2 === j;
               
            }
            
            /**
             * si el cuadro actual esta vacio y el anterior cuadro pulsado
             *  era donde estaba la pieza, se mueve la pieza*/
            if (this.estaVacio(i,j)) {

                if (unPasoALaDerecha || unPasoALaIzquierda) {
                    this.moverPieza(i,j,this.i_anterior, this.j_anterior);
                }

                
                if (dosPasosALaDerecha) {//muevo 
                   this.moverPieza(i,j,this.i_anterior, this.j_anterior, i_actual, j_actual, j_actual_izq, false );
                
                }else{
                    if (dosPasosALaIzquierda) {
                        this.moverPieza(i,j,this.i_anterior, this.j_anterior,i_actual, j_actual, j_actual_izq,true);
                    }
                }
                
            }else{
            }
            
        }else{
            //si el numero de clicks es impar se obtiene la posicion anterior
           this.i_anterior = i;
            this.j_anterior = j;
        }
    
    }
    
    estaVacio(i, j) {
        
        if ( this.state.cuadros[i][j].length ===1 ) {
            return true;
        
        }else{
            return false;
        }

    }
    getColorPiezaActual(i, j) {
       
        const cuadroActual = this.state.cuadros[i][j];
        const caracter = cuadroActual.charAt(cuadroActual.length - 1) ;
        let colorActual;
        
        if (caracter === 'N') {
            colorActual = 'Negro';
        
        }else{
            colorActual = 'Blanco';
        }
        return colorActual;
    }
    getColorPiezaAnterior( x, y) {
        
        const cuadroAnterior = this.state.cuadros[x][y];
        const caracter = cuadroAnterior.charAt(cuadroAnterior.length - 1) ;
        let colorActual;
        
        if (caracter === 'N') {
            colorActual = 'Negro';
        
        }else{
            colorActual = 'Blanco';
        }
        return colorActual;
    }
    moverPieza(i,j,i_anterior,j_anterior,i_actual, j_actual, j_actual_izq,dos_pasos_izq=null) {

        const cuadros = this.state.cuadros.slice();
        cuadros[i][j] = cuadros[i_anterior][j_anterior];
        cuadros[i_anterior][j_anterior] = ' ';
        
        if (dos_pasos_izq) {//se movio a la izquierda
            cuadros[i_actual][j_actual_izq] = ' ';
        
        }else{//se movio a la derecha
            if (dos_pasos_izq !== null) {
                cuadros[i_actual][j_actual] = ' ';
            }
        }
            
        this.setState({
            cuadros : cuadros,
        })
    }
    render() {
        return (
            <div className="contenedor-filas">
                    {
                        this.state.cuadros.map((value1, index1) => {
                           return value1.map((value2, index2) => {
                                return(
                                    <Cuadro key={index2} 
                                    value={value2.length >1 ? value2.replace(value2.charAt(value2.length-1),'') : value2} 
                                    color = {this.getColorPiezaActual(index1, index2)}
                                    onClick={ value2 ? ()=>{this.handleClick(index1, index2)} : null}
                                    />
                                    )
                                })
                        })
                        
                    }
            </div>
        );
    }
}

export default Tablero;