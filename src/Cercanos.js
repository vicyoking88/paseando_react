import React, { Component } from 'react'
import Rating from './Rating';
import './App.css';

export default class Cercanos extends Component {
  constructor(props){
    super(props);
    this.state=({mostrar: false})
  }

  
  render() {

    let placePhoto = this.props.placeData.photos?.length &&
    (<img src={this.props.placeData.photos[0].getUrl()} className="card-img-top" alt="..." />)

    let rating = this.props.placeData.rating &&
      (<Rating placeRating={this.props.placeData.rating}/>)

    const placesTemp = (<div  className= 'mb-3'>
                <div  className='row' >
                <div  className='col-5 my-auto text-center' ><a id='detalle' href='#'  onClick={(e) => this.props.Escojerdestino(this.props.placeData.name)} >{this.props.numero} {this.props.placeData.name}</a></div>                                                    
                <div  className='col-7 mx-auto '>{placePhoto}</div> 
                </div>
                <div  className='row mx-auto'>{rating}</div>  
                </div>)
   
   return (
      <div>
        {placesTemp}
      </div>    
    )
  }
}


