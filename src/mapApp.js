import React, { Component } from 'react';
import './App.css';
import Cercanos from './Cercanos';
import Horario from './Horario';
import Rating from './Rating';
import Place from './place';

class Mapapp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photo: '',
      muestratodo: false
    }
  }

  map = ''

  /****VALIDAMOS QUE SE HAYA DESCARGADO LA LIBRERIA */

  //ESTO VA DE SEGUNDO 2 ***********************************************

  //cargamos javascritp de google a la pagina antes de hacer uso de sus funcionalidades
  //sera ejecutado luego que se monte el codigo principal orender
  componentDidMount() {
    const googlePlaceAPILoad = setInterval(() => {//para generar un ciclo que se ejecuta hasta que verifique que el javascript se ha descargado
      if (window.google) {//verificamos si existe el objeto google en el objeto window del navegador
        this.google = window.google;
        clearInterval(googlePlaceAPILoad);//detenemos el ciclo cuando se encuentra el objeto windows.google ya que se descargo toda la libreira javascript
        console.log('Load Place API');//imprimo en sonsola que ya se cargo
        this.directionsService = new this.google.maps.DirectionsService();
        this.directionsRenderer = new this.google.maps.DirectionsRenderer();
        const mapCenter = new this.google.maps.LatLng(4.624335, -74.064644);//cordenadas iniciales donde estara ubicada la app en el mapa
        this.map = new this.google.maps.Map(document.getElementById('map'), {//luego indicamos en cual nodo del dom del html estara asociado ese mapa
          center: mapCenter,
          zoom: 15
        });
        var marcador = new this.google.maps.Marker({ position: mapCenter, map: this.map })
        this.showMap(mapCenter);
      };
    }, 100);
  }

  /**CON ESTE METODO PEDIMOS MOSTRAR EL MAPA */

  showMap(mapCenter) {
    // The location of Uluru
    var uluru = { lat: -25.344, lng: 131.036 };
    // The map, centered at Uluru
    var map = new window.google.maps.Map(
      document.getElementById('map'), { zoom: 15, center: mapCenter });
    this.directionsRenderer.setMap(map);
    // The marker, positioned at Uluru
    var marker = new window.google.maps.Marker({ position: mapCenter, map: map });

  }


  /**CON ESTE METODO PEDIMOS QUE SE BUSQUE EL LUGAR ESCRITO EN LA CAJA DE TEXTO EN LOS GOOGLE PLACE */

  //**ESTO VA CUARTO 4 *********************************************** */

  manejoOnClick = (e) => {
    console.log("cargando valores a buscar")
    const request = {//creamos un request con lps atrobutoss query
      query: document.getElementById('origen').value, //valor lugar a buscar
      fields: ['photos', 'formatted_address', 'name', 'place_id'],//campos que queremos que nos retorne el servicio de google maps
    };
    //usamos PlacesService pasando como parametro el mapa que se creo luego que se cargo la libreria javasccript de google
    this.service = new this.google.maps.places.PlacesService(this.map);
    // ejecutamos la funcion finplacefromquery del objeto PlacesService creado previamente
    //indicando el request que tiene el valor a buscar y la funcion que queremos que se ejecute luego que el servicio de google nos genere una respuesta
    this.service.findPlaceFromQuery(request, this.findPlaceResult);//del service que inicializo como PlacesService enviamos el request y cargamos el metodo findPlaceREsult para ejecutarlo despues de que el servicio de google nos genera una respuesta
    document.getElementById('origen').value = ''

  }

  /**CON ESTE METODO OBTENEMOS LA RESPUESTA A LA BUSQUEDA DE SER ASI SE CARGA ARREGLOS Y SI NO MOSTRAR MENSAJE */


  ///ESTO VA DE QUINTO 5 *************************************************

  //si el valor del status es OK es por que el servicio fue accedido
  findPlaceResult = (results, status) => {// resultado del servico de google y un estado que es retornado tambien por el servicio de google
    var placesTemp = []
    var placeId = ''
    if (status === 'OK') {
      results.map((place) => {//HACEMOS RECORRIDO POR todos los resultados que devolvio el servicio
        var placePhotos = ['']
        const placeTemp = {
          id: place.place_id, name: place.name,
          address: place.formatted_address, photos: placePhotos
        }
        placeId = place.place_id;//colocamos el id del sitio en una variable

        //ESTO VA DE SEXTO 6 ***** ********DENTRO DEL 5*****************

        placesTemp.push(<Place placeData={placeTemp} />);//colocamos en un arreglo temporar un objeto de tipo PLACE para darle formato a los datos extraidos
      })
    }

    //busqueda de detalle adicional del lugar
    if (placesTemp.length > 0)
      //ESTO VA DE SEPTIMO 7 *****DENTRO DEL 5 ****************************

      this.findPlaceDetail(placeId);//esta funcion para obtener mas detalles del lugar
    else {
      // IMPRIMIMOS SI no se obtuvo ningun resultado
      const placeTemp = {
        id: 'N/A', name: <div className='mt-5'><strong className='text-center'>
          No hay resultados</strong></div>,
        address: '', photos: ['']
      }
      placesTemp.push(<Place placeData={placeTemp} />);
      this.setState({ places: placesTemp })
    }
  }

  /**ENVIAMOS REQUEST SOLICITANDO MAS DETALLES DEL LUGAR  */

  //SIGUE SEPTIMO PASO 7 QUE VA DENTRO DEL 5 PASO**************************

  findPlaceDetail = (placeIdFound) => {
    var request = {//creamos un nuevo request con el query de la informacion adicional que quiero buscar
      placeId: placeIdFound,//indicamos el id del sitio a buscar y seguido la informacion que queremos que el servicio nos devuleva
      fields: ['address_component', 'adr_address', 'alt_id', 'formatted_address', 'opening_hours', 'icon', 'id', 'name', 'business_status', 'photo', 'place_id', 'geometry', 'rating', 'reviews', 'plus_code', 'scope',
        'type', 'url', 'utc_offset_minutes', 'vicinity']
    };
    //usamos el metodo getDetails que hace parte del api de google
    //del objeto service previamente instanciado
    //pasamos por parametro el request y la funcion que queremos que se ejecute cuando el servicio nos devuelva una respuesta
    this.service.getDetails(request, this.foundPlaceDatail);
  }

  //***ESTO VA DE OCTAVO 8 **************************** LLAMADO DEL 7 PASO 

  /** EN ESTE METODO DESCARGAMOS LA INFORMACION REQUERIDA Y LA ENVIAMOS A LAS DIFERENTES CLASES HIJAS */

  // cargamos la respuesta y el status devuelvo por api google
  //si es ok cargamos las fotos 

  foundPlaceDatail = (place, status) => {
    if (status === 'OK') {
      var placePhotos = ['']
      if (place.photos) {
        place.photos.map((placePhoto, index) => {
          placePhotos[index] = placePhoto.getUrl({ 'maxWidth': 160, 'maxHeight': 120 })
          if (index === 2) return;
        })
      }
      const placeTemp = {
        id: place.place_id, name: place.name,
        address: place.formatted_address, photos: placePhotos
      }
      //cargo en una constante la informacion del sitio
      const placesTemp = <Place placeData={placeTemp} />;
      //cargo a una constante la informacion del horario
      const placeHorarios = <Horario horarios={place.opening_hours} />

      //constante con el renderizado de la ruta
      const direccion = <div className='container'>
        <form className="form-inline mb.2" >
          <button className="col-12 btn btn-primary mb-2 mr-sm-2 btn-danger" onClick={this.Ruta}  >ir al destino indicado</button>
          <div className="row">
            <div className="col-4">
              <p>Origen</p>
              <input type="text" className="form-control mb-2 mr-sm-2" placeholder="Lugar de partida" id="origenx" />
            </div>
            <div className="col-4">
              <p>Destino</p>
              <input type="text" className="form-control mb-2 mr-sm-2" value={place.name} id="destino" />
            </div>
            <div className="col-4">
              <p>Modo de Transportarse</p>
              <select id="mode" className="form-control mb-2 mr-sm-2" >
                <option value="DRIVING">Vehiculo</option>
                <option value="WALKING">Caminar</option>
                <option value="BICYCLING">Bicicleta</option>
                <option value="TRANSIT">Transporte publico</option>
              </select>
            </div>
          </div>
        </form>
      </div>
      // creamos variable para cargar el rating
      var rating = ''
      if (place.rating) {
        rating = <Rating placeRating={place.rating} placeReviews={place.reviews} />
      } else {
        rating = <div key={1} className='row mt-2 mb-1 pl-3' >
          <strong>No hay comentarios</strong>
        </div>;
      }

      console.log('address_component: ' + place.address_component,
        'adr_address: ' + place.adr_address, 'alt_id', 'formatted_address', 'geometry',
        'icon: ' + place.icon, 'business_status', 'photo',
        'type: ' + place.type, 'url: ' + place.url, 'utc_offset_minutes', 'vicinity')

      //activo setState para que renderice nuevamente y cargue la informacion que devuelve del sitio, su horario y rating
      this.setState({
        places: placesTemp,
        placeRating: rating,
        placeHorarios: placeHorarios,
        cercanos: [],
        direccion: direccion,
        placeLocation: place.geometry.location
      })

      this.showMap(place.geometry.location);


    }
  }
  //METODO PARA CAMBIO DE DESTION DE RUTA
  cambiardestino = (destino) => {
    console.log(destino)
    document.getElementById('origen').value = destino;
    document.getElementById('lugar').click();
  }
  //METODO PARA INDICAR LA DISTANCIA DE LOS SITIOS CERCANOS
  Sitioscercanos = (e) => {
    let request = {
      location: this.state.placeLocation,
      radius: '10000',
    };

    this.service = new this.google.maps.places.PlacesService(this.map);
    this.service.nearbySearch(request, this.callbackSitioscercanos)
  }
  //METODO PARA CARGAR LOS SITIOS CERCANOS OBTENIDOS DE LA BUSQUEDA
  callbackSitioscercanos = (results, status) => {
    if (status == this.google.maps.places.PlacesServiceStatus.OK) {
      console.log("callback received " + results.length + " results");
      window.lugaresCercanos = results
      if (results.length) {
        let SitiosCercanos = results.map((place, index) =>
          <Cercanos key={index} mumero={index} placeData={place}
            Escojerdestino={this.cambiardestino} />)

        this.setState({
          cercanos: SitiosCercanos
        })
      }
    } else console.log("callback.status=" + status);
  }


  //METODO PARA MOSTRAR LA RUTA EN EL MAPA
  Ruta = (e) => {
    e.preventDefault()
    var start = document.getElementById('origenx').value;
    var end = document.getElementById('destino').value;
    var travelMode = document.getElementById('mode').value;
    var request = {
      origin: start,
      destination: end,
      travelMode: travelMode
    };

    var that = this;
    this.directionsService.route(request, function (result, status) {
      console.log(result)
      if (status == 'OK') {
        that.directionsRenderer.setDirections(result);
        document.getElementById('origenx').value = ''

        that.setState({
          errorruta: ""
        });

      }
      else if (status == 'NOT_FOUND') {

        that.setState({
          errorruta: "Origen no encontrado escriba lo correctamente"
        });

      }
      else if (status == 'ZERO_RESULTS') {

        that.setState({
          errorruta: "No se encontro ruta para esta medio de transporte"
        });

      }

    });
  }


  // ESTO VA PRIMERO   1****************************************************

  //RENDER PRINCIPAL DE LO SITIOS

  render() {
    return (
      <div className="App" >
        <nav className="navbar navbar-light bg-light">
          <a href="#" className="text-danger">
            <img className="d-inline-block align-top" src="./apseando_ando.jpg" width="40" height="40"></img>
            <span className="logo_p"> Paseando Ando</span>
          </a>
          <a>
            <span>Identificado  <i className={this.props.icon}></i></span>
            {this.props.icon2}
            <div className='btn btn-primary ml-2 btn-danger' onClick={this.props.logout}>Salir</div>
          </a>
        </nav>
        <div id='gmapContainer'></div>
        <div className='container border rounded p-3 mt-4' style={{ width: '50%' }}>
          <div className='row'>
            <div className='col-4'></div>
            <div className='col-4 text-center'>
              <label><strong>Indica el lugar</strong></label>
            </div>
            <div className='col-4'></div>
          </div>
          <div className='row'>
            <div className='col-4'></div>
            <div className='col-4 py-2'><input id='origen' type='text' /></div>
            <div className='col-4'></div>
          </div>
          <div className='row'>
            <div className='col-4'></div>
            <div className='col-4 text-center'>

              {/***ESTO VA TERCERO 3 ****************************************** */}

              <div className='btn btn-primary text-center btn-danger' id='lugar' onClick={this.manejoOnClick}>Buscar Lugar</div>{/***invocamos la funcion manejoOnclick al prisionar en buscar lugar */}
            </div>
            <div className='col-4'></div>
          </div>
          {this.state.places}
          {this.state.placeHorarios}
          {this.state.placeRating}
          {this.state.places &&
            <div className='row'>
              <div className="col-12">
                <button className="btn btn-primary text-center btn-danger" onClick={this.Sitioscercanos}>Buscar lugares cercanos</button>
              </div>
            </div>}
          <div className="row row-cols-1 row-cols-md-1 mt-2">
            {this.state.muestratodo ?
              this.state.cercanos :
              this.state.cercanos?.slice(0, 8)}
          </div>
          {this.state.cercanos &&
            <div className="container">
              <div className="mb-3">
                <a className="text-dark" href='#' onClick={(e) => {
                  e.preventDefault();
                  this.setState({ muestratodo: true });
                }}>
                  Mostrar más lugares cercanos
                </a>
              </div>
            </div>}

          {this.state.direccion}
          <div className='text-center '>{this.state.errorruta}</div>
          <br />
          <div id='map' className='mt-2' ></div>

        </div>
      </div>
    );
  }
}

export default Mapapp;