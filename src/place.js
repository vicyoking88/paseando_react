import React, { Component } from 'react'

export default class Place extends Component {

  render() {
    //cargamos a una variable la cantidad de fotos
    var cantPhotos = this.props.placeData.photos.length;
    if (cantPhotos > 6)// preguntamos si ya hay mas de 6
      cantPhotos = 6;//si las hay cargamos 6 a una variable
    else
      cantPhotos = 3;//si no las hay cargamos 3 a una variable
    const colSize = 4//variable para las columnas de la rejilla
    var htmlPhotos = [];//creamos variable arreglo para almacenar las fotos extraidas 
    this.props.placeData.photos.map((photo, index) => {//recorremos arreglo de fotos de los props de la clase padre
      htmlPhotos.push(//agregamos una a una las fotos con su respectivo codigo html y bootstrap praa ser cargados en el dom en filas de a tres fotos cada una
        <div key={index} className={'col-' + colSize + ' text-center'} >
          <img src={photo} alt={this.props.placeData.name} width='100%' />
        </div>);
      if (index === (cantPhotos - 1)) return//retornara hasta mostrar filas de 3 fotos luego de esto seguira con el codigo de abajo
    })

    //tomamos las constantes y las colocamos en el codigo html a retornar
    return (
      <div>
        <div className='row py-2'>
          <div className='col-12 text-center' >{this.props.placeData.name}</div>
        </div>
        <div className='row py-2'>
          {htmlPhotos.slice(0, 3)}
        </div>
        <div className='row py-2'>
          {htmlPhotos.slice(3, 6)}
        </div>
        <div className='row' >
          <div className='col-2'></div>
          <div className='col-8'> {this.props.placeData.address}</div>
          <div className='col-2'></div>
        </div>
      </div>
    )
  }

}
