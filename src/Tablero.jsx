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
            juegan_las_blancas : true,
        }
        this.clicks = 0; 
        this.i_anterior = null; //posicion i  anterior
        this.j_anterior = null; //posicion j anterior
        
    }
    handleClick(i, j) {
        
        this.clicks++;
        
        /**
         * si el numero de clicks es par y la posicion del segundo click es distinta a la primera.
         * Esto evita tomar en cuenta a clicks sobre el mismo cuadro*/
        if (this.clicks % 2 === 0 && i !==this.i_anterior && j !== this.j_anterior) {
            
            //color de la pieza anterior
            const color_pieza_anterior = this.getColorPieza(this.i_anterior,this.j_anterior);
            
            let un_paso_der; //sera verdadero si se mueve un paso a la derecha
            let un_paso_izq; //sera verdadero si se mueve un paso a la izquierda

            let dos_pasos_der; //sera verdadero si se mueve dos pasos a la derecha
            let dos_pasos_izq; //sera verdadero si se mueve dos pasos a la izquierda
            
            let posI_actual;
            const posJ_der = this.j_anterior + 1;
            const posJ_izq = this.j_anterior - 1;
            /**
             * si es verdadero, la pieza que se intenta mover es blanca
             * sino, la pieza es negra*/
            if (color_pieza_anterior === 'Blanco') {

                posI_actual =this.i_anterior + 1;
                /**
                * Se Movera la pieza de cuadro en cuadro, a la izquierda o a la derecha
                * Se verifica la posicion actual, usando la anterior*/
                un_paso_der = posI_actual === i && posJ_der===j;
                un_paso_izq = posI_actual === i && posJ_izq===j;
                
                /**
                *  se Movera la pieza saltando un cuadro, a la izquierda o a la derecha
                * Se verifica la posicion actual, usando la anterior*/
                dos_pasos_der =this.i_anterior + 2 === i && this.j_anterior + 2 === j;
                dos_pasos_izq =this.i_anterior  + 2 === i && this.j_anterior - 2 === j;
            
            }else{  //la pieza a mover es negra

                posI_actual = this.i_anterior - 1;

                un_paso_der = posI_actual === i && posJ_der ===j;
                un_paso_izq = posI_actual === i && posJ_izq === j;

                dos_pasos_der =this.i_anterior - 2 === i && this.j_anterior + 2 ===j;
                dos_pasos_izq =this.i_anterior  - 2 === i && this.j_anterior - 2 === j;
               
            }
            
            /**
             * si el cuadro actual esta vacio y el anterior cuadro pulsado
             *  era donde estaba la pieza, se mueve la pieza*/
            if (this.estaVacio(i,j)) {

                if (un_paso_der || un_paso_izq) {
                    this.moverPieza(i,j,this.i_anterior, this.j_anterior);
                }

                
                if (dos_pasos_der) {//muevo 
                   this.moverPieza(i,j,this.i_anterior, this.j_anterior, posI_actual, posJ_der, posJ_izq, false );
                
                }else{
                    if (dos_pasos_izq) {
                        this.moverPieza(i,j,this.i_anterior, this.j_anterior,posI_actual, posJ_der, posJ_izq,true);
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
    getColorPieza(x, y) {
        
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
    moverPieza(i,j,i_anterior,j_anterior,posI_actual, posJ_der, posJ_izq,dos_pasos_izq=null) {

        const cuadros = this.state.cuadros.slice();
        
        if (dos_pasos_izq) {//se intento comer una pieza hacia la izquierda
            
            if (this.piezaCome(cuadros, posI_actual, posJ_izq)) {
                
            }else{
                return;
            }
        
        }else{
            if (dos_pasos_izq !== null) {//se intento comer una pieza hacia a lreturn;a derecha

                if (this.piezaCome(cuadros, posI_actual, posJ_der)) {
                   
                }else{
                    return;
                }
            }
        }
        const color_pieza = this.getColorPieza(i_anterior,j_anterior);

        if ( (this.state.juegan_las_blancas && color_pieza === 'Negro') || (!this.state.juegan_las_blancas && color_pieza === 'Blanco')) {
            return;
        }
        cuadros[i][j] = cuadros[i_anterior][j_anterior];
        cuadros[i_anterior][j_anterior] = ' ';
            
        this.setState({
            cuadros : cuadros,
            juegan_las_blancas : !this.state.juegan_las_blancas,
        })
    }
    piezaCome(cuadros,posI, posJ) {
        
        //  la pieza que come y la que se intenta comer son de colores distintos
        if ( this.getColorPieza(this.i_anterior,this.j_anterior) === this.getColorPieza(posI, posJ)) {
            
            return false;
            
        }else{
           
            if (cuadros[posI][posJ].length > 1) {
                cuadros[posI][posJ] = ' '; 
            } 
            return true;
        }
    }
    render() {
        const turno = this.state.juegan_las_blancas ? 'juegan las blancas' : 'juegan las negras';
        return (
            <div className = "contenedor">
                <div>{turno}</div>
                <div className="contenedor-filas">
                        {
                            this.state.cuadros.map((value1, index1) => {
                            return value1.map((value2, index2) => {
                                    return(
                                        <Cuadro key={index2} 
                                        value={value2.length >1 ? value2.replace(value2.charAt(value2.length-1),'') : value2} 
                                        color = {this.getColorPieza(index1, index2)}
                                        onClick={ value2 ? ()=>{this.handleClick(index1, index2)} : null}
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