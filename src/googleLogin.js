import React, { Component } from 'react'
import './App.css';

export default class GoogleLogin extends Component {

  constructor(props) {
    super(props);
    this.state = {
      logged: this.props.logged//traemos el estado inicial del logueado
    }
  }
  //este ciclo se ejecuta justo despues del primer renderizado
  //Valida la respuesta que está esperando por parte de google, como es un proceso asíncrono debe contar el tiempo que haga falta hasta que devuelva una respuesta, entonces por eso lo contabilizan mediante esos mili segundos
  //invocamos la funcion cada 100 milisegundos 
  //el intervalo lo asignamos a la variable googleSignApiiload

  componentDidMount() {
    const googleSignAPILoad = setInterval(() => {
      if (window.gapi) {//preguntamos si window.gapi existe o si ya fue cargada el api de google
        console.log("cargando gapi")
        this.gapi = window.gapi;//asignamos a gapi
        clearInterval(googleSignAPILoad);
        this.gapi.load('auth2', function () { })//hacemos un load al objeto gapi indicando que vamos a usar autenticancion version 2
        //con esto estamos diciendo que se cargue la libreira para ser utilizada
      };
    }, 100);
  }



  login = () => {
    const clientParam = { client_id: '670033030073-rtclsh42bf04r6c5k54tm4dtahe2i0mj.apps.googleusercontent.com' }
    this.gapi.auth2.init(clientParam)
    const auth = this.gapi.auth2.getAuthInstance();
    const loggedInGoogle = auth.isSignedIn.get();
    if (!loggedInGoogle) {
      auth.signIn()
        .then(
          (success) => {
            this.setState({ logged: '1' });
            //this.props.manejoOnClick(this, '1')
            this.props.loginStatus(this, '1')
          },
          (error) => {
            this.setState({ logged: '0' });
            
            this.props.loginStatus(this, '0');
          }
        )
    } else {
      this.setState({ logged: '1' });
      this.props.loginStatus(this, '0');
    }
  }

  logout = (e) => {
    var auth2 = this.gapi.auth2.getAuthInstance();
    auth2.signOut()
      .then(
        (success) => {
          this.setState({ logged: '0' });
          this.props.loginStatus(this, '0');
        },
        (error) => {
          console.log('Error en User signed out.');
        }
      );
    auth2.disconnect();
  }
  /*
    manejoOnClick = (e) => {
      if (e.target.id==='ingresar')
        this.login()
      else if (e.target.id==='salir')
        this.logout();
    }
    */
  render() {

    if (this.state.logged === '0') {
     
      return (
        <button className="ml-auto btn-left btn btn-danger" type="button" onClick={(e) => this.login()}><span><i className="fab fa-google-plus-g"></i> Sign in with Google+</span> </button>
      )
    } else {

     
      return (
        <div>
          <h2>esta logueado con google</h2>
          <div className='btn btn-primary' onClick={(e) => this.logout()}>Salir</div>
        </div>
      )
    }
  }

}
