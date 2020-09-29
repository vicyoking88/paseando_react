import React, { Component } from 'react';
import './App.css';
import GoogleLogin from './googleLogin.js';
import FB_Login from './fb_Login';
import Mapapp from './mapApp.js';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logged: this.props.login
    };
  }

  /*estado del login*/
  loginStatus = (e, logged) => {
    this.setState({
      logged: logged
    })
  }
  //cerrar sesion
  loginOut = (e, logged) => {
    this.setState({
      logged:"0"
    })
  }
  //cargamos interfaz login
  render() {

    if (this.state.logged === '1') {
      return (<GoogleLogin loginStatus={this.loginStatus} logged={this.state.logged} />
      )
    }
    else if (this.state.logged === '2') {
      return (
        <FB_Login loginStatus={this.loginStatus} logged={this.state.logged} />
      )
    }
    else if (this.state.logged === '3') {
      return (
        <div>
          <Mapapp icon2={<img className="d-inline-block align-top" src="./apseando_ando.jpg" width="30" height="30"></img>} logout={this.loginOut}></Mapapp>
        </div>
      )

    }
    else {
      return (

        <div className='ml-auto mr-auto border rounded mt-1'>
          <nav className="navbar navbar-light bg-light">
            <a href="#" className="text-danger">
              <img className="d-inline-block align-top" src="./apseando_ando.jpg" width="40" height="40"></img>
              <span className="logo_p"> Paseando Ando</span>
            </a>
          </nav>

          <br />
          <br />
          <form className="container col-12 col-sm-7 col-md-5 col-lg-4">
            <h1 className="h3 mb-3 font-weight-normal text-center"> Sign in</h1>
            <div className="row social-login">
              <FB_Login logged={this.state.logged} loginStatus={this.loginStatus}>
              </FB_Login>
              <GoogleLogin logged={this.state.logged} loginStatus={this.loginStatus}>
              </GoogleLogin>
            </div>
            <br />
            <p className="text-center"> OR  </p>
            <div className="input-group pb-3">
              <div className="input-group-prepend">
                <span className="input-group-text"><i className="fa fa-envelope-o fa-fw"></i></span>
              </div>
              <input className="form-control" type="text" placeholder="Email" />
            </div>
            <div className="input-group pb-3">
              <div className="input-group-prepend">
                <span className="input-group-text"><i className="fa fa-key fa-fw"></i></span>
              </div>
              <input className="form-control" type="password" placeholder="Pasword" />
            </div>
            <button className="btn btn-success btn-block" type="submit" onClick={(e) => this.loginStatus(e, '3')}><i className="fas fa-sign-in-alt"></i> Sign in</button>

            <a href="#" id="forgot_pswd">Forgot password?</a>
            <hr />
            <button className="btn btn-primary btn-block" type="button" id="btn-signup"><i className="fas fa-user-plus"></i> Sign up New Account</button>
            <br />
          </form>
        </div>
      )

    }
  }
}

export default App;
