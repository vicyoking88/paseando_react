import React, { Component } from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.css'

export default class FB_Login extends Component {
  constructor(props) {
    super(props);
    this.state = { fbLogon: this.props.logged };
  };

  //codigo para cargar librerias de facebook
  iniciarFB = () => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: '774660630033407',
        cookie: true,
        xfbml: true,
        version: 'v3.1'
      });
      window.FB.AppEvents.logPageView();
      var fbListo = new Event('FBListo');
      document.dispatchEvent(fbListo);

    };

    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = 'https://connect.facebook.net/es_LA/sdk.js#xfbml=1&version=v3.1&appId=774660630033407';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
    document.addEventListener('FBListo', this.fbLoginStatus);
  }

  componentDidMount() {
    this.iniciarFB()
  }

  fbLoginStatus = () => {
    this.FB = window.FB;
    var logged = '';
    this.FB.getLoginStatus((response) => {
      const loginStatus = response.status;
      switch (loginStatus) {
        case 'connected':
          logged = true;
          break;
        default:
          logged = false;
          break;
      }
    });
    if (logged) {
      this.props.loginStatus(this, '2');
      this.setState({ fbLogon: '2' })
    } else {
      this.props.loginStatus(this, '0');
      this.setState({ fbLogon: '0' })
    }
    /*
    this.setState({ fbLogon: logged })
    this.props.loginStatus(logged);
    */

  }

  manejoOnClick = () => {
    if (!this.FB) this.FB = window.FB;
    if (this.FB) {
      if (this.state.fbLogon == '2') {
        this.FB.logout(this.fbLoginStatus)
      } else {
        this.FB.login(this.fbLoginStatus)
      }
    }
  }

  render() {
    if (this.state.fbLogon === '0') {
      return (
        <button className="btn btn-primary" type="button" id="autenticar" onClick={(e) => this.manejoOnClick()}><span><i className="fab fa-facebook-f"></i> Sign in with Facebook</span> </button>
      )
    } else {
      return (
        <div>
          <h2>esta logueado con Facebook</h2>
          <div className='btn btn-primary' onClick={(e) => this.manejoOnClick()} >Salir</div>
        </div>

      )

    }


    /*
    const nombreBtn = this.state.fbLogon ? 'Salir':'Ingresar con Facebook'
    return (
     <div>
        <div className='btn btn-primary' id='autenticar' onClick={this.manejoOnClick}>{nombreBtn}</div>
     </div>
    )
    */
  }
}
